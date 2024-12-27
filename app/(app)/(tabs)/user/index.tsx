import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/contexts/AuthContext";
import { Button } from "react-native-paper";
import { Link, router } from "expo-router";

const Profile = () => {
  const { session, signOut } = useSession();

  const handlePress = (e: any) => {
    signOut();
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="flex-1 justify-center">
        <Text className="text-center ">User profile</Text>
        <Button onPress={handlePress} mode="contained">
          Logout
        </Button>

        {/* defines array of button titles */}
        {["Archived", "Favourites", "My_Patterns"].map(
          (resource) => (
            <Button
              key={resource}
              onPress={() =>
                router.push({
                  pathname: `/user/patterns`,
                  params: { resource },
                })
              }
              mode="contained"
            >
              {`${resource.replace("_", " ")}`}
            </Button>
          )
        )}
        {/* <Button onPress={() => router.push("/user/projects")} mode="contained">
          My Projects
        </Button> */}
        {/* <Button onPress={() => router.push("/user/favourites")} mode="contained">
          View Favourite Patterns
        </Button>
        <Button onPress={() => router.push("/user/archived")} mode="contained">
          View Archived Patterns
        </Button> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
