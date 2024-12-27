import { Stack } from "expo-router/stack";

export default function UserLayout({ segment }: { segment: string }) {
  return (
    <Stack
    // screenOptions={{
    //   headerTitle: segment === "users" ? "User Patterns" : "Patterns",
    // }}
    // />
    >
      <Stack.Screen name="index" options={{ title: "My Profile" }} />
      <Stack.Screen name="patterns" options={{ title: "My Patterns", headerShown: false}} />
      <Stack.Screen name="projects" options={{ title: "My Projects" }} />
      <Stack.Screen name="favourites" options={{ headerShown: false }} />
      <Stack.Screen name="archived" options={{ title: "Archived" }} />
    </Stack>
  );
}
