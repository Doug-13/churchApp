import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter instalado essa biblioteca

const Versus = ({ route, navigation }) => {
    const { book, chapterIndex, chapterText } = route.params;
    const [currentChapterIndex, setCurrentChapterIndex] = useState(chapterIndex);
    const [currentChapterText, setCurrentChapterText] = useState(chapterText);
    const scrollViewRef = useRef();

    // Função para atualizar o texto do capítulo quando o índice do capítulo muda
    useEffect(() => {
        setCurrentChapterText(book.chapters[currentChapterIndex]);
        // Rolando para o topo quando houver mudança de capítulo
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }, [currentChapterIndex]);

    const handleNextChapter = () => {
        if (currentChapterIndex < book.chapters.length - 1) {
            setCurrentChapterIndex(currentChapterIndex + 1);
        }
    };

    const handlePreviousChapter = () => {
        if (currentChapterIndex > 0) {
            setCurrentChapterIndex(currentChapterIndex - 1);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>{book.name} - {currentChapterIndex + 1}</Text>
            <ScrollView ref={scrollViewRef}>
                {currentChapterText.map((verse, index) => (
                    <Text key={index} style={styles.verseText}>{index + 1} - {verse}</Text>
                ))}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handlePreviousChapter} disabled={currentChapterIndex === 0} style={styles.button}>
                        <Ionicons name="arrow-back" size={34} color={currentChapterIndex === 0 ? "gray" : "black"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextChapter} disabled={currentChapterIndex === book.chapters.length - 1} style={styles.button}>
                        <Ionicons name="arrow-forward" size={34} color={currentChapterIndex === book.chapters.length - 1 ? "gray" : "black"} />
                    </TouchableOpacity>
                </View>
                </ScrollView >
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop:30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    verseText: {
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 40, // Adicionando espaçamento horizontal
    },
    button: {
        marginTop: 30,
        paddingHorizontal: 10,
        marginBottom: 30,

    },
});

export default Versus;
