import { Stack } from "expo-router/stack";

export default function SearchLayout() {
  return (
    <Stack>
     <Stack.Screen
        name="[query]"
        options={{ title: "Search Results", headerShown: true }}
      />
    </Stack>
  );
}
