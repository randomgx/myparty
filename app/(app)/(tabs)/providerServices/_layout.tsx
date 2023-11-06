import { Stack } from "expo-router";
import React from "react";

export default function EventsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[serviceId]" options={{ headerShown: false }} />
    </Stack>
  );
}
