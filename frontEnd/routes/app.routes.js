// Em AppRoutes.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../src/pages/MainScreen';
import ChurchDetails from '../src/pages/ChurchDetails/index';
import Birthdays from '../src/pages/Birthdays';
import Biblia from '../src/pages/Biblia';
import StackRoutes from './stack.routes'; // Importe StackRoutes

const Drawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="ChurchDetails"
                component={ChurchDetails}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Birthdays"
                component={Birthdays}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Biblia"
                component={Biblia}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="StackRoutes" // Adicione o StackRoutes aqui
                component={StackRoutes}
                options={{ headerShown: false }} // Remova a opção drawerLabel
            />
        </Drawer.Navigator>
    );
}

export default AppRoutes;
