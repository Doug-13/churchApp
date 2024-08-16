import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BibleData from '../../../bilia.json'; // Importe os dados do arquivo JSON

const BibleBooks = [
  'Gn', 'Ex', 'Lv', 'Nm', 'Dt', 'Js',
  'Jz', 'Rt', '1Sm', '2Sm', '1Rs', '2Rs',
  '1Cr', '2Cr', 'Ed', 'Ne', 'Et', 'Jó',
  'Sl', 'Pv', 'Ec', 'Ct', 'Is', 'Jr',
  'Lm', 'Ez', 'Dn', 'Os', 'Jl', 'Am',
  'Ob', 'Jn', 'Mq', 'Na', 'Hc', 'Sf',
  'Ag', 'Zc', 'Ml', 'Mt', 'Mc', 'Lc',
  'Jo', 'At', 'Rm', '1Co', '2Co', 'Gl',
  'Ef', 'Fp', 'Cl', '1Ts', '2Ts', '1Tm',
  '2Tm', 'Tt', 'Fm', 'Hb', 'Tg', '1Pe',
  '2Pe', '1Jo', '2Jo', '3Jo', 'Jd', 'Ap'
];

const Biblia = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handleBookPress = (bookAbbreviation) => {
    // Encontre o livro correspondente no JSON
    const selectedBook = BibleData.find(book => book.abbrev.toLowerCase() === bookAbbreviation.toLowerCase());

    // Navegue para a tela de capítulos do livro selecionado, passando os dados necessários
    navigation.navigate('Chapters', { book: selectedBook });
  };

  const renderBooks = () => {
    const numBooks = BibleBooks.length;
    const buttonWidth = windowWidth / 6; // Dividindo em 6 botões por linha

    return BibleBooks.map((book, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.button, { width: buttonWidth >= 50 ? buttonWidth : 70 }]} // largura mínima de 100
        onPress={() => handleBookPress(book)}
      >
        <Text style={styles.buttonText}>{book}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.Title}>Bíblia Sagrada</Text>
      </View>
      <View style={styles.booksContainer}>
        {renderBooks()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingTop: 10,

  },
  containerTitle: {
    marginBottom: 30,
  
  },
  Title:{
    fontSize: 37, // Tamanho do texto 20
    color: 'black', // Cor do texto preto
    fontWeight: 'bold',

  },
  booksContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    margin: 1,
    backgroundColor: '#f3d00f',// Cor de fundo amarela
    paddingVertical: 10,
    paddingHorizontal:2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18, // Tamanho do texto 20
    color: 'black', // Cor do texto preto
    fontWeight: 'bold',
  },
});

export default Biblia;
