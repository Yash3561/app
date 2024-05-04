import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../App';
import { useNavigation } from '@react-navigation/native';

const SetPasswordScreen = ({ route }) => {
  const { firstName, lastName, email, number } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigation = useNavigation();

  const handleSetPassword = async () => {
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,14}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      Alert.alert('Invalid Password', 'Password must be 6-14 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.');
      return;
    } else {
      setPasswordError(false);
    }
  
    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      Alert.alert('Passwords Do Not Match', 'Please make sure the passwords match.');
      return;
    } else {
      setConfirmPasswordError(false);
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save additional user details to Firestore
      const db = getFirestore();
      const userRef = doc(db, 'users_details', userCredential.user.uid);
      await setDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: number,
      });

      // Navigate to the Profile screen
      navigation.navigate('OTPVerification');
    } catch (error) {
      console.error('Firebase Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Password</Text>
      <Text style={styles.tagline}>Please type something you'll remember</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Password</Text>
        <View style={[styles.inputBox, passwordError && styles.inputBoxError, {borderColor: showPassword ? '#FF0000' : '#777777'}]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777777"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={20} color={showPassword ? 'red' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Confirm Password</Text>
        <View style={[styles.inputBox, confirmPasswordError && styles.inputBoxError, {borderColor: showConfirmPassword ? '#FF0000' : '#777777'}]}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#777777"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} size={20} color={showConfirmPassword ? 'red' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
        <Text style={styles.buttonText}>Set Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'poppins-bold',
    marginBottom: 10,
  },
  tagline: {
    color: '#FFF',
    fontFamily: 'poppins',
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  inputHeading: {
    color: '#FFF',
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#777777',
  },
  inputBoxError: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: 'poppins',
    fontSize: 16,
    height: 56,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#003CD8',
    height: 56,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'poppins-bold',
  },
});

export default SetPasswordScreen;