import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const AppFooter = () => {
  const navigation = useNavigation();

  // Hàm để điều hướng khi nhấn vào các tab
  const handlePress = (route) => {
    if (route === 'home') {
      navigation.navigate('Home');
    } else if (route === 'history') {
      navigation.navigate('MyOrder');
    } else if (route === 'cart') {
      navigation.navigate('MyCart');
    } else if (route === 'profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handlePress('home')}>
        <Feather name="home" size={24} color="black" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('history')}>
        <Feather name="clock" size={24} color="black" />
        <Text style={styles.label}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('cart')}>
        <Feather name="shopping-cart" size={24} color="black" />
        <Text style={styles.label}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('profile')}>
        <Feather name="user" size={24} color="black" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default AppFooter;
