import React, { useState, useEffect, useContext } from 'react'; // Adicionando o useContext
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios'; // Importando o módulo axios
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const defaultIcon = require('../../../assets/icon.png');

const PessoaScreen = () => {
    const [peopleChurch, setPeopleChurch] = useState([]); // Renomeando o estado
    const { churchData } = useContext(AuthContext);

    useEffect(() => {
        const fetchChurches = async () => {
            try {
                console.log('http://192.168.100.254:3006/api/users/',churchData.id)
                const response = await api.get(baseURL +`users/church/${churchData.id}`);
               
                const responseData = response.data;

                if (responseData && responseData.data && responseData.data.length > 0) {
                    const pessoasOrdenadas = responseData.data.sort((a, b) => a.nome.localeCompare(b.nome)); // Usando responseData.data diretamente
                    setPeopleChurch(pessoasOrdenadas); // Corrigindo o nome do estado
                } else {
                    console.error('Data array is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChurches();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image
                source={item.foto ? { uri: item.foto } : defaultIcon}
                style={styles.imagem}
            />
            <Text style={styles.nome}>{item.nome} {item.sobrenome}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Pessoas</Text>
            <FlatList
                data={peopleChurch}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    flatListContainer: {
        width: screenWidth,
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
        marginBottom: 6,
        width: '100%',
        paddingHorizontal: 16,
    },
    imagem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    nome: {
        fontSize: 18,
    },
});

export default PessoaScreen;
