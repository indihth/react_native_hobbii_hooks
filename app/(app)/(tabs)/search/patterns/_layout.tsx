import { Stack } from "expo-router/stack";

export default function PatternsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Patterns", headerShown: false }} />
      <Stack.Screen name="create" options={{ title: "New Pattern", headerShown: false }} />
      <Stack.Screen name="[_id]" options={{ title: "View Pattern", headerShown: false }} />
      <Stack.Screen name="edit" options={{ title: "Edit Pattern", headerShown: false }} />
    </Stack>
  );
}
