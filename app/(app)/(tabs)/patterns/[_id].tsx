import { API_URL } from "@/config";
// import axios from "axios";
import { axiosAuth } from "@/api/axiosInstance";
import { PatternType } from "@/types/index";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Alert,
  ImageBackground,
} from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";

import { useSession } from "@/contexts/AuthContext";
import DetailElement from "@/components/DetailElement";
import SuggestedYarns from "@/components/SuggestedYarns";
import LoadingIndicator from "@/components/LoadingIndicator";
import DeleteButton from "@/components/DeleteButton";
import FavouriteButton from "@/components/FavouriteButton";

const PatternDetails = () => {
  const { session } = useSession();
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const [pattern, setPattern] = useState<PatternType>(); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";

  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuth(`/patterns/${_id}`, session)
      .then((response) => {
        setPattern(response.data.data);
        setLoading(false);
        // console.log(pattern);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [_id, session]);

  // Display while loading
  if (loading || !pattern) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

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
    <SuggestedYarns suggested_yarn={pattern?.suggested_yarn} />
  );

  const routes = [
    { key: "info", title: "Info" },
    { key: "yarns", title: "Yarns" },
  ];
  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex-1">
            <ImageBackground
            source={{ uri: `${pattern.image_path ?? [0]}` }}
            resizeMode="cover"
            style={{ height: 500, justifyContent: "flex-end", alignItems: "flex-end" }}
            >
            <FavouriteButton resourceName="patterns" id={_id} session={session}/>

            </ImageBackground>
        </View>

        <View className="px-3 pt-3">
          {/* <Text>{_id}</Text> */}
          <View className="flex-row justify-between items-baseline mb-5">
            <Text variant="displaySmall">{pattern.title}</Text>
            <Text variant="bodyMedium">by {pattern.user?.full_name}</Text>
          </View>
          {/* Pass id as a url query */}
          <View className="flex-row">
            <Link push href={`/patterns/edit?id=${_id}`} asChild>
              <Button>Edit Pattern</Button>
            </Link>
            <DeleteButton
              resourceName="patterns"
              id={_id}
              session={session}
              onDelete={() => console.log("pressed")}
            />
            {/* // onDelete={() => Alert.alert("Delete Pattern", "Pattern has been deleted successfully")} /> */}
            {/* onDelete={() => router.push("/patterns")} /> */}
          </View>
          <TabView
            navigationState={{ index, routes }}
            // renderScene={renderScene}
            // Prevent unnecessary re-renders
            renderScene={({ route }) => {
              switch (route.key) {
                case "info":
                  return <InfoRoute />;
                case "yarns":
                  return <YarnsRoute />;
                default:
                  return null;
              }
            }}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            // initialLayout={{ width: Dimensions.get('window').width }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PatternDetails;
