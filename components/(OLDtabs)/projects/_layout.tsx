import { Stack } from "expo-router/stack";

export default function ProjectsLayout() {
  return (
    <Stack>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen name="create" options={{ title: "New Project" }} />
      <Stack.Screen name="[_id]" options={{ title: "View Project" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Project" }} />
    </Stack>
  );
}
