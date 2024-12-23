import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PatternsList from "@/components/PatternsList";
import { PatternTypeID } from "@/types";
import { axiosAuthGet } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";

const Favourites = () => {
  const { session } = useSession();

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns

  // later will be dynamic to show favourite patterns, yarns or projects

  // assuming favourite patterns
  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true);
        const response = await axiosAuthGet("/patterns/favourites", session);
        setPatterns(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  return (
    <View>
      <Text>Favourite Patterns</Text>
      <PatternsList patterns={patterns} />
    </View>
  );
};

export default Favourites;
