import axios from "axios";
import { axiosAuth } from "@/api/axiosInstance";

import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectCard from "@/components/ProjectCard";
import { PatternType } from "@/types/index";
import { API_URL } from "@/config";
import { Link, router } from "expo-router";
import {
  Button,
  Card,
  Text,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import { IResponseType } from "@/types";

// Define Pattern interface
interface Pattern {
  _id: number;
  title: string;
  description: string;
  craft_type: string;
  suggested_yarn: string;
  yarn_weight: string;
  gauge: string;
  meterage: string;
  user: { id: number; full_name: string }; // object with id and full_name
  image_path: string[]; // array of strings
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  // Add other properties as needed
}

const Patterns = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const pattern = patterns[patterns.length - 1];

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";

  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuth("/patterns")
      .then((response) => {
        setPatterns(response.data);
        setLoading(false);
        // console.log(patterns);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />; // Replace with a spinner if needed
  }

  return (
    // <SafeAreaView className="flex-1 justify-center">
    <View className="flex-1 justify-center">
      <Text className="text-center ">Search patterns</Text>

      <Pressable>
        <Link href="/patterns/create" asChild>
          <Button>New Pattern</Button>
        </Link>
      </Pressable>
      <FlatList
        data={patterns}
        renderItem={({ item }) => (
          <Link push href={`/patterns/${item._id}`} asChild>
            <Pressable>
              <Card className="mb-10 ">
                {/* <Card.Title
                    title={item.title}
                    subtitle={item.description}
                    // left={LeftContent}
                  /> */}
                <Card.Content>
                  <Text variant="titleLarge">{item.title}</Text>
                  <Text variant="bodyMedium">{item.description}</Text>
                </Card.Content>
                <Card.Cover
                  source={{ uri: `${imageURL}${item.image_path[0]}` }}
                />
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions> */}
              </Card>
            </Pressable>
          </Link>
        )}
      />

      {/* <ProjectCard /> */}
    </View>
    // </SafeAreaView>
  );
};

export default Patterns;
