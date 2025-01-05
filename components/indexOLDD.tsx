import { axiosAuthGet } from "@/api/axiosInstance";

import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ProjectCard from "@/components/ProjectCard";
import { PatternTypeID, ProjectTypeID } from "@/types/index";
import { Stack } from "expo-router";
import { Text, SegmentedButtons } from "react-native-paper";
import { PathnameProvider } from "@/contexts/PathnameContext";
import PatternCard from "@/components/PatternCard";

// Placeholder image
// import placeholderImage from '@/assets/images/placeholderImage'
type FilterOptions = {
  craft_type: string;
  yarn_weight: string;
  // hook_size: string;
};

const SearchPage = () => {
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [projects, setProjects] = useState<ProjectTypeID[]>([]); // type of an array of Projects
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    craft_type: "knit",
    yarn_weight: "dk",
    // hook_size: '4.5', // implement later
  });

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [isSelected, setIsSelected] = useState(false);

  const [searchToggleValue, setSearchToggleValue] = useState("patterns");

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "./placeholderImage.png";

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const responsePatterns = await axiosAuthGet("/patterns");
        const responseProjects = await axiosAuthGet("/projects");
        setPatterns(responsePatterns.data);
        setProjects(responseProjects.data);
        console.log("patterns", responsePatterns.data);
        console.log("projects", responseProjects.data);
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

  // if (loading || !patterns) {
  //   return <LoadingIndicator />;
  // }

  const SearchToggle = () => {
    return (
      <SegmentedButtons
        value={searchToggleValue}
        onValueChange={setSearchToggleValue}
        buttons={[
          {
            value: "patterns",
            label: "Patterns",
            // style: styles.button,
            // showSelectedCheck: true,
          },
          {
            value: "projects",
            label: "Projects",
            // style: styles.button,
            // showSelectedCheck: true,
          },
        ]}
      />
    );
  };

  const FlatListContent = ({ item }: { item: any }) => {
    return searchToggleValue === "patterns" ? (
      <PathnameProvider value="search">
        <PatternCard pattern={item} />
      </PathnameProvider>
    ) : (
      <ProjectCard project={item} />
    );
  };

  return (
    // <SafeAreaView className="flex-1 justify-center">
    <View className="flex-1 justify-center">
      <Stack.Screen
        options={{
          title: "Search",
          headerShown: true,
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

      <FlatList
        data={searchToggleValue === "Patterns" ? patterns : projects}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FlatListContent item={item} />}
        keyExtractor={
          searchToggleValue === "Patterns"
            ? (pattern: PatternTypeID) => pattern._id
            : (project: ProjectTypeID) => project._id
        }
        ListEmptyComponent={<Text>Empty</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={
          <View>
            <SearchToggle />
          </View>
        }
      />
    </View>
    // </SafeAreaView>
  );
};

export default SearchPage;
