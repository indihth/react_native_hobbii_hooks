import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native";
import { useAuth, useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";
import ProfileDetails from "./ProfileDetails";
import Tabs from "./Tabs";

type ProfileProps = {
  userId?: string;
  showBackButton?: boolean;
};

const Profile = ({
  userId,
  showBackButton = false,
}: ProfileProps) => {
  const { session, signOut } = useSession();
  const { authUserId } = useAuth();
  //   const [tabTitles, setTabTitles] = useState<string[]>();
  const [activeTab, setActiveTab] = useState("Patterns");

  const tabTitlesOwn = ["Patterns", "Favourites", "Projects"];
  const tabTitlesOther = ["Patterns", "Projects"];

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

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={[]}
          renderItem={({ item }) => <Text>test</Text>}
          // keyExtractor={(item) => item.id}
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
            </>
          }
        />
        {userId ? (
          <Tabs tabTitles={tabTitlesOther} onTabChange={handleTabChange} />
        ) : (
          <Tabs tabTitles={tabTitlesOwn} onTabChange={handleTabChange} />
        )}
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
