import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{
        headerShown: false, // 全局隐藏 header
      }}>
      <Stack.Screen
        name="GroupSort"
      />
    </Stack>
  );
}