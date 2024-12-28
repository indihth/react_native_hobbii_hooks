import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { router } from 'expo-router';

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSession } from "@/contexts/AuthContext";

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: Colors.itemBackground,
    padding: 10,
    borderRadius: 8,
  },
})

const CreateTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={focused ? "add" : "add-outline"}
        size={24}
        color="black"
      />
    </View>
  );
};

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
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color="black"
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => (
            <CreateTabIcon color={color} size={size} focused={focused} />
          ),
        }}
        // stops the icon from navigating to the create screen, allows for other actions
        listeners={{ 
          tabPress: (e) => {
            e.preventDefault(); // stops the create page from being navigated to
            // Haptics.selectionAsync();
            router.push('/(modal)/create' as any) // opens a modal view with the create form
          }
         }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color="black"
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="log-out" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
