import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, SafeAreaView, ActivityIndicator, TouchableOpacity, Platform, View, Text, TextInput, Image, ScrollView, StyleSheet, KeyboardAvoidingView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '../../components/CheckBox2/index';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { baseURL } from '../../../constants/url.js';
import * as ImagePicker from 'expo-image-picker';

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
        telefone: '',
        fotoPerfil: null
    });

    const [optionsMultiple, setOptionsMultiple] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [formReady, setFormReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setPasswordsMatch(formData.senha === formData.confirmarSenha);
        validateForm();
    }, [formData.senha, formData.confirmarSenha, formData.nome, formData.sobrenome, formData.email, formData.telefone, termsAccepted, formData.fotoPerfil]);

    useEffect(() => {
        CheckBoxPage();
    }, []);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        validateForm();
    };

    const handlePhoneChange = (value) => {
        if (value.length <= 14) {
            const formattedPhone = formatPhoneNumber(value);
            setFormData(prevState => ({
                ...prevState,
                telefone: formattedPhone
            }));
            validateForm();
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const { nome, sobrenome, email, senha, confirmarSenha, telefone, fotoPerfil } = formData;
        const passwordsMatch = senha === confirmarSenha;
        const isFormValid = nome.trim() !== '' && sobrenome.trim() !== '' && email.trim() !== '' && senha.trim() !== '' && confirmarSenha.trim() !== '' && telefone.trim() !== '' && fotoPerfil !== null;
        setPasswordsMatch(passwordsMatch);
        setFormReady(isFormValid && passwordsMatch && termsAccepted);
    };

    const formatPhoneNumber = (input) => {
        const cleaned = ('' + input).replace(/\D/g, '');
        const formatted = cleaned.replace(/(\d{2})(\d{8,9})/, '($1) $2');
        return formatted;
    };

    const handleSubmit = async () => {
        setLoading(true);
        const { confirmarSenha, ...dataToSend } = formData;
        console.log('Dados enviados para o banco:', dataToSend);
        try {
            const response = await api.post(baseURL + '/users/', dataToSend);
            console.log('Resposta do servidor:', response.data);
            Alert.alert(
                'Cadastro realizado com sucesso',
                'Seu cadastro foi concluído com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log("Botão OK pressionado");
                            navigation.goBack();
                        }
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const CheckBoxPage = () => {
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

    const handleCheckBoxChange = (selectedOptions) => {
        setTermsAccepted(selectedOptions.length === 2);
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a galeria.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prevState => ({
                ...prevState,
                fotoPerfil: result.assets[0].uri,
            }));
            setShowPhotoOptions(false);
        }
    };

    const removePhoto = () => {
        setFormData(prevState => ({
            ...prevState,
            fotoPerfil: null,
        }));
        setShowPhotoOptions(false);
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prevState => ({
                ...prevState,
                fotoPerfil: result.assets[0].uri
            }));
            setShowPhotoOptions(false);
        }
    };

    const handlePhotoClick = () => {
        setShowPhotoOptions(true);
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
                            {formData.fotoPerfil ? (
                                <Image
                                    source={{ uri: formData.fotoPerfil }}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Text style={styles.imageText}>Adicione sua foto</Text>
                            )}
                            <TouchableOpacity
                                style={styles.cameraIcon}
                                onPress={handlePhotoClick}
                            >
                                <Feather name="camera" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <Modal
                            transparent={true}
                            visible={showPhotoOptions}
                            animationType="slide"
                            onRequestClose={() => setShowPhotoOptions(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity 
                                        style={styles.closeButton} 
                                        onPress={() => setShowPhotoOptions(false)}
                                    >
                                        <Feather name="x" size={24} color="#000" />
                                    </TouchableOpacity>
                                    <Text style={styles.modalText}>Foto de Perfil</Text>
                                    <View style={styles.iconButtonContainer}>
                                        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                                            <Feather name="image" size={40} color="#000" />
                                            <Text style={styles.iconLabel}>Galeria</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
                                            <Feather name="camera" size={40} color="#000" />
                                            <Text style={styles.iconLabel}>Câmera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={removePhoto} style={styles.iconButton}>
                                            <Feather name="trash-2" size={40} color="#000" />
                                            <Text style={styles.iconLabel}>Remover Foto</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
                        <StatusBar style="auto" />
                        <Text style={styles.orientation}>Faça seu cadastro</Text>

                        <Text style={styles.title}>Nome</Text>
                        <TextInput
                            placeholder="Digite seu nome..."
                            style={[styles.input, !formData.nome.trim() && styles.errorInput]}
                            onChangeText={(text) => handleChange('nome', text)}
                        />

                        <Text style={styles.title}>Sobrenome</Text>
                        <TextInput
                            placeholder="Digite seu sobrenome..."
                            style={[styles.input, !formData.sobrenome.trim() && styles.errorInput]}
                            onChangeText={(text) => handleChange('sobrenome', text)}
                        />

                        <Text style={styles.title}>Email</Text>
                        <TextInput
                            placeholder="Digite seu email..."
                            keyboardType="email-address"
                            style={[styles.input, !formData.email.trim() && styles.errorInput]}
                            onChangeText={(text) => handleChange('email', text)}
                        />

                        <Text style={styles.title}>Senha</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                secureTextEntry={!showPassword}
                                placeholder="Digite sua senha..."
                                style={[styles.passwordInput, !formData.senha.trim() && styles.errorInput]}
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
                                style={[styles.passwordInput, !formData.confirmarSenha.trim() && styles.errorInput]}
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
                            style={[styles.input, !formData.telefone.trim() && styles.errorInput]}
                            onChangeText={handlePhoneChange}
                            value={formData.telefone}
                        />

                        <SafeAreaView style={styles.containerBox}>
                            <CheckBox options={optionsMultiple} onChange={handleCheckBoxChange} />
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
        width: 150,
        height: 150,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#e0e0e0',
        borderWidth: 1,
        borderColor: '#ccc',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    imageText: {
        color: '#555',
        fontSize: 16,
    },
    cameraIcon: {
        position: 'absolute',
        top: 105,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    imageButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
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
    linkText: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 15,
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
    errorInput: {
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        textAlign: 'center',
    },
    iconButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    iconLabel: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
});
