import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StatusBar, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/auth.js';

export default function ChurchRegister() {
    const navigation = useNavigation();
    const { user, handleChurchRegistrationSubmit } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        estado: '',
        cidade: '',
        rua: '',
        numero: '',
        lider: '',
        id_creator: user ? user.id : ''
    });
    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
        const isFormReady = Object.values(formData).every(value => value !== '');
        setFormReady(isFormReady);
    }, [formData]);

    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleSubmit = async () => {
        if (!formReady) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            await handleChurchRegistrationSubmit(formData);
            Alert.alert(
                'Cadastro realizado com sucesso',
                'Seu cadastro foi concluído com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log("Botão OK pressionado");
                            navigation.navigate('MainScreen');
                        }
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
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
                        <Text style={{ color: 'blue', fontSize: 28, fontWeight: 'bold' }}>Logo</Text>
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
                        <StatusBar style="auto" />
                        <Text style={styles.orientation}>Cadastrar dados da Igreja </Text>

                        <Text style={styles.title}>Nome da Igreja</Text>
                        <TextInput
                            placeholder="Digite o nome da igreja..."
                            style={styles.input}
                            value={formData.nome}
                            onChangeText={(text) => handleInputChange('nome', text)}
                        />

                        <Text style={styles.title}>Fone</Text>
                        <TextInput
                            placeholder="Digite o telefone... "
                            style={styles.input}
                            value={formData.telefone}
                            onChangeText={(text) => handleInputChange('telefone', text)}
                        />

                        <Text style={styles.title}>E-mail</Text>
                        <TextInput
                            placeholder="Digite o e-mail..."
                            style={styles.input}
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />

                        <Text style={styles.title}>Estado</Text>
                        <TextInput
                            placeholder="Digite o estado..."
                            style={styles.input}
                            value={formData.estado}
                            onChangeText={(text) => handleInputChange('estado', text)}
                        />

                        <Text style={styles.title}>Cidade</Text>
                        <TextInput
                            placeholder="Digite a cidade..."
                            style={styles.input}
                            value={formData.cidade}
                            onChangeText={(text) => handleInputChange('cidade', text)}
                        />

                        <Text style={styles.title}>Rua</Text>
                        <TextInput
                            placeholder="Digite a rua..."
                            style={styles.input}
                            value={formData.rua}
                            onChangeText={(text) => handleInputChange('rua', text)}
                        />

                        <Text style={styles.title}>Número</Text>
                        <TextInput
                            placeholder="Digite o número..."
                            style={styles.input}
                            value={formData.numero}
                            onChangeText={(text) => handleInputChange('numero', text)}
                        />

                        <Text style={styles.title}>Líder</Text>
                        <TextInput
                            placeholder="Digite o nome do líder da igreja..."
                            style={styles.input}
                            value={formData.lider}
                            onChangeText={(text) => handleInputChange('lider', text)}
                        />

                        <TouchableOpacity
                            style={[styles.button, !formReady && { backgroundColor: 'gray' }]} // Desativa o botão se o formulário não estiver pronto
                            onPress={handleSubmit}
                            disabled={!formReady} // Desativa o botão se o formulário não estiver pronto
                        >
                            <Text style={styles.buttonText}>Cadastrar</Text>
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

    multiLineInput: {
        height: 220,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
});
