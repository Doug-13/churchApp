import React, { useState } from 'react';
import { Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const NewStudies = () => {
    const navigation = useNavigation(); // Hook de navegação
    const richText = React.useRef();
    const [image, setImage] = useState(null);

    const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleImageClick = () => {
        pickImage();
    };

    const handleSave = () => {
        // Lógica para salvar os dados do editor ou realizar a ação desejada
        const editorContent = richText.current?.getContentHtml(); // Exemplo de obtenção do conteúdo HTML do editor
        console.log('Conteúdo do editor:', editorContent);
        // Implemente aqui a lógica para salvar os dados ou realizar a ação desejada

        // Exibir o alerta de sucesso
        Alert.alert(
            'Sucesso',
            'Estudo gerado com sucesso!!!',
            [
                {
                    text: 'Cancelar',
                    onPress: () => {
                        // Lógica para cancelar, se necessário
                    },
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Navegar para a página anterior após o usuário pressionar "OK"
                        navigation.goBack();
                    },
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f3d00f' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Novo Estudo</Text>
                        <TouchableOpacity onPress={handleImageClick}>
                            <Image
                                source={image ? { uri: image } : require('../../../assets/download.jpeg')}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text>Nome do Estudo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do estudo"
                    />
                    <Text>Trilha do Estudo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a trilha do estudo(Casamento, Família, Jovens)"
                    />
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.undo,
                            actions.redo,
                            actions.setStrikethrough,
                            actions.heading1,
                            actions.insertOrderedList,
                            actions.insertBulletsList
                        ]}
                        iconMap={{ [actions.heading1]: handleHead }}
                        style={styles.toolbar}
                    />

                    <RichEditor
                        ref={richText}
                        onChange={(descriptionText) => {
                            // console.log('descriptionText:', descriptionText);
                        }}
                        style={styles.editor}
                    />

                    {/* Botão de Salvar */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 60,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    toolbar: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    editor: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        textAlign: 'justify',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius:5,
    },
});

export default NewStudies;
