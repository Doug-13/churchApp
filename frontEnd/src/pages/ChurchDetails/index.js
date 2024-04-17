import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { AuthContext } from '../../context/auth.js';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChurchDetails = ({ route, navigation }) => {
    const { church } = route.params;
    const { user, updateUser, conectionUserChurch } = useContext(AuthContext); // Obtenha o usuário, a função updateUser e a função conectionUserChurch do contexto de autenticação

    const handleFaçaParte = async () => {
        try {
            await conectionUserChurch(church.id, user, navigation); // Passando navigation como parâmetro
            Alert.alert(
                'Cadastro realizado com sucesso',
                'Seu cadastro foi concluído com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log("Botão OK pressionado");
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
        <View style={styles.container}>
            <Image source={require('../../../assets/Mevam.jpg')} style={styles.logo} />
            <Text style={styles.churchName}>{church.nome}</Text>
            <Text style={styles.churchId}>{church.id}</Text>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Telefone:</Text>
                <Text style={styles.fieldValue}>{church.telefone}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Email:</Text>
                <Text style={styles.fieldValue}>{church.email}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Estado:</Text>
                <Text style={styles.fieldValue}>{church.estado}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Cidade:</Text>
                <Text style={styles.fieldValue}>{church.cidade}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Endereço:</Text>
                <Text style={styles.fieldValue}>{church.rua}, {church.numero}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>CEP:</Text>
                <Text style={styles.fieldValue}>{church.cep}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Líder:</Text>
                <Text style={styles.fieldValue}>{church.lider}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Sobre nós:</Text>
                <Text style={styles.fieldValue}>{church.sobre_nos}</Text>
            </View>
            {church.WhatsApp ? (
                <TouchableOpacity style={[styles.button, styles.whatsappButton]} onPress={openWhatsApp}>
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </TouchableOpacity>
            ) : null}
            {church.instagram ? (
                <TouchableOpacity style={[styles.button, styles.instagramButton]} onPress={openInstagram}>
                    <Text style={styles.buttonText}>Instagram</Text>
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.bottomButton} onPress={handleFaçaParte}>
                <Text style={styles.bottomButtonText}>Faça parte</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    churchName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    fieldContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    fieldTitle: {
        width: 100,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    fieldValue: {
        flex: 1,
        fontSize: 18,
        color: '#666',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    whatsappButton: {
        backgroundColor: '#25D366',
    },
    instagramButton: {
        backgroundColor: '#3f729b',
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    bottomButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChurchDetails;
