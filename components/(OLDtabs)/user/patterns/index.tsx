import axios from "axios";
import { axiosAuthGet } from "@/api/axiosInstance";

import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectCard from "@/components/PatternDetails";
import { Link, router, Stack } from "expo-router";
import { Button, Card, Text, IconButton } from "react-native-paper";
import LoadingIndicator from "@/components/LoadingIndicator";
import SearchInput from "@/components/SearchInput";
import PatternsList from "@/components/PatternsList";
import { PatternTypeID } from "@/types/index";
import { useSession } from "@/contexts/AuthContext";
import { useLocalSearchParams } from "expo-router";

type PatternsProps = {
  resource: string;
};

const Patterns = () => {
  const { session } = useSession();
  const { resource } = useLocalSearchParams<PatternsProps>();

  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [isSelected, setIsSelected] = useState(false);

  const getAxiosUrl = (params: string) => {
    switch (params) {
      case "Favourites":
        return "/patterns/favourites";
      case "Archived":
        return "/patterns/archived";
      case "My_Patterns":
        return "/patterns/my_patterns";
      default:
        return "/patterns/favourites";
    }
  };

  useEffect(() => {
    const fetchPatterns = async () => {
      const axiosUrl = getAxiosUrl(resource);

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

    fetchPatterns();
  }, []);

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
    // <SafeAreaView className="flex-1 justify-center">
    <View className="flex-1 justify-center">
      <Stack.Screen
        options={{
          title: `${resource.replace("_", " ")}`,
          headerTitle: (props) => (
            <View className="flex-1 flex-row items-center">
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {props.children}
              </Text>
            </View>
          ),
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (event) => setQuery(event.nativeEvent.text),
            tintColor: "#000",
            autoFocus: true,
            hideWhenScrolling: false,
            onCancelButtonPress: () => {},
          },
        }}
      />
      {/* <SearchInput query={query} setQuery={setQuery} /> */}

      <Link href="/patterns/create" asChild>
        <Button>New Pattern</Button>
      </Link>
      <PatternsList patterns={filteredPatterns} source="user/patterns" />

      {/* <ProjectCard /> */}
    </View>
    // </SafeAreaView>
  );
};

export default Patterns;
