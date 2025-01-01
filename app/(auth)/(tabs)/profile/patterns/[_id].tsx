import { API_URL } from "@/config";
// import axios from "axios";
import { axiosAuthGet } from "@/api/axiosInstance";
import { PatternTypeID } from "@/types/index";
import {
  Link,
  router,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import SuggestedYarns from "@/components/YarnDetails";
import LoadingIndicator from "@/components/LoadingIndicator";
import DeleteButton from "@/components/DeleteButton";
import FavouriteButton from "@/components/FavouriteButton";
import Pattern from "@/components/Pattern";

const PatternDetails = () => {
  const { session } = useSession();
  const router = useRouter();
  const { _id, source } = useLocalSearchParams<{
    _id: string;
    source: string;
  }>();

  const [pattern, setPattern] = useState<PatternTypeID>(); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const [index, setIndex] = useState(0);

  // useFocusEffect(
  //   useCallback(() => {
  //     // replaces stack navigation when going back
  //     if (source === "favourites") {
  //       router.replace("/users/favourites");
  //     } else {
  //       router.replace("/patterns");
  //     }
  //   }, [source])
  // );

  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuthGet(`/patterns/${_id}`, session)
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

  return (
    <ScrollView>
      <SafeAreaView>
        {/* <Stack.Screen /> */}
        <Pattern pattern={pattern} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default PatternDetails;
