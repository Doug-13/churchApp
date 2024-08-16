import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from './routes/auth.routes2'; // Ensure this path is correct
import AuthProvider from './src/context/auth'; // Ensure this path is correct

// import firebaseConnection from '../src/firebase/firebaseConnection';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
