import {
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { ProjectTypeID, YarnTypeID } from "@/types";
import FavouriteButton from "./FavouriteButton";
import { Link, RelativePathString, router, Stack } from "expo-router";
import DeleteButton from "./DeleteButton";
import { TabView } from "react-native-tab-view";
import DetailElement from "./DetailElement";
import YarnDetails from "./YarnDetails";
import { useAuth, useSession } from "@/contexts/AuthContext";
import Tabs from "./Tabs";
import { formatStatus } from "@/utils/formatStatus";

type ProjectProps = {
  project: ProjectTypeID;
  source?: string;
  showBackButton?: boolean;
};

const Project: React.FC<ProjectProps> = ({ project, source = "projects" }) => {
  const { session } = useSession();
  const { authUserId } = useAuth();

  const [activeTab, setActiveTab] = useState("Project");
  const isSelf = project.user._id === authUserId;

  const tabTitles = ["Project", "Yarn"];
  const tempImage = require("@/assets/images/placeholderImage.png");

  let yarn: YarnTypeID;
  if (project?.yarns_used && project.yarns_used.length > 0) {
    yarn = project.yarns_used[0].yarn;
  }

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  // Tab view for Project Information and Suggested Yarns
  const InfoRoute = () => (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Project Information
      </Text>
      <Text variant="bodyMedium" className="pb-3">
        {project.project_notes}
      </Text>
      <DetailElement title="Made for" value={project.made_for} />
      <DetailElement title="Craft Type" value={project.craft_type} />
      {/* <DetailElement title="Project Notes" value={project.project_notes} /> */}
      <DetailElement title="Needle/Hook Size" value={project.needle_size} />
      <DetailElement
        title="Start Date"
        value={
          project.started_date
            ? new Date(project.started_date).toLocaleDateString("en-GB")
            : ""
        }
      />
      <DetailElement
        title="Completed Date"
        value={
          project.completed_date
            ? new Date(project.completed_date).toLocaleDateString("en-GB")
            : ""
        }
      />
      <DetailElement title="Yarn Weight" value={yarn?.weight} />
      <DetailElement title="Pattern Used" value={project.pattern?.title} />
      <Text variant="bodyLarge" className="pt-3">
        {project?.description}{" "}
      </Text>
    </View>
  );

  const Button = () => {
    return (
      <View className="flex-row">
        <DeleteButton
          resourceName="projects"
          text="Delete project"
          id={project._id}
          session={session}
        />
      </View>
    );
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/profile/projects/edit`,
                  params: { _id: project._id },
                })
              }
            >
              <Text>Edit</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1">
        <ImageBackground
          // source={tempImage}
          source={{ uri: `${project.image_path ?? [0]}` }}
          resizeMode="cover"
          style={{
            height: 500,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        ></ImageBackground>
      </View>

      <View className="px-3 pt-3">
        {/* <Text>{_id}</Text> */}
        <View className="flex-row justify-between items-baseline mb-5">
          {/* Shows edit and delete only if user is owner */}
          <Text variant="displaySmall">{project.title}</Text>
          <Text variant="bodyMedium">{formatStatus(project.status)}</Text>
        </View>

        <Tabs onTabChange={handleTabChange} tabTitles={tabTitles} />
        {activeTab === "Project" ? <InfoRoute /> : <YarnDetails yarn={yarn} />}
        <View className="items-center">{isSelf && <Button />}</View>
      </View>
    </View>
  );
};

export default Project;
