import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, SafeAreaView, ActivityIndicator } from 'react-native'; // Adicionado SafeAreaView e ActivityIndicator
import { Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '../../components/CheckBox2/index';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
    baseURL,
});

export default function SignUp() {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: ''
    });

    const [optionsMultiple, setOptionsMultiple] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [formReady, setFormReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setPasswordsMatch(formData.senha === formData.confirmarSenha);
        validateForm();
    }, [formData.senha, formData.confirmarSenha]);

    useEffect(() => {
        CheckBoxPage();
    }, []); // Chama uma vez quando o componente é montado

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        validateForm(); // Validar o formulário após a mudança de um campo
    };

    const handlePhoneChange = (value) => {
        if (value.length <= 14) {
            const formattedPhone = formatPhoneNumber(value);
            setFormData(prevState => ({
                ...prevState,
                telefone: formattedPhone
            }));
            validateForm(); // Validar o formulário após a mudança do número de telefone
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const { nome, sobrenome, email, senha, confirmarSenha, telefone } = formData;
        const passwordsMatch = senha === confirmarSenha; // Verificar se as senhas coincidem
        const isFormValid = nome.trim() !== '' && sobrenome.trim() !== '' && email.trim() !== '' && senha.trim() !== '' && confirmarSenha.trim() !== '' && telefone.trim() !== '';
        setPasswordsMatch(passwordsMatch); // Atualizar o estado de senhas coincidentes
        setFormReady(isFormValid && passwordsMatch);
    };

    const formatPhoneNumber = (input) => {
        const cleaned = ('' + input).replace(/\D/g, '');
        const formatted = cleaned.replace(/(\d{2})(\d{8,9})/, '($1) $2');
        return formatted;
    };
    // 192.168.1.103;
    const handleSubmit = async () => {
        setLoading(true); // Definir loading como true durante a submissão
        const { confirmarSenha, ...dataToSend } = formData;
        console.log('Dados enviados para o banco:', dataToSend);
        try {
            const response = await api.post(baseURL + '/users/', dataToSend);
            // const response = await axios.post(baseURL + 'users/', dataToSend);
            console.log('Resposta do servidor:', response.data);
            Alert.alert(
                'Cadastro realizado com sucesso',
                'Seu cadastro foi concluído com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log("Botão OK pressionado");
                            navigation.goBack(); // Voltar para a página anterior
                        }
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        } finally {
            setLoading(false); // Definir loading como false após a submissão, independentemente do resultado
        }
    };

    const CheckBoxPage = () => {
        // Função para navegar para a página de termos e condições
        const navigateToTermsAndConditions = () => {
            navigation.navigate('TermosCondicoes');
        };

        // Função para navegar para a página de política de privacidade
        const navigateToPrivacyPolicy = () => {
            navigation.navigate('PoliticaPrivacidade');
        };

        // Definindo as opções do CheckBox
        setOptionsMultiple([
            {
                text: (
                    <TouchableOpacity onPress={() => navigation.navigate("Condicoes")}>
                        <Text style={styles.linkText}>Li e Concordo com os termos e condições.</Text>
                    </TouchableOpacity>
                ),
                id: 1
            },
            {
                text: (
                    <TouchableOpacity onPress={() => navigation.navigate("Politics")}>
                        <Text style={styles.linkText}>Li e Concordo com a Política de Privacidade.</Text>
                    </TouchableOpacity>
                ),
                id: 2
            }
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.innerContainer}>
                    <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../../assets/Logo.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
                        <StatusBar style="auto" />
                        <Text style={styles.orientation}>Faça seu cadastro</Text>

                        <Text style={styles.title}>Nome</Text>
                        <TextInput
                            placeholder="Digite seu nome..."
                            style={[styles.input, !formData.nome.trim() && styles.errorInput]} // Adicionando estilo de erro se o campo estiver vazio
                            onChangeText={(text) => handleChange('nome', text)}
                        />

                        <Text style={styles.title}>Sobrenome</Text>
                        <TextInput
                            placeholder="Digite seu sobrenome..."
                            style={[styles.input, !formData.sobrenome.trim() && styles.errorInput]} // Adicionando estilo de erro se o campo estiver vazio
                            onChangeText={(text) => handleChange('sobrenome', text)}
                        />

                        <Text style={styles.title}>Email</Text>
                        <TextInput
                            placeholder="Digite seu E-mail..."
                            style={[styles.input, !formData.email.trim() && styles.errorInput]} // Adicionando estilo de erro se o campo estiver vazio
                            onChangeText={(text) => handleChange('email', text)}
                        />

                        <Text style={styles.title}>Senha</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                secureTextEntry={!showPassword}
                                placeholder="Digite sua senha..."
                                style={[styles.passwordInput, !formData.senha.trim() && styles.errorInput]} // Adicionando estilo de erro se o campo estiver vazio
                                onChangeText={(text) => handleChange('senha', text)}
                            />
                            <TouchableOpacity onPress={toggleShowPassword} style={styles.togglePasswordButton}>
                                <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Confirmar Senha</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                secureTextEntry={!showConfirmPassword}
                                placeholder="Digite sua senha..."
                                style={[styles.passwordInput, !formData.confirmarSenha.trim() && styles.errorInput]} // Adicionando estilo de erro se o campo estiver vazio
                                onChangeText={(text) => handleChange('confirmarSenha', text)}
                            />
                            <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.togglePasswordButton}>
                                <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        {!passwordsMatch && (
                            <Text style={styles.errorMessage}>As senhas não coincidem</Text>
                        )}

                        <Text style={styles.title}>Telefone</Text>
                        <TextInput
                            placeholder="(xx) xxxxxxxxx"
                            style={[styles.input, !formData.telefone.trim() && styles.errorInput]} // Adicionando estilo de erro se o campo estiver vazio
                            onChangeText={handlePhoneChange}
                            value={formData.telefone}
                        />

                        <TouchableOpacity onPress={() => navigation.navigate('TermosCondicoes')}>
                            <Text style={styles.linkText}>Termos e Condições</Text>
                        </TouchableOpacity>
                        <SafeAreaView style={styles.containerBox}>
                            <CheckBox options={optionsMultiple} onChange={(op) => console.log(op)} />
                        </SafeAreaView>

                        <TouchableOpacity
                            style={[styles.button, !formReady && { backgroundColor: 'gray' }]}
                            onPress={handleSubmit}
                            disabled={!formReady}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.buttonText}>Acessar</Text>
                            )}
                        </TouchableOpacity>
                    </Animatable.View>
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
    orientation: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 18,
        marginLeft: '3%',
    },
    innerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: "3%",
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    containerForm: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingStart: '5%',
        paddingEnd: '5%',
        width: '100%',
    },
    title: {
        fontSize: 18,
        marginTop: 18
    },
    input: {
        borderBottomWidth: 1,
        height: 30,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000000',
        width: '100%',
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 20,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        fontWeight: 'bold'
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    passwordInput: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
    },
    togglePasswordButton: {
        padding: 10,
    },
    containerBox: {
        marginTop: 20,
        backgroundColor: '#fff',
    },

});
