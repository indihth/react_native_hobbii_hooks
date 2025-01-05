import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSession } from "@/contexts/AuthContext";

const styles = StyleSheet.create({
  createIconContainer: {
    // backgroundColor: "#fff",
    backgroundColor: Colors.itemBackground,
    padding: 10,
    borderRadius: 8,
  },
});

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={styles.createIconContainer}>
    <Ionicons name="add" size={size} color="black"/>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, signOut } = useSession();

  // Defines layout and look for tabs section
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false, // Prevents 'Tabs' from showing in a header, would have two headers
        headerTitleAlign: "center",
      }}
    >
      {/* <Tabs.Screen
        name="feed"
        options={{
          href: null,
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            // <View style={styles.createIconContainer}>
            <Ionicons name="add-circle-outline" size={size} color={color}/>
          // </View>
          ),
        }}
        // stops the icon from navigating to the create screen, allows for other actions
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // stops the create page from being navigated to
            // Haptics.selectionAsync();
            router.push("/(modal)/create" as any); // opens a modal view with the create form
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            if (router.canDismiss()) {
              router.dismissAll()
            }
          },
        }}
      />
       <Tabs.Screen
        name="logout"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color}/>
          ),
        }}
        // stops the icon from navigating to the create screen, allows for other actions
        listeners={{
          tabPress: () => signOut(),
        }}
      />
    </Tabs>
  );
}
