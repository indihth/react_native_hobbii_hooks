
import { Link, RelativePathString, router } from "expo-router";

import { axiosAuthGet } from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { ProjectTypeID } from "@/types/index";
import { useAuth } from "@/contexts/AuthContext";

import { Card } from "react-native-paper";
import { FlatList, Pressable, View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "react-native-paper";
import LoadingIndicator from "@/components/LoadingIndicator";
import PatternsList from "@/components/PatternsList";


const ProjectsList = ({ projects: initialProjects }: { projects: ProjectTypeID[] }) => {
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  const [projects, setPatterns] = useState<ProjectTypeID[]>(initialProjects); // type of an array of Projects
  const [filteredPatterns, setFilteredPatterns] = useState<ProjectTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [isSelected, setIsSelected] = useState(false);

  return (
    <FlatList
      data={projects}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            // router.push(`/${source}/${item._id}`)
            router.push({
              pathname: `/projects/[_id]` as RelativePathString,
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
      keyExtractor={(project: ProjectTypeID) => project._id}
    />
  );
};

export default ProjectsList;
