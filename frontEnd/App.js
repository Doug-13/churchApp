import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/auth.routes2';
// import Routes from './routes/index';
import { StatusBar } from 'react-native';
import AuthProvider from './src/context/auth';
              
export default function App() {
  return (

    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

