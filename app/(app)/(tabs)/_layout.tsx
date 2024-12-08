

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Defines layout and look for tabs section
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, // Prevents 'Tabs' from showing in a header, would have two headers
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="patterns"
        options={{
          title: 'Patterns'
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects'
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me'
        }}
      />

    </Tabs>
  );
}
