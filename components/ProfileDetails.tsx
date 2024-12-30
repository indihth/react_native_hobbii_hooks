import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useAuth, useSession } from "@/contexts/AuthContext";
import { axiosAuthGet } from "@/api/axiosInstance";
import { UserType } from "@/types/UserType";
import { Link, useFocusEffect } from "expo-router";

type ProfileDetailsProps = {
  userId?: string | null;
};

const ProfileDetails = ({ userId }: ProfileDetailsProps) => {
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const { session } = useSession();
  const { authUserId } = useAuth();

  const [user, setUser] = useState<UserType>();
  const isSelf = userId === authUserId;

  const tempImage = require("@/assets/images/swift.jpg");

  const fetchData = async () => {
    try {
      setLoading(true); // display loading text until api call is completed

      const response = await axiosAuthGet(`/users/${userId}`, session);
      setUser(response.data.data);

      // console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     fetchData();
//   }, [userId]);

// Not the best practice but shows updated user info after update.
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userId])
  );

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <View className="" style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{user?.full_name}</Text>
          <Text style={styles.location}>{user?.location}</Text>
        </View>
        <Image
          source={tempImage}
          // source={user?.image_path ? { uri: user.image_path as string } : tempImage}
          style={styles.image}
        />
      </View>

      <Text style={styles.about_me}>
        {user?.about_me ? user?.about_me : "No about me section yet"}
      </Text>
      <Text>{user?.website_url}</Text>

      <View style={styles.buttonRow}>
        {isSelf && (
          <>
            <Link
              href={{
                pathname: "/(auth)/(modal)/edit-profile",
                params: {
                  userId,
                  full_name: user?.full_name,
                  location: user?.location,
                  about_me: user?.about_me,
                  website_url: user?.website_url,
                  image_path: user?.image_path,
                },
              }}
              asChild
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit profile</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share profile</Text>
            </TouchableOpacity>
          </>
        )}

        {!isSelf && (
          <>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mention</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  about_me: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default ProfileDetails;
