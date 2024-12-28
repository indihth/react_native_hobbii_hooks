import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSession } from "@/contexts/AuthContext";

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
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          href: null,
        }}
      />
      <Tabs.Screen
        name="patterns"
        options={{
          title: "Patterns",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "add" : "add-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          href: null,
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
        }}
      />
      <Tabs.Screen
        name="yarns"
        options={{
          title: "Yarns",
          href: null,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Me",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color="black"
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Text className="mr-5">Log out</Text>
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />

      {/* Nested stack layout */}
      {/* <Stack>
        <Stack.Screen
          name="patterns/[id]"
          options={{ title: "Pattern Details" }}
        />
        <Stack.Screen name="yarns/[id]" options={{ title: "Yarn Details" }} />
      </Stack> */}
    </Tabs>
  );
}
