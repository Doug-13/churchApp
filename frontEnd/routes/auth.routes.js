import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';

import Condicoes from '../src/pages/politics/Condicoes';
import Politics from '../src/pages/politics/index';


const AuthStack = createNativeStackNavigator();


function AuthRoutes() {
    return (
        <AuthStack.Navigator>

            <AuthStack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Condicoes'
                component={Condicoes}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Politics'
                component={Politics}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}

            />

        </AuthStack.Navigator>
    )
}

export default AuthRoutes;