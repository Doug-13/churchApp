import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import groupDetailScreen from './groupDetailScreen.js'; 
import meetings from './meetings.js';
import indicators from './indicators.js';

import { AuthContext } from '../../context/auth.js';

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ route }) => {
    const { user, selectedGroupId } = useContext(AuthContext); // Obtendo selectedGroupId do contexto

    return (
        <Tab.Navigator>
           <Tab.Screen 
                name="Groups" 
                component={groupDetailScreen} 
                initialParams={{ groupId: selectedGroupId }} // Passando o id_grupo selecionado para a tela de grupos
                options={{
                    headerShown: false,
                    tabBarLabel: 'Grupos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ), 
                }}
            />
            <Tab.Screen 
                name="Reuniões" 
                component={meetings} 
                options={{
                    tabBarLabel: 'Reuniões',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="group" color={color} size={size} />
                    ),
                }}
            />
             <Tab.Screen 
                name="Indicadores" 
                component={indicators} 
                options={{
                    tabBarLabel: 'Indicadores',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="trending-up" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
