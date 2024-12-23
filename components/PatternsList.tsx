import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Card } from "react-native-paper";
import { PatternTypeID } from "../types";

type PatternsListProps = {
  patterns: PatternTypeID[];
};

const PatternsList: React.FC<PatternsListProps> = ({ patterns }) => {
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = "./placeholderImage.png";

  return (
    <FlatList
      data={patterns}
      renderItem={({ item }) => (
        <Link push href={`/patterns/${item._id}`} asChild>
          <Pressable>
            <Card className="mb-10 ">
              <Card.Title
                title={item.title}
                subtitle={item.description}
                />
              <Card.Cover
                source={{
                  uri: item.image_path
                    ? `${imageURL}${item.image_path[0]}`
                    : tempImage,
                }}
                />
            </Card>
          </Pressable>
        </Link>
      )}
      keyExtractor={(pattern: PatternTypeID) => pattern._id}
    />
  );
};

export default PatternsList;
