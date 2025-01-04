import axios from "axios";
import { axiosAuthGet } from "@/api/axiosInstance";

import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectCard from "@/components/PatternDetails";
import { PatternTypeID } from "@/types/index";
import { Link, router, Stack } from "expo-router";
import { Text, SegmentedButtons } from "react-native-paper";
import LoadingIndicator from "@/components/LoadingIndicator";
import SearchInput from "@/components/SearchInput";
import PatternsList from "@/components/PatternsList";
import { FrameInfo } from "react-native-reanimated";

// Placeholder image
// import placeholderImage from '@/assets/images/placeholderImage'
type FilterOptions = {
  craft_type: string;
  yarn_weight: string;
  // hook_size: string;
};

const SearchPage = () => {
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    craft_type: "knit",
    yarn_weight: "dk",
    // hook_size: '4.5', // implement later
  });

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [isSelected, setIsSelected] = useState(false);

  const [value, setValue] = useState("knit");

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "./placeholderImage.png";

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const response = await axiosAuthGet("/patterns");
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
          title: "Search",
          headerTitle: (props) => (
            <View style={{ flex: 1, flexDirection: "row" }}>
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
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "knit",
            label: "Knit",
            // style: styles.button,
            // showSelectedCheck: true,
          },
          {
            value: "crochet",
            label: "Crochet",
            // style: styles.button,
            // showSelectedCheck: true,
          },
        ]}
        // style={styles.group}
      />

      <PatternsList patterns={filteredPatterns} source="search/patterns" />

      {/* <ProjectCard /> */}
    </View>
    // </SafeAreaView>
  );
};

export default SearchPage;
