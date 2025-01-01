import { axiosAuthGet } from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import { View } from "react-native";
import { PatternTypeID } from "@/types/index";
import { Stack } from "expo-router";
import { Text } from "react-native-paper";
import LoadingIndicator from "@/components/LoadingIndicator";
import PatternsList from "@/components/PatternsList";

// Placeholder image
// import placeholderImage from '@/assets/images/placeholderImage'

const Projects = () => {
  const [projects, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Projects
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [isSelected, setIsSelected] = useState(false);

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "./placeholderImage.png";

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const response = await axiosAuthGet("/projects");
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
      const results = projects.filter(
        (pattern) => pattern.title.toLowerCase().includes(query.toLowerCase()) // everything in lowercase
      );
      setFilteredPatterns(results);
    } else {
      setFilteredPatterns(projects);
    }
  }, [query, projects]);

  if (loading || !projects) {
    return <LoadingIndicator />;
  }

  return (
    // <SafeAreaView className="flex-1 justify-center">
    <View className="flex-1 justify-center">
       <Stack.Screen
        options={{
          title: 'Search',
          headerShown: true,
          headerTitle: (props) => (
            <View className="flex-1 flex-row items-center">
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.children}</Text>
            </View>
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            onChangeText: (event) => setQuery(event.nativeEvent.text),
            tintColor: '#000',
            autoFocus: true,
            hideWhenScrolling: false,
            onCancelButtonPress: () => {},
          },
        }}
      />
      {/* <SearchInput query={query} setQuery={setQuery} /> */}

      {/* <Link href="/projects/create" asChild>
        <Button>New Pattern</Button>
      </Link> */}
      <PatternsList projects={filteredPatterns} source="projects"/>

      {/* <ProjectCard /> */}
    </View>
    // </SafeAreaView>
  );
};

export default Projects;
