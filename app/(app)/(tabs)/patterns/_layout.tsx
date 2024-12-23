import { Stack } from "expo-router/stack";

export default function PatternsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Patterns" }} />
      <Stack.Screen name="create" options={{ title: "New Pattern" }} />
      <Stack.Screen name="[_id]" options={{ title: "View Pattern" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Pattern" }} />
    </Stack>
  );
}
