import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/pages/routes';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  return (

    <NavigationContainer>
      <StatusBar backgroundColor={"#f3d00f"} barStyle={"dark-content"} />
      <Routes />
    </NavigationContainer>
  );
}


// Site do logo
// https://smashinglogo.com/pt/quick-edit?s=laqwspmns-y5yfxqe2l#slogan-text


// Gerar dados
// https://www.mockaroo.com/

// Pacotes instalados
// npx expo install expo-localization
// expo install @react-navigation/bottom-tabs
// expo install @react-navigation/native
//  expo install react-native-animatable


// cor amarela usada: #f3d00f
// cor Preta usada: #000000
// export default App;

// Site do logo
// https://smashinglogo.com/pt/quick-edit?s=laqwspmns-y5yfxqe2l#slogan-text