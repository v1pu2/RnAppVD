import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

const TextInputComponent = () => {
  return <LoginScreen />;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: 'red',
  },
});

export default TextInputComponent;
