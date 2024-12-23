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
      <Stack.Screen name="favourites" options={{ title: "My favourites" }} />
      <Stack.Screen name="archived" options={{ title: "Archived" }} />
      <Stack.Screen name="[_id]" options={{ title: "Favourited Pattern" }} />
    </Stack>
  );
}
