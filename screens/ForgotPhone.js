import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const ForgotPhone = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    // Validation
    if (phoneNumber.trim().length === 0) {
      setError('Phone number is required');
      return;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    navigation.navigate('OTPVerification');

    // Logic for sending code goes here
  };


  const isValidPhoneNumber = (phoneNumber) => {
    // Phone number validation regex
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(phoneNumber);
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
          <Text style={styles.tagline}>Please enter the number associated with your account.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Mobile Number</Text>
            <View style={[styles.inputWrapper, error ? styles.errorBorder : null]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#777777"
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <FontAwesomeIcon icon={faMobileAlt} size={20} color="#FFF" style={styles.buttonIcon} />
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
    marginTop: 20,
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

export default ForgotPhone;
