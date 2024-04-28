import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const ForgotEmail = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    // Validation
    if (email.trim().length === 0) {
      setError('Email is required');
      return;
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    
    navigation.navigate('OTPVerification');

    // Logic for sending code goes here
  };


  const isValidEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          <Text style={styles.tagline}>Please enter the email associated with your account.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Email</Text>
            <View style={[styles.inputWrapper, error ? styles.errorBorder : null]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor="#777777"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <FontAwesomeIcon icon={faEnvelope} size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'poppins',
    marginBottom: 20,
    textAlign: 'left',
    marginTop: 20, // Add margin to the top
  },
  
  inputContainer: {
    width: '100%',
  },
  inputHeading: {
    color: '#000',
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: 5,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: 'poppins',
    marginHorizontal: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#003CD8',
    height: 56,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'poppins-bold',
  },
  buttonIcon: {
    marginRight: 10,
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
    color: '#FFF',
  },
  errorText: {
    color: '#FF0000',
    fontFamily: 'poppins',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  errorBorder: {
    borderColor: '#FF0000',
  },
});

export default ForgotEmail;
