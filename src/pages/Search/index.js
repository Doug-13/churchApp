import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import churchMain from '../../../churchMain.json';

import * as Animatable from 'react-native-animatable'

export default function Search() {
    const [searchWord, setSearchWord] = useState("");
    const navigation = useNavigation();


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
                    {/* <Animatable.View animation='fadeInUp' delay={500} style={styles.searchContainer}></Animatable.View> */}
                    <ScrollView >
                        {searchWord === "" ? ( // Verifica se a barra de busca está vazia
                            <Text style={styles.noResults}></Text>
                        ) : (
                            churchMain.filter((val) => {
                                return (
                                    (val.city && val.city.toLowerCase().includes(searchWord.toLowerCase())) ||
                                    (val.institutionName && val.institutionName.toLowerCase().includes(searchWord.toLowerCase()))
                                );
                            }).map((item, index) => (

                                <TouchableOpacity onPress={() => navigation.navigate("SignUp")} key={item.id}>
                                    
                                    <View style={styles.searchArea}>
                                        <Text style={styles.institutionName}>{item.institutionName}</Text>
                                        <View>
                                            <Text style={styles.cityLeader}>{item.city} - {item.leader}</Text>
                                        </View>
                                    </View>
                                    
                                </TouchableOpacity>

                            ))
                        )}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.registrationButton}
                        onPress={() => navigation.navigate("SignUp")}
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
