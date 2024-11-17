import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPayment from "./src/screens/AddPayment";
import HomeScreen from "./src/screens/Home";
import Details from "./src/screens/Details";
import LoginScreen from './src/screens/login';
import SignupScreen from './src/screens/signup';
import SplashScreenComponent from './src/screens/splash';
import Popular from './src/screens/Popular';
import MyCart from "./src/screens/MyCart";
import MyOrder from "./src/screens/MyOrder";
import AppFooter from "./src/components/AppFooter/AppFooter";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Use the useFonts hook to load custom fonts
  const [fontsLoaded] = useFonts({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("./assets/fonts/Lato-Thin.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  // Hide splash screen after fonts are loaded
  useEffect(() => {
    const prepare = async () => {
      try {
        // Wait for fonts to be loaded before hiding splash screen
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setIsReady(true);  // Mark app as ready
        }
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, [fontsLoaded]);

  // If fonts are not loaded yet, don't render the app
  if (!fontsLoaded || !isReady) {
    return null;  // Optionally return a loading spinner or splash screen
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddPayment" component={AddPayment} />
        <Stack.Screen name ="Popular" component={Popular} />
        <Stack.Screen name ="MyCart" component={MyCart} />
        <Stack.Screen name ="MyOrder" component={MyOrder} />
      </Stack.Navigator>
      <AppFooter />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
