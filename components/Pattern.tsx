import { ImageBackground, useWindowDimensions, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { PatternTypeID } from "@/types";
import FavouriteButton from "./FavouriteButton";
import { Link } from "expo-router";
import DeleteButton from "./DeleteButton";
import { TabView } from "react-native-tab-view";
import DetailElement from "./DetailElement";
import SuggestedYarns from "./SuggestedYarns";
import { useSession } from "@/contexts/AuthContext";

type PatternProps = {
  pattern: PatternTypeID;
  source?: string;
};

const Pattern: React.FC<PatternProps> = ({ pattern, source = "patterns" }) => {
  const { session } = useSession();
  // const id = pattern._id;

  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  // Tab view for Pattern Information and Suggested Yarns
  const InfoRoute = () => (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Pattern Information
      </Text>
      <DetailElement title="Yarn Weight" value={pattern?.yarn_weight} />
      <DetailElement title="Gauge" value={pattern?.gauge} />
      <DetailElement title="Meterage" value={pattern?.meterage} />
      <Text variant="bodyLarge" className="pt-3">
        {pattern?.description}{" "}
      </Text>
    </View>
  );

  const YarnsRoute = () => (
    <SuggestedYarns suggested_yarn={pattern?.suggested_yarn} />
  );

  const routes = [
    { key: "info", title: "Info" },
    { key: "yarns", title: "Yarns" },
  ];
  return (
    <View>
      <View className="flex-1">
        <ImageBackground
          source={{ uri: `${pattern.image_path ?? [0]}` }}
          resizeMode="cover"
          style={{
            height: 500,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <FavouriteButton
            resourceName="patterns"
            id={pattern._id}
            session={session}
          />
        </ImageBackground>
      </View>

      <View className="px-3 pt-3">
        {/* <Text>{_id}</Text> */}
        <View className="flex-row justify-between items-baseline mb-5">
          <Text variant="displaySmall">{pattern.title}</Text>
          <Text variant="bodyMedium">by {pattern.user?.full_name}</Text>
        </View>
        {/* Pass id as a url query */}
        <View className="flex-row">
          <Link push href={`/${source}/edit?id=${pattern._id}`} asChild>
            <Button>Edit Pattern</Button>
          </Link>
          <DeleteButton
            resourceName="patterns"
            id={pattern._id}
            session={session}
            onDelete={() => console.log("pressed")}
          />
          {/* // onDelete={() => Alert.alert("Delete Pattern", "Pattern has been deleted successfully")} /> */}
          {/* onDelete={() => router.push("/patterns")} /> */}
        </View>
        {/* <SuggestedYarns suggested_yarn={pattern?.suggested_yarn} /> */}
        
        <TabView
          navigationState={{ index, routes }}
          // renderScene={renderScene}
          // Prevent unnecessary re-renders
          renderScene={({ route }) => {
            switch (route.key) {
              case "info":
                return <InfoRoute />;
              case "yarns":
                return <YarnsRoute />;
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          // initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    </View>
  );
};

export default Pattern;
