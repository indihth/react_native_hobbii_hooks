import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Link, RelativePathString, router } from "expo-router";
import { Card } from "react-native-paper";
import { PatternTypeID } from "../types";
import PatternCard from "./PatternCard";

type PatternsListProps = {
  patterns: PatternTypeID[];
};

const PatternsList: React.FC<PatternsListProps> = ({ patterns }) => {
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  return (
    <FlatList
      data={patterns}
      renderItem={({ item }) => (
       <PatternCard pattern={item}/>
      )}
      keyExtractor={(pattern: PatternTypeID) => pattern._id}
    />
  );
};

export default PatternsList;
