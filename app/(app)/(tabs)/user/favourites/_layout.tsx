import { Stack } from "expo-router/stack";

export default function FavouritesLayout({ segment }: { segment: string }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My favourites" }} />
      <Stack.Screen name="[_id]" options={{ title: "Favourited Pattern" }} />
    </Stack>
  );
}
