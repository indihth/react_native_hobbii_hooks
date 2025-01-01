import { ImageBackground, useWindowDimensions, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { PatternTypeID } from "@/types";
import FavouriteButton from "./FavouriteButton";
import { Link } from "expo-router";
import DeleteButton from "./DeleteButton";
import { TabView } from "react-native-tab-view";
import DetailElement from "./DetailElement";
import YarnDetails from "./YarnDetails";
import { useSession } from "@/contexts/AuthContext";
import Tabs from "./Tabs";

type PatternProps = {
  project: PatternTypeID;
  source?: string;
  showBackButton?: boolean;
};

const Project: React.FC<PatternProps> = ({
  project,
  source = "projects",
  showBackButton = false,
}) => {
  const { session } = useSession();
  // const id = project._id;

  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Project");
  const layout = useWindowDimensions();

  const tabTitles = ["Project", "Yarn"];
  const tempImage = require("@/assets/images/placeholderImage.png");

  const yarn = project?.yarns_used[0].yarn

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  // Tab view for Project Information and Suggested Yarns
  const InfoRoute = () => (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Project Information
      </Text>
      {/* <DetailElement title="Yarn Weight" value={yarn.title} />
      <DetailElement title="Gauge" value={yarn.weight} />
      <DetailElement title="Meterage" value={project?.meterage} />
      <Text variant="bodyLarge" className="pt-3">
        {project?.description}{" "}
      </Text> */}
    </View>
  );

  const YarnsRoute = () => (
    <YarnDetails yarn={yarn} />
  );

  const routes = [
    { key: "info", title: "Info" },
    { key: "yarns", title: "Yarns" },
  ];
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
          {/* <FavouriteButton
            resourceName="projects"
            id={project._id}
            session={session}
          /> */}
        </ImageBackground>
      </View>

      <View className="px-3 pt-3">
        {/* <Text>{_id}</Text> */}
        <View className="flex-row justify-between items-baseline mb-5">
          <Text variant="displaySmall">{project.title}</Text>
          <Text variant="bodyMedium">{project.craft_type}</Text>
        </View>
        {/* Pass id as a url query */}
        <View className="flex-row">
          <Link push href={`/${source}/edit?id=${project._id}`} asChild>
            <Button>Edit Project</Button>
          </Link>
          <DeleteButton
            resourceName="projects"
            id={project._id}
            session={session}
            onDelete={() => console.log("pressed")}
          />
          {/* // onDelete={() => Alert.alert("Delete Project", "Project has been deleted successfully")} /> */}
          {/* onDelete={() => router.push("/projects")} /> */}
        </View>

        <Tabs onTabChange={handleTabChange} tabTitles={tabTitles} />
        {activeTab === "Project" ? <InfoRoute /> : <YarnsRoute />}
      </View>
    </View>
  );
};

export default Project;
