import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot, Redirect, useSegments, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider, useSession } from "@/contexts/AuthContext";

// Import your global CSS file
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "@/components/LoadingIndicator";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isLoading) return;

      const inAuthGroup = segments[0] === "(auth)";

      if (session && !inAuthGroup) {
        router.replace("/(auth)/(tabs)/feed" as any);
      } else if (!session && inAuthGroup) {
        router.replace("/(public)" as any);
      }

  }, [session]);

// Signin screen displaying for a second before session is rechecked
  // if (!loaded || isLoading) {
  //   return <LoadingIndicator />;
  // }

  return <Slot />;

};

const RootLayout = () => {
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <PaperProvider>
      <SessionProvider>
        <SafeAreaView className="flex-1 justify-center">
          <InitialLayout />
        </SafeAreaView>
      </SessionProvider>
      <StatusBar style="auto" />
    </PaperProvider>
    // </ThemeProvider>
  );
};

export default RootLayout;
