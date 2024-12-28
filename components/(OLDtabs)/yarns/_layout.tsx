import { Stack } from "expo-router/stack";

export default function YarnsLayout() {
  return (
    <Stack>
    <Stack.Screen name="index" options={{ title: "Yarns" }} />
      <Stack.Screen name="create" options={{ title: "New Yarn" }} />
      <Stack.Screen name="[_id]" options={{ title: "View Yarn" }} />
    </Stack>
  );
}
