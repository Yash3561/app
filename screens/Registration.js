import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';



const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () =>{
    navigation.navigate('LoginScreen');
  }
  

  const handleCreateAccount = async () => {
    // First Name Validation
    if (firstName.trim().length === 0 || firstName.trim().length > 20) {
      Alert.alert('Invalid First Name', 'First Name must be between 1 and 20 characters');
      return;
    }

    // Last Name Validation
    if (lastName.trim().length === 0 || lastName.trim().length > 20) {
      Alert.alert('Invalid Last Name', 'Last Name must be between 1 and 20 characters');
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Number Validation
    if (number.trim().length !== 10 || isNaN(number.trim())) {
      Alert.alert('Invalid Phone Number', 'Number must be exactly 10 digits long and contain only numbers');
      return;
    }

    navigation.navigate('SetPasswordScreen', { firstName, lastName, email, number });
  }
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
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.heading}>Create Account</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>First Name</Text>
              <TextInput
                style={[styles.input, styles.inputBox]}
                placeholder="First Name"
                placeholderTextColor="#777777"
                onChangeText={setFirstName}
                value={firstName}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Last Name</Text>
              <TextInput
                style={[styles.input, styles.inputBox]}
                placeholder="Last Name"
                placeholderTextColor="#777777"
                onChangeText={setLastName}
                value={lastName}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Email</Text>
              <TextInput
                style={[styles.input, styles.inputBox]}
                placeholder="Email"
                placeholderTextColor="#777777"
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Number</Text>
              <TextInput
                style={[styles.input, styles.inputBox]}
                placeholder="Number"
                placeholderTextColor="#777777"
                onChangeText={setNumber}
                value={number}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>By creating an account or signing you agree to our <Text style={styles.termsAndConditions}>Terms and Conditions</Text></Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Already Have an account? <Text style={styles.boldText}>Login Here</Text></Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    marginTop: 100
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'poppins-bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputHeading: {
    color: '#FFF',
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    color: '#000',
    paddingHorizontal: 10,
    fontFamily: 'poppins',
    fontSize: 16,
    height: 56,
  },
  inputBox: {
    backgroundColor: '#FFF',
    borderBottomWidth: 0,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#003CD8',
    height: 56,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'poppins-bold',
  },
  termsText: {
    color: '#FFF',
    fontFamily: 'poppins',
    fontSize: 14,
    textAlign: 'center',
  },
  termsAndConditions: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  loginText: {
    color: '#FFF',
    fontFamily: 'poppins',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },
  boldText: {
    fontFamily: 'poppins-bold',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
