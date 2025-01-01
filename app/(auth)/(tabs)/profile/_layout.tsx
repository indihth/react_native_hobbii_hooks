import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="projects" options={{ headerShown: false }} />
      <Stack.Screen name="patterns" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="[_id]"
        options={{
          headerShown: true,
          title: "Profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              // style={styles.backButton}
              className="flex-row items-center"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#000" />
              <Text 
              // style={styles.backText}
              className="flex-row items-center"
              >Back</Text>
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Stack>
  );
};

export default Layout;
