import { API_URL } from "@/config";
// import axios from "axios";
import { axiosAuthGet } from "@/api/axiosInstance";
import { YarnType } from "@/types/index";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";

import { useSession } from "@/contexts/AuthContext";
import DetailElement from "@/components/DetailElement";
import SuggestedYarns from "@/components/YarnDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "@/components/LoadingIndicator";

const YarnDetails = () => {
  const { session } = useSession();
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const [yarn, setYarn] = useState<YarnType>(); // type of an array of Yarns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [index, setIndex] = useState(0);

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";

  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all yarns
    axiosAuthGet(`/yarns/${_id}`, session)
      .then((response) => {
        setYarn(response.data.data);
        setLoading(false);
        // console.log(yarn);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [_id, session]);
  console.log(_id);

  // Display while loading
  if (loading || !yarn) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View className="px-3 pt-3">
          <Image
            source={{ uri: `${yarn.image_path}` }}
            style={{ height: 500, resizeMode: "cover" }}
          />
          <View className="flex-row justify-between items-baseline mb-5">
            <Text variant="displaySmall">{yarn.title}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default YarnDetails;
