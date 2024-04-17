import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Versus = ({ route, navigation }) => {
    const { book, chapterIndex, chapterText } = route.params;
    const [currentChapterIndex, setCurrentChapterIndex] = useState(chapterIndex);
    const [currentChapterText, setCurrentChapterText] = useState(chapterText);
    const scrollViewRef = useRef();

    useEffect(() => {
        setCurrentChapterText(book.chapters[currentChapterIndex]);
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
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollViewContent}>
                {currentChapterText.map((verse, index) => (
                    <Text key={index} style={styles.verseText}>{index + 1} - {verse}</Text>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePreviousChapter} disabled={currentChapterIndex === 0} style={styles.button}>
                    <View style={styles.circularButton}>
                        <Ionicons name="arrow-back" size={34} color={currentChapterIndex === 0 ? "gray" : "black"} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextChapter} disabled={currentChapterIndex === book.chapters.length - 1} style={styles.button}>
                    <View style={styles.circularButton}>
                        <Ionicons name="arrow-forward" size={34} color={currentChapterIndex === book.chapters.length - 1 ? "gray" : "black"} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 100, // ajuste conforme necessário para evitar que os botões cubram o texto
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    verseText: {
        marginBottom: 8,
        marginRight: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingBottom: 25,
        backgroundColor: 'transparent',
    },
    button: {
        paddingHorizontal: 10,
    },
    circularButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
    },
});

export default Versus;
