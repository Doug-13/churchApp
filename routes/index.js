import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/pages/Home';
import SignIn from '../src/pages/SignIn';
import Search from '../src/pages/Search';
import CultReport from '../src/pages/CultReport';
import MainScreen from '../src/pages/MainScreen';
import AboutUs from '../src/pages/AboutUs';
import Profile from '../src/pages/Profile/index';
import SignUp from '../src/pages/SignUp';
import ChurchRegister from '../src/pages/ChurchRegister';
import Biblia from '../src/pages/Biblia';
import Chapters from '../src/pages/Biblia/chapters';
import Versus from '../src/pages/Biblia/versus';
import Menu from '../src/Menu';
import HandleAddReport from '../src/pages/CultReport/handleAddReport';
import Studies from '../src/pages/Studies';
import NewStudies from '../src/pages/Studies/newStudies';
import Images from '../src/pages/Studies/images';
import CheckBox2 from '../src/components/CheckBox2/index';
import Devotional from '../src/pages/Devotional';
import Peoples from '../src/pages/Peoples';
import Birthdays from '../src/pages/Birthdays';
import Schedule from '../src/pages/Schedule';
import EventCreate from '../src/pages/Schedule/eventCreate';
import Financial from '../src/pages/Financial'
import Groups from '../src/pages/Groups'
import InsertGroups from '../src/pages/Groups/insertGoups'

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
        name="SignIn"
        component={SignIn}
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
      <Stack.Screen
        name="Peoples"
        component={Peoples}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Birthdays"
        component={Birthdays}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventCreate"
        component={EventCreate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Financial"
        component={Financial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InsertGroups"
        component={InsertGroups}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
