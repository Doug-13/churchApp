import React, {useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';

import {AuthContext} from '../contexts/auth'

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


 function routes() {
    const {signed} = useContext(AuthContext);
    const loading = false;

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00b94a" />
            </View>
        );
    }

    return (
        !signed ? <AppRoutes /> : <AuthRoutes/>
    )
}

export default routes;