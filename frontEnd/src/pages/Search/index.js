// Search.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

import * as Animatable from 'react-native-animatable'

export default function Search() {
    const [searchWord, setSearchWord] = useState("");
    const [churches, setChurches] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChurches = async () => {
            try {
                const response = await api.get(baseURL +'/church/');
                const churchData = response.data;
                if (churchData.success) {
                    setChurches(churchData.data);
                } else {
                    console.error('Erro ao buscar igrejas:', churchData.message);
                }
            } catch (error) {
                console.error('Erro durante a busca de igrejas:', error);
            }
        };

        fetchChurches();
    }, []);

    const goToChurchDetails = (church) => {
        navigation.navigate("ChurchDetails", { church });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.containerHeader}>
                <Animatable.View animation='fadeInLeft' delay={500}>
                    <Image
                        source={require('../../../assets/Logo.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Animatable.View>
            </View>
            <Animatable.View animation='fadeInUp' delay={500} style={styles.searchContainer}>

                <View style={styles.searchContainer}>
                    <StatusBar barStyle="light-content" />
                    <Text style={styles.title}>Encontre sua Igreja</Text>
                    <TextInput
                        placeholder="Digite sua cidade ou nome da instituição."
                        onChangeText={(text) => setSearchWord(text.trim())}
                        style={styles.input}
                    />
                    <ScrollView>
                        {searchWord === "" ? (
                            <Text style={styles.noResults}></Text>
                        ) : (
                            churches.filter((church) => {
                                return (
                                    (church.cidade && church.cidade.toLowerCase().includes(searchWord.toLowerCase())) ||
                                    (church.nome && church.nome.toLowerCase().includes(searchWord.toLowerCase()))
                                );
                            }).map((church) => (
                                <TouchableOpacity onPress={() => goToChurchDetails(church)} key={church.id}>
                                    <View style={styles.searchArea}>
                                        <Text style={styles.institutionName}>{church.nome}</Text>
                                        <Text style={styles.cityLeader}>{church.cidade} - {church.lider}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.registrationButton}
                        onPress={() => navigation.navigate("ChurchRegister")}
                    >
                        <Text style={styles.buttonText}>Não localizou, cadastre aqui!!</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3d00f",

    },
    containerHeader: {
        alignItems: 'center', // Centraliza a imagem horizontalmente

    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 20,
        marginTop: 20
    },
    searchContainer: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },

    title: {
        fontSize: 20,
        marginBottom: 15,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 30,
        marginBottom: 3,
        fontSize: 16
    },
    searchArea: {
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingVertical: 10,
    },

    institutionName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    cityLeader: {
        fontSize: 12,
    },

    registrationButton: {
        backgroundColor: '#000000',
        width: '100%',
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 14,
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 19,
        color: '#ffff',
        fontWeight: 'bold'
    },
});
