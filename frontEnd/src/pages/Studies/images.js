    import React, { useState, useEffect } from 'react';
    import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
    import * as FileSystem from 'expo-file-system';

    const Images = () => {
        const [images, setImages] = useState([]);

        useEffect(() => {
            const loadImages = async () => {
                try {
                    const directory = 'src/Capas';
                    const files = await FileSystem.readDirectoryAsync(directory);
                    setImages(files.map(file => `${directory}/${file}`));
                } catch (error) {
                    console.error('Erro ao carregar imagens:', error);
                }
            };

            loadImages();
        }, []);

        const handleImageSelect = (imageUri) => {
            // Lógica para lidar com a seleção da imagem
            console.log('Imagem selecionada:', imageUri);
        };

        const renderImageItem = ({ item }) => (
            <TouchableOpacity onPress={() => handleImageSelect(item)} style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} />
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Imagens Disponíveis</Text>
                <FlatList
                    data={images}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.imageList}
                />
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingTop: 20,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        imageList: {
            alignItems: 'center',
        },
        imageContainer: {
            margin: 5,
        },
        image: {
            width: 150,
            height: 150,
            resizeMode: 'cover',
            borderRadius: 10,
        },
    });

    export default Images;
