import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/contexts/AuthContext";

// Import your global CSS file
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <SessionProvider>
          <SafeAreaView className="flex-1 justify-center">
            <Slot />
          </SafeAreaView>
        </SessionProvider>
        <StatusBar style="auto" />
      </PaperProvider>
    // </ThemeProvider>
  );
}
