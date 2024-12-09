import { Stack } from "expo-router/stack";

export default function TabsLayout() {
  return (
    <Stack>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{ title: "Patterns" }} />
      <Stack.Screen name="[_id]" options={{ title: "View Pattern" }} />
    </Stack>
  );
}
