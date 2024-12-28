import { Stack } from "expo-router/stack";

export default function PatternsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Patterns", headerShown: true }} />
      <Stack.Screen name="create" options={{ title: "New Pattern", headerShown: true }} />
      <Stack.Screen name="[_id]" options={{ title: "View Pattern", headerShown: true }} />
      <Stack.Screen name="edit" options={{ title: "Edit Pattern", headerShown: true }} />
    </Stack>
  );
}
