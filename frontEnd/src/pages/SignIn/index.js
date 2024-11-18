import React, { useState, useContext } from 'react';
import { StatusBar, ActivityIndicator, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Platform, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth.js';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

export default function SignIn() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { signIn } = useContext(AuthContext);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, senha);
        } catch (error) {
            console.error('Erro durante o login:', error);
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    alert('Email ou senha incorretos. Por favor, verifique suas credenciais e tente novamente.');
                } else {
                    alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
                }
            } else {
                alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Clear fields
        setEmail('');
        setSenha('');
        setRefreshing(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.containerHeader}>
                    <Text style={styles.welcome}>Seja Bem Vindo(a)</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../../assets/Logo.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.containerForm}>
                    <StatusBar style="auto" />

                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        placeholder="Digite seu E-mail..."
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        accessibilityLabel="Email input"
                    />

                    <Text style={styles.title}>Senha</Text>
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            placeholder="Digite sua senha..."
                            style={[styles.input, styles.passwordInput]}
                            value={senha}
                            onChangeText={setSenha}
                            accessibilityLabel="Password input"
                        />
                        <TouchableOpacity onPress={toggleShowPassword} style={styles.togglePasswordButton}>
                            <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Acessar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonRegister}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3d00f",
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: "8%",
        paddingStart: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 8,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 180,
        borderRadius: 20,
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000000',
        width: '100%',
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 19,
        color: '#ffff',
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 3,
        alignSelf: 'center'
    },
    registerText: {
        color: '#000000',
        marginTop: 20,
        fontSize: 15,
    },
    togglePasswordButton: {
        paddingEnd: 10,
        position: 'absolute',
        right: 0,
      top: 0,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10
    },
});
