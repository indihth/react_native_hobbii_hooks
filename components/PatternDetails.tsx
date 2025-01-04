import { ImageBackground, useWindowDimensions, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { PatternTypeID } from "@/types";
import FavouriteButton from "./FavouriteButton";
import { Link } from "expo-router";
import DeleteButton from "./DeleteButton";
import { TabView } from "react-native-tab-view";
import DetailElement from "./DetailElement";
import YarnDetails from "./YarnDetails";
import { useSession } from "@/contexts/AuthContext";
import Tabs from "./Tabs";

type PatternProps = {
  pattern: PatternTypeID;
  source?: string;
  showBackButton?: boolean;
};

const Pattern: React.FC<PatternProps> = ({
  pattern,
  source = "patterns",
  showBackButton = false,
}) => {
  const { session } = useSession();
  const patternUserId = pattern.user?._id;
  // const id = pattern._id;

  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Pattern");
  const layout = useWindowDimensions();

  const tabTitles = ["Pattern", "Yarn"];
  const tempImage = require("@/assets/images/placeholderImage.png");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
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

  const YarnsRoute = () => (
    <YarnDetails yarn={pattern?.suggested_yarn} />
  );

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
            href={`/(auth)/(tabs)/profile/${patternUserId}`} 
            // href={{ pathname: `/(auth)/(tabs)/profile/${patternUserId}`, params: {patternUserId} }} 
            asChild
            >
            <Text variant="bodyMedium">by {pattern.user?.full_name}</Text>
            </Link>
        </View>
        {/* Pass id as a url query */}
        <View className="flex-row">
          <Link push href={`/${source}/edit?id=${pattern._id}`} asChild>
            <Button>Edit Pattern</Button>
          </Link>
          <DeleteButton
            resourceName="patterns"
            text="Delete Pattern"
            id={pattern._id}
            session={session}
            onDelete={() => console.log("pressed")}
          />
          {/* // onDelete={() => Alert.alert("Delete Pattern", "Pattern has been deleted successfully")} /> */}
          {/* onDelete={() => router.push("/patterns")} /> */}
        </View>

        <Tabs onTabChange={handleTabChange} tabTitles={tabTitles} />
        {activeTab === "Pattern" ? <InfoRoute /> : <YarnsRoute />}
      </View>
    </View>
  );
};

export default Pattern;
