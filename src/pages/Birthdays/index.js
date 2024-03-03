import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

// Carregando os dados do JSON
import data from '../Teams/cadastros.json';

// Ícone padrão de pessoa
const defaultIcon = require('../../../assets/icon.png');

const Birthdays = () => {
    const [aniversariantesPorMes, setAniversariantesPorMes] = useState([]);

    useEffect(() => {
        // Criar um array de 12 elementos (um para cada mês)
        const aniversariantesPorMesTemp = Array(12).fill().map(() => []);

        // Filtrando as pessoas que vão à igreja da paz
        const pessoasPaz = data.usuarios.filter((pessoa) => pessoa.igreja === 'Igreja da Paz');

        // Adicionando cada pessoa ao mês correspondente
        pessoasPaz.forEach(pessoa => {
            const mesNascimento = new Date(pessoa.data_nascimento).getMonth();
            aniversariantesPorMesTemp[mesNascimento].push(pessoa);
        });

        // Obter o índice do mês atual
        const mesAtual = new Date().getMonth();

        // Reorganizar os meses para que o mês atual seja o primeiro
        const aniversariantesPorMesReorganizados = [
            ...aniversariantesPorMesTemp.slice(mesAtual),
            ...aniversariantesPorMesTemp.slice(0, mesAtual)
        ];

        setAniversariantesPorMes(aniversariantesPorMesReorganizados);
    }, []);

    const renderMes = ({ item, index }) => {
        const mesIndex = (index + new Date().getMonth()) % 12; // Calcular o índice do mês após a reorganização
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
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // Meses são base zero, então é necessário adicionar 1
        return `${dia}/${mes}`;
    };

    const renderItem = ({ item }) => {
        const dataFormatada = formatarData(item.data_nascimento);
        return (
            <View style={styles.item}>
                <Image
                    source={item.foto ? { uri: item.foto } : defaultIcon}
                    style={styles.imagem}
                />
                {/* <View style={styles.textContainer}> */}
                    <Text style={styles.born}>{dataFormatada}</Text>
                    <Text style={styles.nome}> - {item.nome} {item.sobrenome}</Text>
                {/* </View> */}
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
