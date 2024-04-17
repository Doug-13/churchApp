import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../src/context/auth';

import AppRoutes from './app.routes'; // Change the import statement
import AuthRoutes from './auth.routes'; // Change the import statement


function Routes() {
    const { signed } = useContext(AuthContext);
    const loading = false;
  

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}
export default Routes;
