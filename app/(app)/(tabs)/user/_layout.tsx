import { Stack } from "expo-router/stack";

export default function UserLayout({ segment }: { segment: string }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Profile" }} />
      <Stack.Screen name="patterns" options={{ headerShown: false}} />
    </Stack>
  );
}
