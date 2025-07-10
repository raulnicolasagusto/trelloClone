import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
    </Stack>
  );
}

const RootLayout = () => {
  return(
    <ActionSheetProvider>
      <>
        <StatusBar />
        <GestureHandlerRootView style={{ flex: 1}}>
          <InitialLayout/>
        </GestureHandlerRootView>  
      </>
    </ActionSheetProvider>
  );
}

export default RootLayout;