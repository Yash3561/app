import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import ChooseLanguage from './screens/ChooseLanguage';
import { StatusBar } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import * as Font from 'expo-font';
import Registration from './screens/Registration';

const fetchFonts = async () => {
  await Font.loadAsync({
    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-extrabold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor('#121212');

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setIsLoading(false);
    };
    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="ChooseLanguage"
              component={ChooseLanguage}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{ headerShown: false }}
            /> 
            {/* Add more screens as needed */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
