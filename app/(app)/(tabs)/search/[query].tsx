import { View, Text, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { axiosAuthGet } from "@/api/axiosInstance";
import { PatternTypeID } from "@/types";
import { Button, Card } from "react-native-paper";

const Search = () => {
  const { query } = useLocalSearchParams<{ query: string }>();

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "./placeholderImage.png";

  useEffect(() => {
    if (patterns.length === 0) {
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
  }
  }, []);

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

  return (
    <View className="flex-1 justify-center">
      <Text className="text-center ">{query}</Text>

      <Link href="/patterns/create" asChild>
        <Button>New Pattern</Button>
      </Link>
      <FlatList
        data={filteredPatterns}
        renderItem={({ item }) => (
          // <Link push href={`/patterns/${item._id}`} asChild>
          <Pressable onPress={() => router.push(`/patterns/${item._id}`)}>
            <Card className="mb-10 ">
              <Card.Title title={item.title} subtitle={item.description} />
              <Card.Cover
                source={{
                  uri: item.image_path
                    ? `${imageURL}${item.image_path[0]}`
                    : tempImage,
                }}
              />
            </Card>
          </Pressable>
          // </Link>
        )}
        keyExtractor={(pattern: PatternTypeID) => pattern._id}
      />
    </View>
  );
};

export default Search;
