import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import userData from '../Teams/cadastros.json';
import { useNavigation } from '@react-navigation/native';

const GroupCreationScreen = () => {
    const navigation = useNavigation();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [savedGroups, setSavedGroups] = useState([]);

    const usersData = userData.usuarios.filter(user => user.igreja === 'Igreja do Amor');

    const toggleUserSelection = (user) => {
        const index = selectedUsers.findIndex(u => u.nome === user.nome && u.sobrenome === user.sobrenome);
        if (index === -1) {
            setSelectedUsers([...selectedUsers, user]);
        } else {
            const updatedUsers = [...selectedUsers];
            updatedUsers.splice(index, 1);
            setSelectedUsers(updatedUsers);
        }
    };

    const handleSave = () => {
        if (groupName.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um nome para o grupo.');
            return;
        }

        if (selectedUsers.length <= 1) {
            Alert.alert('Erro', 'Selecione pelo menos dois participantes para criar o grupo.');
            return;
        }

        Alert.alert(
            'Confirmação',
            `Deseja criar o grupo "${groupName}" com os participantes selecionados?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        const sortedParticipants = selectedUsers.slice().sort((a, b) => {
                            const nameA = `${a.nome} ${a.sobrenome}`.toUpperCase();
                            const nameB = `${b.nome} ${b.sobrenome}`.toUpperCase();
                            return nameA.localeCompare(nameB);
                        });

                        const newGroup = {
                            groupName: groupName,
                            participants: sortedParticipants,
                        };

                        setSavedGroups([...savedGroups, newGroup]);
                        console.log('Grupo criado com sucesso:', newGroup);

                        setSelectedUsers([]);
                        setGroupName('');
                        navigation.goBack();
                    },
                },
            ],
        );
    };

    const sortedUsersData = usersData.slice().sort((a, b) => {
        const nameA = `${a.nome} ${a.sobrenome}`.toUpperCase();
        const nameB = `${b.nome} ${b.sobrenome}`.toUpperCase();
        return nameA.localeCompare(nameB);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Criar Grupo</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Grupo"
                value={groupName}
                onChangeText={text => setGroupName(text)}
            />
            <ScrollView style={styles.scrollView}>
                {sortedUsersData.map((user, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.userItem, selectedUsers.some(u => u.nome === user.nome && u.sobrenome === user.sobrenome) && styles.selectedUserItem]}
                        onPress={() => toggleUserSelection(user)}
                    >
                        <Text>{user.nome} {user.sobrenome}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Text style={styles.addButtonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    selectedUserItem: {
        backgroundColor: '#E0E0E0',
    },
    addButton: {
        backgroundColor: '#3498DB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 15,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default GroupCreationScreen;
