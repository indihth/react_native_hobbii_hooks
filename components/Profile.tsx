import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native";
import { useAuth, useSession } from "@/contexts/AuthContext";
import { RelativePathString, router } from "expo-router";
import ProfileDetails from "./ProfileDetails";
import Tabs from "./Tabs";
import { Card } from "react-native-paper";
import { PatternTypeID } from "../types";
import { axiosAuthGet } from "@/api/axiosInstance";

type ProfileProps = {
  userId?: string;
  showBackButton?: boolean;
};

const Profile = ({ userId, showBackButton = false }: ProfileProps) => {
  const { session, signOut } = useSession();
  const { authUserId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns

  //   const [tabTitles, setTabTitles] = useState<string[]>();
  const [activeTab, setActiveTab] = useState<string>("Favourites");

  const tabTitlesOwn = ["Favourites", "My Projects"];
  const tabTitlesOther = ["Favourites", "Projects"];

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const response = await axiosAuthGet("/patterns/favourites", session);
        setPatterns(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  // checks if user is viewing their own profile, defines tabs based on this
  //   useEffect(() => {
  //     const isSelf = userId === authUserId;
  //     setTabTitles(
  //       isSelf ? ["My Patterns", "Favourites", "My Projects"] : ["Patterns", "Projects"]
  //     );
  //   }, [userId]);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const FlatListContent = ({ item }: { item: any }) => {
    return activeTab === "Favourites" ? (
      <FavouritePatterns item={item} />
    ) : (
      <Text>Other Tab Content</Text>
    );
  };

  const FavouritePatterns = ({ item }: { item: any }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/feed/[_id]` as RelativePathString,
          params: { _id: item._id },
        })
      }
    >
      <Card className="mb-10">
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
  );

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={activeTab === "Favourites" ? patterns : []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FlatListContent item={item} />}
          keyExtractor={activeTab === "Favourites" ? ((pattern: PatternTypeID) => pattern._id) : undefined}
          ListEmptyComponent={<Text>Empty</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                {showBackButton ? (
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                  >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                    <Text style={styles.backText}>Back</Text>
                  </TouchableOpacity>
                ) : (
                  <Ionicons name="at-outline" size={24} color="black" />
                )}
                <View style={styles.headerIcons}>
                  <Ionicons name="globe-outline" size={24} color="black" />
                  <TouchableOpacity onPress={() => signOut()}>
                    <Ionicons name="log-out-outline" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Return either logged in user profile or view another users' profile */}
              {userId ? (
                <ProfileDetails userId={userId} />
              ) : (
                <ProfileDetails userId={authUserId} />
              )}
              {userId ? (
                <Tabs
                  tabTitles={tabTitlesOther}
                  onTabChange={handleTabChange}
                />
              ) : (
                <Tabs tabTitles={tabTitlesOwn} onTabChange={handleTabChange} />
              )}
            </>
          }
        />
        {/* <Tabs tabTitles={tabTitles} onTabChange={handleTabChange} /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    // color: Colors.border,
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
});

export default Profile;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
