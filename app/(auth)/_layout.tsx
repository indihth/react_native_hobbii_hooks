import { Redirect, router, Stack } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/LoadingIndicator";
import { TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function AuthLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  // if (isLoading) {
  //   return <LoadingIndicator/>; // Replace with a spinner if needed
  // }

  // // Only require authentication within the (app) group's layout as users
  // // need to be able to access the (auth) group and sign in again.
  // if (!session) {
  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
  //   return <Redirect href="/(public)/index" />;
  // }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
    screenOptions={{ 
      contentStyle: { backgroundColor: "white" },
      headerShown: false,
     }}>
      {/* Renders everything inside of (tabs) using that _layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)/create" options={{ 
        presentation: "modal", // shows as model instead of new screen
        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-circle" size={24} />
          </TouchableOpacity>
        )
       }} />
       <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          presentation: 'modal',
          title: 'Edit profile',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen name="(OLDtabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="search/[query]" options={{ title: "Search results", headerShown: false }} /> */}
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
    // <Stack/>
  );
}
