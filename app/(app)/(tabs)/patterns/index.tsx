import axios from "axios";
import { axiosAuthGet } from "@/api/axiosInstance";

import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectCard from "@/components/ProjectCard";
import { PatternType, PatternTypeID } from "@/types/index";
import { Link, router } from "expo-router";
import { Button, Card, Text, IconButton } from "react-native-paper";
import { IResponseType } from "@/types";
import LoadingIndicator from "@/components/LoadingIndicator";
import SearchInput from "@/components/SearchInput";

// Placeholder image
// import placeholderImage from '@/assets/images/placeholderImage'

const Patterns = () => {
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
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

  // search function
  
  useEffect(() => {
    if (query) {
      const results = patterns.filter((pattern) =>
        pattern.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPatterns(results);
      console.log("results", results);
    } else {
      setFilteredPatterns(patterns);
    }
  }, [query, patterns]);

  if (loading || !patterns) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

  return (
    // <SafeAreaView className="flex-1 justify-center">
    <View className="flex-1 justify-center">
      <SearchInput query={query} setQuery={setQuery} />

      <Link href="/patterns/create" asChild>
        <Button>New Pattern</Button>
      </Link>
      <FlatList
        data={filteredPatterns}
        renderItem={({ item }) => (
          <Link push href={`/patterns/${item._id}`} asChild>
            <Pressable>
              <Card className="mb-10 ">
                <Card.Title
                  title={item.title}
                  subtitle={item.description}
                  // left={LeftContent}
                  // right={(props: any) => (
                  //   <IconButton
                  //     {...props}
                  //     icon={isSelected ? 'heart' : 'heart-outline'}
                  //     onPress={() => setIsSelected(!isSelected)}
                  //   />
                  // )}
                />
                {/* <Card.Content>
                  <Text variant="titleLarge">{item.title}</Text>
                  <Text variant="bodyMedium">{item.description}</Text>
                </Card.Content> */}
                <Card.Cover
                  source={{
                    uri: item.image_path
                      ? `${imageURL}${item.image_path[0]}`
                      : tempImage,
                  }}
                  // source={{ uri: tempImage }}
                  // source={{ uri:  `${imageURL}${item.image_path[0]}` }}
                />
              </Card>
            </Pressable>
          </Link>
        )}
        keyExtractor={(pattern: PatternTypeID) => pattern._id}
      />

      {/* <ProjectCard /> */}
    </View>
    // </SafeAreaView>
  );
};

export default Patterns;
