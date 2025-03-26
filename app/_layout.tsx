import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useQuizStore } from '../store/quizStore';
import { useFocusEffect } from '@react-navigation/native';
import '../global.css'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("@/assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
  });


  const { isQuizInProgress } = useQuizStore();
  
  useFocusEffect(
    useCallback(() => {
      const disableBack = () => isQuizInProgress;
      return disableBack;
    }, [isQuizInProgress])
  );


  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />

      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          gestureEnabled: false // Disable swipe back gesture
        }} 
      />
      <Stack.Screen 
        name="quiz" 
        options={{ 
          title: 'Quiz',
          headerShown: false,
          headerLeft: () => null, // Remove back button
          gestureEnabled: false // Disable swipe back gesture
        }} 
      />
    </Stack>
    
  );
}

export default RootLayout;
