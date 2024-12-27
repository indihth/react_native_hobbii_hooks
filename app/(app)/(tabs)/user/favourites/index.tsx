import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PatternsList from "@/components/PatternsList";
import { PatternTypeID } from "@/types";
import { axiosAuthGet } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import { useFocusEffect } from "expo-router";

const Favourites = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns

  // later will be dynamic to show favourite patterns, yarns or projects
  const fetchPatterns = async () => {
    try {
      setLoading(true);
      const response = await axiosAuthGet("/patterns/favourites", session);
      setPatterns(response.data);
      // console.log(user_id)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // runs when the screen comes (back) into focus, useEffect runs only once when the component is mounted
  // this will update the list of patterns after user navigates back from details page, removes unfavourite patterns
  useFocusEffect(
    useCallback(() => {
      fetchPatterns();
    }, [])
  );

  return (
    <View>
      <Text>Favourite Patterns</Text>
      <PatternsList patterns={patterns} source="user/favourites" />
    </View>
  );
};

export default Favourites;
