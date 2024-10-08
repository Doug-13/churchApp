import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Importing AntDesign icons

const Studies = () => {
    const navigation = useNavigation();

    const handleCursoPress = (cursoName) => {
        console.log("Você clicou em: ", cursoName);
    };

    const handleAddReport = () => {
        console.log("Adicionar novo relatório...");
    };

    const navigateToNewStudies = () => {
        navigation.navigate('NewStudies'); // Navigate to NewStudies screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Cursos Disponíveis</Text>
            <View style={styles.row}>
                <CursoItem
                    title="Curso de Programação"
                    imageSource={require('../../../assets/Logo.png')}
                    onPress={() => handleCursoPress("Curso de Programação")}
                />
                <CursoItem
                    title="Curso de Design Gráfico"
                    imageSource={require('../../../assets/Logo.png')}
                    onPress={() => handleCursoPress("Curso de Design Gráfico")}
                />
            </View>
            <View style={styles.row}>
                <CursoItem
                    title="Curso de Marketing Digital"
                    imageSource={require('../../../assets/Logo.png')}
                    onPress={() => handleCursoPress("Curso de Marketing Digital")}
                />
                <CursoItem
                    title="Curso de Fotografia"
                    imageSource={require('../../../assets/Logo.png')}
                    onPress={() => handleCursoPress("Curso de Fotografia")}
                />
            </View>
            {/* Button to navigate to NewStudies */}
            <TouchableOpacity style={styles.addButton} onPress={navigateToNewStudies}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const CursoItem = ({ title, imageSource, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cursoItem}>
            <ImageBackground source={imageSource} style={styles.cursoImage}>
                <Text style={styles.cursoTitle}>{title}</Text>
                <Text style={styles.cursoName}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginTop:20
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    cursoItem: {
        flex: 1,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cursoImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    cursoTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    cursoName: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 3, // Add elevation for a raised effect
    },
});

export default Studies;
