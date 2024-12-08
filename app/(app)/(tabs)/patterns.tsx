import ProjectCard from "@/components/projectCard";
import { API_URL } from "@/config";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';


// Define Pattern interface
interface Pattern {
  id: number;
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

  const pattern = patterns[patterns.length -1];

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/"

  useEffect(() => {
    setLoading(true) // display loading text until api call is completed
    // API call to get all patterns
    axios
      .get(`${API_URL}/patterns`, {})
      .then((response) => {
        setPatterns(response.data);
        setLoading(false)
        // console.log(patterns);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  console.log(pattern)

  if (loading) {
    return  <ActivityIndicator animating={true} color={MD2Colors.red800} /> // Replace with a spinner if needed
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="flex-1 justify-center">
        <Text className="text-center ">Search patterns</Text>

        <Card>
          <Card.Title
            title={pattern.title}
            subtitle={pattern.description}
            // left={LeftContent}
          />

          <Card.Content>
            <Text variant="titleLarge">{pattern.title}</Text>
            <Text variant="bodyMedium">{pattern.description}</Text>
          </Card.Content>
          <Card.Cover source={{ uri:`${imageURL}${pattern.image_path[0]}` }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>

        {/* <ProjectCard /> */}
      </View>
    </SafeAreaView>
  );
};

export default Patterns;
