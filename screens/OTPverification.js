import React, { useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const inputs = useRef([]);
  const navigation = useNavigation();


  const handleVerifyOTP = () => {
    setVerificationSuccess(true);
    // Logic to verify OTP with backend
    // Send `otp` to backend for verification
    // Handle success or failure response
  };

  const handleChangeOTP = (text, index) => {
    if (isNaN(text)) return; // Only allow numeric input

    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOTP(updatedOTP);

    // Move to the next input field if available
    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }

    // Move to the previous input field if backspacing and the current input is empty,
    // or if there's no text but there's a previous input field
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResendCode = () => {
    // Logic to resend verification code
  };

  const handleCloseModal = () => {
    setVerificationSuccess(false);
    navigation.navigate('Profile');
  };

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
    <View style={styles.container}>
      <Text style={styles.heading}>Verification</Text>
      <Text style={styles.instructions}>Enter the 4-digit OTP sent to your email/phone</Text>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeOTP(text, index)}
            onFocus={() => {
              if (index > 0 && !otp[index - 1]) {
                inputs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendText}>Didn't receive a code? <Text style={styles.boldText}>Resend</Text></Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal visible={verificationSuccess} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Number Verified</Text>
              <Text style={styles.modalTagline}>Your Phone Number has been verified successfully!</Text>
              <TouchableOpacity style={styles.nextButton} onPress={handleCloseModal}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'poppins-bold',
    color: '#FFF',
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 20,
    fontFamily: 'poppins',
    textAlign: 'center',
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 20,
    width: 65,
    height: 65,
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#003CD8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'poppins-bold',
  },
  resendText: {
    color: '#FFF',
    fontFamily: 'poppins',
    marginTop: 20,
  },
  boldText: {
    fontFamily: 'poppins-bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'poppins-bold',
    marginBottom: 10,
  },
  modalTagline: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'poppins',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#003CD8',
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'poppins-bold',
  },
});

export default OTPVerification;
