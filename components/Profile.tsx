import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native";
import { useAuth, useSession } from "@/contexts/AuthContext";
import { RelativePathString, router, useFocusEffect } from "expo-router";
import ProfileDetails from "./ProfileDetails";
import Tabs from "./Tabs";
import { Card } from "react-native-paper";
import { PatternTypeID, ProjectTypeID } from "../types";
import { axiosAuthGet } from "@/api/axiosInstance";
import { formatStatus } from "@/utils/formatStatus";
import PatternCard from "./PatternCard";
import ProjectCard from "./ProjectCard";
import { PathnameContext } from "@/contexts/PathnameContext";
import LoadingIndicator from "./LoadingIndicator";

type ProfileProps = {
  userId?: string;
  showBackButton?: boolean;
};

const Profile = ({ userId, showBackButton = false }: ProfileProps) => {
  const { session, signOut } = useSession();
  const { authUserId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [projects, setProjects] = useState<ProjectTypeID[]>([]); // type of an array of Projects

  //   const [tabTitles, setTabTitles] = useState<string[]>();
  const isSelf = !userId || userId === authUserId;

  const tabTitles = isSelf ? ["Patterns", "Projects"] : ["Patterns"];
  const [activeTab, setActiveTab] = useState<string>(tabTitles[0]);

  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  const fetchData = async () => {
    try {
      setLoading(true);
      if (isSelf) {
        // if (userId === authUserId) {
        // const response = await axiosAuthGet(`/users/${authUserId}`, session);
        fetchPatterns();
        fetchProjects();

        // Handle the response data as needed
      } else {
        const response = await axiosAuthGet(
          `/patterns?userId=${userId}`,
          session
        );
        setPatterns(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, authUserId]);
  // useEffect(() => {
  const fetchPatterns = async () => {
    try {
      setLoading(true); // display loading text until api call is completed
      const response = await axiosAuthGet("/patterns/my_patterns", session);
      setPatterns(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const fetchProjects = async () => {
    try {
      setLoading(true); // display loading text until api call is completed
      const response = await axiosAuthGet("/projects/my_projects", session);
      setProjects(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userId])
  );

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const FlatListContent = ({ item }: { item: any }) => {
    return activeTab === "Patterns" ? (
      <PathnameContext.Provider value="profile/patterns">
        <PatternCard pattern={item} />
      </PathnameContext.Provider>
    ) : (
      <ProjectCard project={item} />
    );
  };

  return (
    <View>
      <FlatList
        data={activeTab === "Patterns" ? patterns : projects}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FlatListContent item={item} />}
        keyExtractor={
          activeTab === "Patterns"
            ? (pattern: PatternTypeID) => pattern._id
            : (project: ProjectTypeID) => project._id
        }
        ListEmptyComponent={loading ? <LoadingIndicator /> : <Text>Empty</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={
          <>
            {showBackButton ?? (
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="chevron-back" size={24} color="#000" />
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Return either logged in user profile or view another users' profile */}
            {userId ? (
              <ProfileDetails userId={userId} />
            ) : (
              <ProfileDetails userId={authUserId} />
            )}
            <Tabs tabTitles={tabTitles} onTabChange={handleTabChange} />
          </>
        }
      />
    </View>
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
    marginTop: 16,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
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
