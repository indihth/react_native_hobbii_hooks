import {
  Alert,
  ImageBackground,
  useWindowDimensions,
  View,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { PatternTypeID } from "@/types";
import FavouriteButton from "./FavouriteButton";
import { Link, RelativePathString, router } from "expo-router";
import DeleteButton from "./DeleteButton";
import { TabView } from "react-native-tab-view";
import DetailElement from "./DetailElement";
import YarnDetails from "./YarnDetails";
import { useAuth, useSession } from "@/contexts/AuthContext";
import Tabs from "./Tabs";
import { usePathname } from "@/contexts/PathnameContext";
import { axiosRestore } from "@/api/axiosInstance";

type PatternProps = {
  pattern: PatternTypeID;
  source?: string;
  showBackButton?: boolean;
};

const PatternDetails: React.FC<PatternProps> = ({
  pattern,
  source = "patterns",
  showBackButton = false,
}) => {
  const { session } = useSession();
  const { authUserId } = useAuth();

  const pathname = usePathname(); // retrieving the current pathname from the context
  const patternUserId = pattern.user?._id;
  const isSelf = pattern.user._id === authUserId;
  const isArchived = pattern.deleted;

  // const id = pattern._id;

  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Pattern");
  const layout = useWindowDimensions();

  const tabTitles = ["Pattern", "Yarn"];
  const tempImage = require("@/assets/images/placeholderImage.png");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleRestoreButton = async () => {
    try {
      console.log(`/patterns/${pattern._id}/restore`);
      // await axiosRestore(`/patterns/${pattern._id}/restore`, session);
      // router.push(`/(auth)/(tabs)/profile/patterns/${pattern._id}`);
      // Alert.alert("Pattern restored successfully");
      // Handle successful restore, e.g., show a success message or update state
    } catch (error) {
      console.error("Failed to restore pattern:", error);
      // Handle error, e.g., show an error message
    }
  };

  // Tab view for Pattern Information and Suggested Yarns
  const InfoRoute = () => (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Pattern Information
      </Text>
      <DetailElement title="Yarn Weight" value={pattern?.yarn_weight} />
      <DetailElement title="Gauge" value={pattern?.gauge} />
      <DetailElement title="Meterage" value={pattern?.meterage} />
      <Text variant="bodyLarge" className="pt-3">
        {pattern?.description}{" "}
      </Text>
    </View>
  );

  const Buttons = () => {
    return (
      <View className="flex-row">
        {isArchived ? (
          <>
            <Button onPress={handleRestoreButton}>Restore Pattern</Button>
            <DeleteButton
              resourceName="patterns"
              text="Permanently pattern"
              id={pattern._id}
              session={session}
              hardDelete
            />
          </>
        ) : (
          <>
            {/* Pass id as a url query */}
            <Link push href={`${pathname}/edit?_id=${pattern._id}` as RelativePathString} asChild>
              <Button
              // onPress={() =>
              //         router.push({
              //           pathname: `(auth)/(tabs)/profile/patterns/edit` as RelativePathString,
              //           params: { _id: pattern._id },
              //         })}
              >
                Edit Project
              </Button>
            </Link>
            <DeleteButton
              resourceName="patterns"
              text="Delete pattern"
              id={pattern._id}
              session={session}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <View>
      <View className="flex-1">
        <ImageBackground
          source={tempImage}
          // source={{ uri: `${pattern.image_path ?? [0]}` }}
          resizeMode="cover"
          style={{
            height: 500,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <FavouriteButton
            resourceName="patterns"
            id={pattern._id}
            session={session}
          />
        </ImageBackground>
      </View>

      <View className="px-3 pt-3">
        <View className="flex-row justify-between items-baseline mb-5">
          <Text variant="displaySmall">{pattern.title}</Text>
            <Link
            push
            href={`/profile/${patternUserId}`}
            asChild
            >
            <Text variant="bodyMedium">by {pattern.user?.full_name}</Text>
            </Link>
        </View>

        {/* Shows edit and delete only if user is owner */}
        {isSelf && <Buttons />}

        <Tabs onTabChange={handleTabChange} tabTitles={tabTitles} />
        {activeTab === "Pattern" ? (
          <InfoRoute />
        ) : (
          <YarnDetails yarn={pattern?.suggested_yarn} />
        )}
      </View>
    </View>
  );
};

export default PatternDetails;
