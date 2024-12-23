import { Stack } from "expo-router/stack";

export default function UserLayout() {
  return (
    <Stack>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{ title: "My Profile" }} />
      <Stack.Screen name="favourites" options={{ title: "My favourites" }} />
      <Stack.Screen name="archived" options={{ title: "Archived" }} />
      {/* <Stack.Screen name="edit" options={{ title: "Edit Project" }} /> */}
    </Stack>
  );
}
