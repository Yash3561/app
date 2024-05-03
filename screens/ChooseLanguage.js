import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';

const ChooseLanguage = () => {
  const [searchText, setSearchText] = useState('');
  const [originalLanguages, setOriginalLanguages] = useState([
    { id: 1, name: 'English', selected: false },
    { id: 2, name: 'Hindi / हिंदी', selected: false },
    { id: 3, name: 'Marathi / मराठी', selected: false },
    // { id: 4, name: 'Gujarati / ગુજરાતી', selected: false },
    // { id: 5, name: 'Bengali / বাংলা', selected: false },
    // { id: 6, name: 'Tamil / தமிழ்', selected: false },
    // { id: 7, name: 'Kannada / ಕನ್ನಡ', selected: false },
    // { id: 8, name: 'Urdu / اردو', selected: false },
    // { id: 9, name: 'Telgu /  తెలుగు', selected: false },
    // { id: 10, name: 'Malayalam / മലയാളം', selected: false },
  ]);
  const [languages, setLanguages] = useState(originalLanguages);
  const navigation = useNavigation();

  // Load fonts
  const [fontsLoaded, error] = useFonts({
    'poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-extrabold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Check if fonts are loaded
  if (!fontsLoaded) {
    // Log font loading error
    console.error('Error loading fonts:', error);
    // Return loading indicator or null
    return null;
  }

  // Font loading successful, continue rendering the component
  const handleSearch = (text) => {
    setSearchText(text);
    const filteredLanguages = originalLanguages.filter(lang =>
      lang.name.toLowerCase().includes(text.toLowerCase())
    );
    setLanguages(filteredLanguages);
  };

  const handleRadioSelect = (id) => {
    const updatedLanguages = languages.map(lang =>
      lang.id === id ? { ...lang, selected: true } : { ...lang, selected: false }
    );
    setLanguages(updatedLanguages);
    const selectedLanguage = languages.find(lang => lang.id === id);
    setSearchText(selectedLanguage.name);
  };

  const handleContinue = () => {
    navigation.navigate('LoginScreen', { selectedLanguage: searchText }); // Pass selected language to LoginScreen
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Choose your Language</Text>
        <Text style={styles.tagline}>Language won't be a barrier for your goals !</Text>
        <View style={[styles.searchContainer, { borderColor: searchText ? '#003CD8' : '#FFF' }]}>
          <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search Language"
            placeholderTextColor="#FFF"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <FlatList
          data={languages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRadioSelect(item.id)}>
              <View style={[styles.languageItem, { backgroundColor: item.selected ? '#FFF' : '#121212' }]}>
                <Text style={{ color: item.selected ? '#003CD8' : '#FFF', fontFamily: 'poppins' }}>{item.name}</Text>
                {item.selected && (
                  <View style={styles.radioButton}>
                    <Ionicons name="checkmark-circle" size={24} color="#003CD8" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
          contentContainerStyle={styles.flatListContent} // Align FlatList content to the left
        />
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      marginTop: 100
    },
    heading: {
      fontSize: 30,
      color: '#FFF',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'poppins-bold',
    },
    tagline: {
      fontSize: 16,
      color: '#FFF',
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'poppins',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      padding: 10,
      backgroundColor: '#121212',
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 1,
    },
    searchIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
      color: '#fff',
      borderRadius: 10,
      paddingHorizontal: 10,
      fontFamily: 'poppins',
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      width: 328,
    },
    radioButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    continueButton: {
      width: 328,
      height: 56,
      backgroundColor: '#003CD8',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    continueButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'poppins',
    },
  });