import { axiosAuthGet } from "@/api/axiosInstance";
import { useCallback, useEffect, useState } from "react";

import { View } from "react-native";
import { PatternTypeID } from "@/types/index";
import { Stack, useFocusEffect, usePathname } from "expo-router";
import { Text } from "react-native-paper";
import LoadingIndicator from "@/components/LoadingIndicator";
import PatternsList from "@/components/PatternsList";
import { useSession } from "@/contexts/AuthContext";

type PatternsProps = {
  api_endpoint: string;
};

const Patterns = ({ api_endpoint }: PatternsProps) => {
  const { session } = useSession();
  const { pathname } = usePathname();
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const fetchPatterns = async () => {
    try {
      setLoading(true); // display loading text until api call is completed
      const response = await axiosAuthGet(api_endpoint, session);
      if (response.data.length === 0) {
        setPatterns([]);
      } else {
        setPatterns(response.data);
      }
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

  useEffect(() => {
    if (query) {
      // search function
      const results = patterns.filter(
        (pattern) => pattern.title.toLowerCase().includes(query.toLowerCase()) // everything in lowercase
      );
      setFilteredPatterns(results);
    } else {
      setFilteredPatterns(patterns);
    }
  }, [query, patterns]);

  if (loading || !patterns) {
    return <LoadingIndicator />;
  }

  

  return (
    <View className="flex-1 justify-center">
      <PatternsList patterns={filteredPatterns} />
    </View>
  );
};

export default Patterns;
