import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'

export default function SignUp() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>

                <Image
                    source={require('../../../assets/Logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </Animatable.View>


            <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>

                <View style={styles.containerForm}>

                    <StatusBar style="auto" />
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        placeholder="Digite seu E-mail..."
                        style={styles.input} />

                    <Text style={styles.title}>Confirmar Email</Text>
                    <TextInput
                        placeholder="Digite seu E-mail..."
                        style={styles.input} />

                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Digite sua senha..."
                        style={styles.input} />

                    <TouchableOpacity
                        style={styles.button}
                    // onPress={() => navigation.navigate("")}
                    >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonRegister}
                        onPress={() => navigation.navigate("Search")}
                    >
                        <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>

                    </TouchableOpacity>

                </View>


            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3d00f",
    },
    containerHeader: {
        flex: 1,
        marginTop: '14%',
        marginBottom: "8%",
        paddingStart: '5%',
    },
    welcome: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 80,
        borderRadius: 20,
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        height: 40, // ajuste a altura conforme necessário
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000000',
        width: '100%',
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 19,
        color: '#ffff',
        fontWeight: 'bold'
   
    }
    });