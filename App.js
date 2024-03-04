import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  return (

    <NavigationContainer>
      <StatusBar backgroundColor={"#f3d00f"} barStyle={"dark-content"} />
      <Routes />
    </NavigationContainer>
  );
}

