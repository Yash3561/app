import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth'; // Import getAuth and signOut from firebase/auth

const Profile = () => {
  // Function to handle logout
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      const auth = getAuth(app); // Get the authentication service instance
      await signOut(auth); // Call signOut method
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {/* Add a button to trigger the logout function */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Profile;
