import { ImageBackground, useWindowDimensions, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { ProjectTypeID, YarnTypeID } from "@/types";
import FavouriteButton from "./FavouriteButton";
import { Link, RelativePathString, router } from "expo-router";
import DeleteButton from "./DeleteButton";
import { TabView } from "react-native-tab-view";
import DetailElement from "./DetailElement";
import YarnDetails from "./YarnDetails";
import { useSession } from "@/contexts/AuthContext";
import Tabs from "./Tabs";

type ProjectProps = {
  project: ProjectTypeID;
  source?: string;
  showBackButton?: boolean;
};

const Project: React.FC<ProjectProps> = ({
  project,
  source = "projects",
}) => {
  const { session } = useSession();
  // const id = project._id;

  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Project");
  const layout = useWindowDimensions();

  const tabTitles = ["Project", "Yarn"];
  const tempImage = require("@/assets/images/placeholderImage.png");

  let yarn: YarnTypeID;
  if (project?.yarns_used && project.yarns_used.length > 0) {
    yarn = project.yarns_used[0].yarn;
  }
  
  // if (project?.yarns_used[0].yarn ) {
  //   yarn = project?.yarns_used[0].yarn;
  // }
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  // Tab view for Project Information and Suggested Yarns
  const InfoRoute = () => (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Project Information
      </Text>
      <DetailElement title="Made for" value={project.made_for} />
      <DetailElement title="Craft Type" value={project.craft_type} />
      <DetailElement title="Project Notes" value={project.project_notes} />
      <DetailElement title="Needle/Hook Size" value={project.needle_size} />
      <DetailElement
        title="Start Date"
        value={
          project.started_date
            ? new Date(project.started_date).toLocaleDateString()
            : ""
        }
      />
      <DetailElement
        title="Completed Date"
        value={
          project.completed_date
            ? new Date(project.completed_date).toLocaleDateString()
            : ""
        }
      />
      <DetailElement title="Project Notes" value={project.project_notes} />
      <DetailElement title="Yarn Weight" value={yarn?.title} />
      <DetailElement title="Gauge" value={yarn?.weight} />
      <DetailElement title="Pattern Used" value={project.pattern.title} />
      <Text variant="bodyLarge" className="pt-3">
        {project?.description}{" "}
      </Text>
    </View>
  );

  const YarnsRoute = () => <YarnDetails yarn={yarn} />;

  return (
    <View>
      <View className="flex-1">
        <ImageBackground
          source={tempImage}
          // source={{ uri: `${project.image_path ?? [0]}` }}
          resizeMode="cover"
          style={{
            height: 500,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
        </ImageBackground>
      </View>

      <View className="px-3 pt-3">
        {/* <Text>{_id}</Text> */}
        <View className="flex-row justify-between items-baseline mb-5">
          <Text variant="displaySmall">{project.title}</Text>
          <Text variant="bodyMedium">{project.status}</Text>
        </View>
        {/* Pass id as a url query */}
        <View className="flex-row">
          <Link push href={`profile/projects/edit?_id=${project._id}`} asChild>
            <Button
            // onPress={() =>
            //         router.push({
            //           pathname: `(auth)/(tabs)/profile/patterns/edit` as RelativePathString,
            //           params: { _id: project._id },
            //         })}
            >
              Edit Project
            </Button>
          </Link>
          <DeleteButton
            resourceName="projects"
            text="Delete project"
            id={project._id}
            session={session}
            onDelete={() => console.log("pressed")}
          />
          {/* // onDelete={() => Alert.alert("Delete Project", "Project has been deleted successfully")} /> */}
          {/* onDelete={() => router.push("/projects")} /> */}
        </View>
        <Button onPress={() => console.log(project._id)}>Back</Button>

        <Tabs onTabChange={handleTabChange} tabTitles={tabTitles} />
        {activeTab === "Project" ? <InfoRoute /> : <YarnsRoute />}
      </View>
    </View>
  );
};

export default Project;
