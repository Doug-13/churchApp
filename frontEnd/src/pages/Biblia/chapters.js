import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const Chapters = ({ route, navigation }) => {
    const { book } = route.params;
    const windowWidth = Dimensions.get('window').width;

    // Função para lidar com o pressionar do botão do capítulo
    const handleChapterPress = (chapterIndex) => {
        // Obtenha os textos do capítulo selecionado
        const chapterTexts = book.chapters[chapterIndex];

        // Mapeie os textos do capítulo com seus respectivos versículos
        const chapterVerses = chapterTexts.map((text, index) => `${index + 1} - ${text}`);

        // Navegue para a tela do capítulo selecionado, passando os dados necessários
        navigation.navigate('Versus', { book: book, chapterIndex: chapterIndex, chapterText: chapterVerses });
    };

    // Renderizar botões para cada capítulo
    const renderChapters = () => {
        const numChapters = book.chapters.length;
        const buttonWidth = windowWidth / numChapters;

        return book.chapters.map((chapter, index) => (
            <TouchableOpacity
                key={index}
                style={[styles.button, { width: buttonWidth >= 50 ? buttonWidth : 70 }]} // largura mínima de 70
                onPress={() => handleChapterPress(index)}
            >
                <Text style={styles.buttonText}>{index + 1}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        // <ScrollView>
        <View style={styles.container}>

            <Text style={styles.title}> {book.abbrev.toUpperCase()} - {book.name}</Text>

            <ScrollView>
                <View style={styles.chapterContainer}>{renderChapters()}</View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    chapterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        margin: 3,
        backgroundColor: '#f3d00f',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default Chapters;
