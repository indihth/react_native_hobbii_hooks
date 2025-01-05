import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { axiosAuthGet } from "@/api/axiosInstance";
import { useAuth, useSession } from "@/contexts/AuthContext";
import { useFocusEffect } from "expo-router";

import { PatternTypeID } from "../types";
import PatternsList from "@/components/PatternsList";

const Favorites = () => {
  const { session, signOut } = useSession();
  const { authUserId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns

  const fetchPatterns = async () => {
    try {
      setLoading(true); // display loading text until api call is completed
      const response = await axiosAuthGet("/patterns/favourites", session);
      setPatterns(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPatterns();
    }, [])
  );

  return (
    <View>
     <PatternsList patterns={patterns} pathname="" />
    </View>
  );
};

export default Favorites;