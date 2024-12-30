import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Link, RelativePathString, router } from "expo-router";
import { Card } from "react-native-paper";
import { PatternTypeID } from "../types";

type PatternsListProps = {
  patterns: PatternTypeID[];
  source?: string;
};

const PatternsList: React.FC<PatternsListProps> = ({ patterns, source = "patterns" }) => {
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  return (
    <FlatList
      data={patterns}
      renderItem={({ item }) => (
       
        <Pressable
          onPress={() =>
            // router.push(`/${source}/${item._id}`)
            router.push({
              pathname: `/feed/[_id]` as RelativePathString,
              params: { _id: item._id }
            })
          }
        >
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
      )}
      keyExtractor={(pattern: PatternTypeID) => pattern._id}
    />
  );
};

export default PatternsList;
