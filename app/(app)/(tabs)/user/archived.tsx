import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PatternsList from "@/components/PatternsList";
import { PatternTypeID } from "@/types";
import { axiosAuthGet } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import { useFocusEffect } from "expo-router";

const Archived = () => {
  const { session } = useSession();

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  // const userID = session?.user._id;
  console.log(session);
  const searchParams = "?userId=675efb29ca1d28c20f331ab1&deleted=true"

  const getAxiosUrl = (params: string) => {
    switch (params) {
      case "archived":
        return "/patterns/archived";
      case "favourites":
        return "/patterns/favourites";
      case "projects":
        return "/patterns/projects";
      default:
        return "/patterns/archived";
    }
  };

  const axiosUrl = getAxiosUrl("archived");

  // later will be dynamic to show favourite patterns, yarns or projects
    const fetchPatterns = async () => {
      try {
        setLoading(true);
        const response = await axiosAuthGet(axiosUrl, session);
        setPatterns(response.data);
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
      <Text>Archived Patterns</Text>
      <PatternsList patterns={patterns} source="user"/>
    </View>
  );
};

export default Archived;
