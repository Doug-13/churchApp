import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/pages/Routes';
// import { StatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  return (
    
    <NavigationContainer>
      
      <StatusBar backgroundColor={"#f3d00f"} barStyle={"dark-content"}/>
      <Routes />
    </NavigationContainer>
  );
}


// Site do logo
// https://smashinglogo.com/pt/quick-edit?s=laqwspmns-y5yfxqe2l#slogan-text