import { Redirect, Stack } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ActivityIndicator className="flex-1 items-center justify-center" animating={true} color={MD2Colors.red800} />;
    // return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      {/* Renders everything inside of (tabs) using that _layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    // <Stack/>
  );
}
