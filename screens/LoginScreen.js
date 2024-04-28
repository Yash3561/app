import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleCreateOne = () => {
    navigation.navigate('Registration');
  };

  const handleLogin = async () => {
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = emailRegex.test(email);
  
    // Password validation
    const validPassword = password.length >= 6 && password.length <= 14;
  
    if (!validEmail || !validPassword) {
      setLoadingError('Please enter valid credentials');
      return;
    }
  
    setLoadingError('');

    try {
      const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });      
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the desired screen upon successful login
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  
    // Additional login logic goes here
  };
  

  // Load fonts
  const [fontsLoaded, fontsError] = useFonts({
    'poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-extrabold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Check if fonts are loaded
  if (!fontsLoaded) {
    // Log font loading error
    console.error('Error loading fonts:', fontsError);
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
        <Text style={styles.heading}>Log In</Text>
        <View style={styles.innerContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Email</Text>
            <View style={[styles.detailsContainer, styles.inputWrapper]}>
              <TextInput
                style={[styles.input]}
                placeholder="Your Email ID"
                placeholderTextColor="#777777"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Password</Text>
            <View style={[styles.detailsContainer, styles.inputWrapper,{borderColor: showPassword ? '#FF0000' : '#777777'}]}>
              <TextInput
                style={[styles.input]}
                placeholder="Password"
                placeholderTextColor="#777777"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                maxLength={14}
              />
              <TouchableOpacity onPress={toggleShowPassword}>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size={24}
                  color={showPassword ? '#FF0000' : '#000'}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {loadingError ? <Text style={styles.errorText}>{loadingError}</Text> : null}
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>Or Login With</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialLoginButton}>
              <FontAwesomeIcon icon={faGoogle} size={46} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginButton}>
              <FontAwesomeIcon icon={faFacebook} size={46} color="#4267B2" />
            </TouchableOpacity>
            {Platform.OS === 'ios' && (
              <TouchableOpacity style={styles.socialLoginButton}>
                <FontAwesomeIcon icon={faApple} size={46} color="#000" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleCreateOne}>
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Don't Have an Account ? </Text>
            <Text style={[styles.boldText]}>Create One!</Text>
          </View>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center', 
  },
  heading: {
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'poppins-bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputHeading: {
    color: '#FFF',
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
  inputWrapper: {
    justifyContent: 'space-between', 
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: 'poppins',
    marginHorizontal: 10,
    fontSize: 16,
    height: 40,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    color: '#FFF',
    fontFamily: 'poppins',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#003CD8',
    height: 56,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'poppins-bold',
  },
  errorText: {
    color: '#FF0000',
    fontFamily: 'poppins',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  orText: {
    color: '#FFF',
    fontFamily: 'poppins',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialLoginButton: {
    backgroundColor: '#FFF',
    width: 56,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10
  },
  createAccountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
    flexDirection: 'row',
    marginTop: 30,
  },
  createAccountText: {
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

export default LoginScreen;
