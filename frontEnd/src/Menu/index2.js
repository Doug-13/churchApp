import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

// Importe as telas que deseja incluir no Drawer Navigator
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// Crie um Drawer Navigator
const Drawer = createDrawerNavigator();

// Defina o conteúdo personalizado do Drawer
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      {/* Adicione mais opções conforme necessário */}
    </DrawerContentScrollView>
  );
};

// Defina as opções de navegação
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      {/* Adicione mais telas conforme necessário */}
    </Drawer.Navigator>
  );
};

const MenuScreenWithDrawer = () => {
  return (
    <DrawerNavigator />
  );
};

export default MenuScreenWithDrawer;
