import React from "react";
import { View, Text, Pressable } from "react-native";
import { ProjectTypeID } from "@/types";
import { RelativePathString, router } from "expo-router";
import { Card } from "react-native-paper";
import { formatStatus } from "@/utils/formatStatus";

type ProjectCardProps = {
  project: ProjectTypeID;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  return (
    <Pressable
        onPress={() =>
          router.push({
            pathname:
              `(auth)/(tabs)/profile/projects/[_id]` as RelativePathString,
            params: { _id: project._id },
          })
        }
        onLongPress={() => console.log("Long Press")}
      >
        <Card >
          <Card.Title title={project.title} subtitle={project.craft_type} />
          <Card.Cover
                // source={{
                //   uri: project.image_path
                //     ? `${imageURL}${project.image_path}`
                //     : tempImage,
                // }}
                source={tempImage}
              />
          <Card.Content>
            <Text>{formatStatus(project.status)}</Text>
          </Card.Content>
        </Card>
      </Pressable>
  );
};

export default ProjectCard;
