import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import Options from './Options';
import MainScreen from './MainScreen';
import AboutUs from './AboutUs';
import Profile from './Profile';
import SignUp from './SignUp';
import ChurchRegister from './ChurchRegister';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>

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
        name="Options"
        component={Options}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
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
    </Stack.Navigator>
  );
}


// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './Home';
// import Login from './Login';
// import Search from './Search';
// import Options from './Options';
// import MainScreen from './MainScreen';
// import AboutUs from './AboutUs';
// import Profile from './Profile';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export default function Routes() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: { display: 'flex' }
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{ headerShown: false, tabb}}
//       />
//       <Tab.Screen
//         name="Options"
//         component={Options}
//       />
//       <Tab.Screen
//         name="AboutUs"
//         component={AboutUs}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//       />
//       <Tab.Screen
//         name="Stack"
//         options={{ tabBarStyle: { display: 'none' } }}
//       >
//         {() => (
//           <Stack.Navigator initialRouteName="Home"> {/* Define 'Home' como a rota inicial */}
//             <Stack.Screen
//               name="MainScreen"
//               component={MainScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Login"
//               component={Login}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Search"
//               component={Search}
//               options={{ headerShown: false }}
//             />
//           </Stack.Navigator>
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }
