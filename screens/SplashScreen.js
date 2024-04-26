/**
 * SplashScreen.js
 *
 * This component represents the splash screen of the application.
 * It displays a splash image for a specified duration before navigating to the next screen.
 */

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import SplashScreenImage from '../assets/splash.png'; // Replace with the path to your splash screen image

/**
 * SplashScreen component displays the splash screen of the application.
 * @param {object} navigation - Navigation object provided by React Navigation.
 */
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a delay for splash screen
    const timer = setTimeout(() => {
      // Replace the current screen with the next screen after the delay
      navigation.replace('ChooseLanguage');
    }, 2000); // Change the delay time as needed (in milliseconds)

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <Image source={SplashScreenImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Background color for the splash screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
