import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});
const Birthdays = () => {
    const { churchData } = useContext(AuthContext);
    const [aniversariantesPorMes, setAniversariantesPorMes] = useState([]);

    useEffect(() => {
        const fetchChurches = async () => {
            // const fetchChurches = async () => {
                try {
                    const response = await api.get(baseURL +`/users/church/${churchData.id}`);
                    
                    const responseData = response.data; // Renomeando para evitar conflitos de nome
                           
                    if (responseData && responseData.data && responseData.data.length > 0) {
                        const aniversariantesPorMesTemp = Array(12).fill().map(() => []);
                        
                        responseData.data.forEach(pessoa => {
                            const mesNascimento = new Date(pessoa.data_nascimento).getMonth();
                            const aniversariante = {
                                nome: pessoa.nome,
                                sobrenome: pessoa.sobrenome,
                                data_nascimento: pessoa.data_nascimento,
                                mes_nascimento: mesNascimento
                            };
                            aniversariantesPorMesTemp[mesNascimento].push(aniversariante);
                        });

                    const mesAtual = new Date().getMonth();
                    const aniversariantesPorMesReorganizados = [
                        ...aniversariantesPorMesTemp.slice(mesAtual),
                        ...aniversariantesPorMesTemp.slice(0, mesAtual)
                    ];

                    setAniversariantesPorMes(aniversariantesPorMesReorganizados);
                } else {
                    console.error('Data array is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChurches();
    }, []);


    const renderMes = ({ item, index }) => {
        const mesIndex = (index + new Date().getMonth()) % 12;
        return (
            <View style={styles.mesContainer}>
                <Text style={styles.mesTitle}>{getMonthName(mesIndex)}</Text>
                <FlatList
                    data={item}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        );
    };

    const getMonthName = (monthIndex) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[monthIndex];
    };

    const formatarData = (data) => {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        return `${dia}/${mes}`;
    };

    const renderItem = ({ item }) => {
        const dataFormatada = formatarData(item.data_nascimento);
        const defaultIcon = require('../../../assets/icon.png');
        return (
            <View style={styles.item}>
                <Image
                    source={item.foto ? { uri: item.foto } : defaultIcon}
                    style={styles.imagem}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.born}>{dataFormatada}</Text>
                    <Text style={styles.nome}> - {item.nome} {item.sobrenome}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Aniversariantes por Mês</Text>
            <FlatList
                data={aniversariantesPorMes}
                renderItem={renderMes}
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
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    flatListContainer: {
        flexGrow: 1,
    },
    mesContainer: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 8,
        padding: 12,
        elevation: 3,
    },
    mesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        paddingHorizontal: 12,
    },
    imagem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    born: {
        fontSize: 16,
        marginBottom: 2,
        color: '#667',
        fontWeight: 'bold',
    },
    nome: {
        fontSize: 18,
    },
});

export default Birthdays;
