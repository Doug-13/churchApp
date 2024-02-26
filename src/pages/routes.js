import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import CultReport from './CultReport';
import MainScreen from './MainScreen';
import AboutUs from './AboutUs';
import Profile from './Profile/index';
import SignUp from './SignUp';
import ChurchRegister from './ChurchRegister';
import Biblia from './Biblia';
import Chapters from './Biblia/chapters';
import Versus from './Biblia/versus';
import Menu from '../Menu';
import HandleAddReport from './CultReport/handleAddReport';
import Studies from './Studies';
import NewStudies from './Studies/newStudies';
import Images from './Studies/images';
import CheckBox2 from '../components/CheckBox/CheckBox2/index';
import Devotional from '../pages/Devotional';

const Stack = createNativeStackNavigator();


export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CultReport"
        component={CultReport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChurchRegister"
        component={ChurchRegister}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Biblia"
        component={Biblia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Versus"
        component={Versus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="HandleAddReport"
        component={HandleAddReport}
        options={{ headerShown: false }}
      />
          <Stack.Screen
        name="Studies"
        component={Studies}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="NewStudies"
        component={NewStudies}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Images"
        component={Images}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
      name="CheckBox2"
      component={CheckBox2}
      options={{ headerShown: false }}
    />
      <Stack.Screen
      name="Devotional"
      component={Devotional}
      options={{ headerShown: false }}
    />

    </Stack.Navigator>
  );
}
