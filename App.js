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
import OTPVerification from './screens/OTPverification';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbEx0PgYPK_oTwaFWcIeFCeTH_fVn9FCc",
  authDomain: "myapp-56477.firebaseapp.com",
  projectId: "myapp-56477",
  storageBucket: "myapp-56477.appspot.com",
  messagingSenderId: "117189577563",
  appId: "1:117189577563:web:c22dbadff1a0b08be9e87e",
  measurementId: "G-7RJWVXWCNL"
};




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

export default function AppContainer() { // Rename the function to avoid duplication
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
            <Stack.Screen
              name="ForgotPhone"
              component={ForgotPhone}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="ForgotEmail"
              component={ForgotEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPVerification"
              component={OTPVerification}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetPasswordScreen"
              component={SetPasswordScreen}
              options={{ headerShown: false }}
            />
            {/* Add more screens as needed */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
