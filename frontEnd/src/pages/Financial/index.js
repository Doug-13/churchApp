import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o ícone desejado
import CashFlow from '../../pages/Financial/CashFlow';
import MyContributions from '../../pages/Financial/MyContributions';
import MainScreen from '../../pages/MainScreen';
import { AuthContext } from '../../context/auth.js';

const Tab = createBottomTabNavigator();

const ContribuaScreen = () => {
    // Componente para exibir informações de doação
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contribua com nosso trabalho</Text>
            <Text style={styles.methodTitle}>Chave Pix:</Text>
            <Text style={styles.methodDetail}>xxxxxxxxxxxx</Text>
            <Text style={styles.methodTitle}>Depósito Bancário:</Text>
            <Text style={styles.methodDetail}>Banco: xxx Agência: xxx Conta: xxx</Text>
            {/* Adicione outros métodos de doação conforme necessário */}
        </View>
    );
};

const Financial = () => {
    const { user } = useContext(AuthContext);

    return (
        <Tab.Navigator>
            {/* <Tab.Screen 
                name="MainScreen" 
                component={MainScreen} 
                options={{
                    tabBarLabel: 'Principal',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                }}
            /> */}
            <Tab.Screen 
                name="Contribua" 
                component={ContribuaScreen} 
                options={{
                    tabBarLabel: 'Contribua',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="payment" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Minhas Ofertas" 
                component={MyContributions} 
                options={{
                    tabBarLabel: 'Minhas Ofertas',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="shopping-cart" color={color} size={size} />
                    ),
                }}
            />
            {user.id === 76 && <Tab.Screen 
                name="Fluxo de Caixa" 
                component={CashFlow} 
                options={{
                    tabBarLabel: 'Fluxo de Caixa',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="attach-money" color={color} size={size} />
                    ),
                }}
            />}
        </Tab.Navigator>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    methodTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    methodDetail: {
        fontSize: 16,
        marginBottom: 10,
    },
};

export default Financial;
