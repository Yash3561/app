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
import ForgotEmail from './screens/ForgotEmail';
import ForgotPhone from './screens/ForgotPhone';
import Profile from './screens/Profile';
import SetPasswordScreen from  './screens/SetPasswordScreen';
import OTPVerification from './screens/OTPVerification';
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbEx0PgYPK_oTwaFWcIeFCeTH_fVn9FCc",
  authDomain: "myapp-56477.firebaseapp.com",
  projectId: "myapp-56477",
  storageBucket: "myapp-56477.appspot.com",
  messagingSenderId: "117189577563",
  appId: "1:117189577563:web:c22dbadff1a0b08be9e87e",
  measurementId: "G-7RJWVXWCNL"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

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

export default function AppContainer() {
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: ({ current, next, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
                {
                  translateX: next
                    ? next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -layouts.screen.width],
                      })
                    : 1,
                },
              ],
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          }),
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 400 } }, // Adjust duration here
            close: { animation: 'timing', config: { duration: 400 } }, // Adjust duration here
          },
        }}
      >
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name="ChooseLanguage"
              component={ChooseLanguage}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
            /> 
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
            /> 
            <Stack.Screen
              name="Registration"
              component={Registration}
            />
            <Stack.Screen
              name="ForgotPhone"
              component={ForgotPhone}
            /> 
            <Stack.Screen
              name="ForgotEmail"
              component={ForgotEmail}
            />
            <Stack.Screen
              name="OTPVerification"
              component={OTPVerification}
            /> 
            <Stack.Screen
              name="Profile"
              component={Profile}
            />
            <Stack.Screen
              name="SetPasswordScreen"
              component={SetPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { auth }; // Export auth for use in other components
