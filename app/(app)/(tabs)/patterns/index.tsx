import axios from "axios";
import { axiosAuth } from "@/api/axiosInstance";

import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectCard from "@/components/ProjectCard";
import { PatternType, PatternTypeID } from "@/types/index";
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

// Placeholder image
// import placeholderImage from '@/assets/images/placeholderImage'


const Patterns = () => {
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "./placeholderImage.png"

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const response = await axiosAuth("/patterns");
        setPatterns(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
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
                  source={{ uri: (item.image_path ? `${imageURL}${item.image_path[0]}`: tempImage) }}
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
