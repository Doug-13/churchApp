import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

// Carregando os dados do JSON
import data from '../Teams/cadastros.json';

// Ícone padrão de pessoa
const defaultIcon = require('../../../assets/icon.png');

const PessoaScreen = () => {
    const [pessoasIgrejaPaz, setPessoasIgrejaPaz] = useState([]);
  
    useEffect(() => {
      // Filtrando as pessoas que vão à igreja da paz
      const pessoasPaz = data.usuarios.filter((pessoa) => pessoa.igreja === 'Igreja da Paz');
      // Ordenando as pessoas em ordem alfabética pelo nome
      const pessoasOrdenadas = pessoasPaz.sort((a, b) => a.nome.localeCompare(b.nome));
      setPessoasIgrejaPaz(pessoasOrdenadas);
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
          data={pessoasIgrejaPaz}
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
      width: screenWidth, // Ocupa 100% da largura da tela
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1, // Largura da borda inferior
        borderBottomColor: 'black', // Cor da borda inferior
        alignItems: 'center',
        marginBottom: 6,
        width: '100%', // Ocupa 100% da largura da tela
        paddingHorizontal: 16, // Espaçamento horizontal para evitar que os itens fiquem colados nas laterais
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
