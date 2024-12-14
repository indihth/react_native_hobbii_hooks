import { API_URL } from "@/config";
// import axios from "axios";
import { axiosAuth } from "@/api/axiosInstance";
import { PatternType } from "@/types/index";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Text,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";

import { useSession } from "@/contexts/AuthContext";

const PatternDetails = () => {
  const { session } = useSession();
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const [pattern, setPattern] = useState<PatternType>(); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "placeholderImage.png"


  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuth(`/patterns/${_id}`, session)
      .then((response) => {
        setPattern(response.data.data);
        setLoading(false);
        // console.log(pattern);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [_id, session]);

  // Display while loading
  if (loading || !pattern) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />; // Replace with a spinner if needed
  }
  return (
    <View>
      <Text>{_id}</Text>
      <Card className="mb-10 ">
        <Card.Title
          title={pattern.title}
          subtitle={pattern.description}
          // left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">{pattern.title}</Text>
          <Text variant="bodyMedium">{pattern.description}</Text>
        </Card.Content>
        <Card.Cover 
        // source={{ uri: `${imageURL}${pattern.image_path[0]}` }} 
        source={{ uri: "placeholderImage.png" }} 
        // source={{ uri: (pattern.image_path ? `${imageURL}${pattern.image_path[0]}`: tempImage) }}

        />
      </Card>
    </View>
  );
};

export default PatternDetails;