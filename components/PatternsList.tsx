import { View, FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link, RelativePathString, router } from "expo-router";
import { Text } from "react-native-paper";
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
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => <PatternCard pattern={item} />}
      keyExtractor={(pattern: PatternTypeID) => pattern._id}
      ListEmptyComponent={<Text style={styles.emptyText} variant="titleMedium">No patterns</Text>}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default PatternsList;
