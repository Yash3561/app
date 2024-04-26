import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const handleResetPhone = () => {
    navigation.navigate('ForgotPhone');
  };

  const handleResetEmail = () => {
    navigation.navigate('ForgotEmail');
  };

  const handleLogIn = () => {
    navigation.navigate('LoginScreen');
  };

  // Load fonts
  const [fontsLoaded, fontsError] = useFonts({
    'poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Check if fonts are loaded
  if (!fontsLoaded) {
    // Return loading indicator or null
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Forgot Password?</Text>
          <Text style={styles.tagline}>Don't worry! You can use your associated email or phone number to reset password</Text>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={handleResetPhone}>
              <FontAwesomeIcon icon={faMobileAlt} size={20} color="#003CD8" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Continue with Mobile Number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleResetEmail}>
              <FontAwesomeIcon icon={faEnvelope} size={20} color="#003CD8" style={styles.buttonIcon} />
              <Text style={[styles.buttonText, styles.emailButtonText]}>Continue with Email</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogIn} style={styles.loginButton} >
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Changed Your Mind?</Text>
            <Text style={[styles.boldText]}> Log In</Text>
          </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'poppins-bold',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'poppins',
    marginBottom: 40,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 56,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#003CD8',
    fontSize: 18,
    fontFamily: 'poppins-bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  emailButtonText: {
    textAlign: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  errorText: {
    color: '#FF0000',
    fontFamily: 'poppins',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  loginTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  loginText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'poppins',
  },
  boldText: {
    fontFamily: 'poppins-bold',
    fontSize: 16,
    color: '#FFF'
  },
});

export default ForgotPasswordScreen;
