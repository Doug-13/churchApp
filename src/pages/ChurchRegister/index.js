import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import CheckBox from '../../components/CheckBox/CheckBox2/index';
import * as ImagePicker from 'expo-image-picker';

export default function ChurchRegister() {
    const navigation = useNavigation();
    const route = useRoute();
    const { fromScreen } = route.params || {};
    const [image, setImage] = useState(null);
    const [optionsindividual, setOptionsIndividual] = useState([]);
    const [optionsmultiple, setOptionsMultiple] = useState([]);

    useEffect(() => {
        CheckBoxPage();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const clearImage = () => {
        setImage(null);
    };

    const handleImageClick = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja alterar a imagem?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => pickImage(),
                },
            ],
            { cancelable: true }
        );
    };

    const CheckBoxPage = () => {
        setOptionsIndividual([{ text: "Li e Concordo", id: 1 }]);

        setOptionsMultiple([
            { text: "Estacionamento", id: 1 },
            { text: 'Acessivel a Cadeirantes', id: 2 },
            { text: 'Acessivel em Libras', id: 3 },
            { text: 'Escolinha para Crianças', id: 4 }
        ]);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.innerContainer}>
                    <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                        <TouchableOpacity onPress={pickImage}>
                            <TouchableOpacity onPress={handleImageClick}>
                                <View style={styles.imageContainer}>
                                    {image && <Image source={{ uri: image }} style={styles.image} />}
                                    {!image && <Text style={{ color: 'blue', fontSize: 28, fontWeight: 'bold' }}>Logo</Text>}
                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
                        <StatusBar style="auto" />
                        <Text style={styles.orientation}>Cadastrar dados da Igreja </Text>

                        <Text style={styles.title}>Nome da Igreja</Text>
                        <TextInput
                            placeholder="Digite o nome da igreja..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>Fone</Text>
                        <TextInput
                            placeholder="Digite o telefone..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>E-mail</Text>
                        <TextInput
                            placeholder="Digite o e-mail..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>Estado</Text>
                        <TextInput
                            placeholder="Digite o estado..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>Cidade</Text>
                        <TextInput
                            placeholder="Digite a cidade..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>Rua</Text>
                        <TextInput
                            placeholder="Digite a rua..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>Número</Text>
                        <TextInput
                            placeholder="Digite o número..."
                            style={styles.input}
                        />

                        <Text style={styles.title}>Líder</Text>
                        <TextInput
                            placeholder="Digite o nome do líder da igreja..."
                            style={styles.input}
                        />

                        {fromScreen === 'menu' && (
                            <>
                                <Text style={styles.title}>Sobre Nós</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder="Escreva informações sobre sua igreja, propósito, visão, apresente-a para que outros a conheçam..."
                                    style={[styles.input, styles.multiLineInput]}
                                />



                                <SafeAreaView style={styles.containerBox}>
                                    <CheckBox options={optionsmultiple} onChange={(op) => console.log(op)} />
                                </SafeAreaView>
                            </>
                        )}

                        <SafeAreaView style={styles.containerBox}>
                            <CheckBox options={optionsindividual} onChange={(op) => console.log(op)} />
                        </SafeAreaView>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate("MainScreen")}
                        >
                            <Text style={styles.buttonText}>Acessar</Text>
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
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
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
    containerBox: {
        marginTop: 20,
        backgroundColor: '#fff',
    },
    multiLineInput: {
        height: 220,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
});
