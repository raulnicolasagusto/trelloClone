import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <BottomSheetModalProvider>
          <InitialLayout />
        </BottomSheetModalProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;