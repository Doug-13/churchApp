import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNFS from 'react-native-fs'; // Importe o react-native-fs
import userData from '../Teams/cadastros.json'; // Importe os dados diretamente

const GroupCreationScreen = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState(''); // Estado para armazenar o nome do grupo
  const [usersData, setUsersData] = useState(userData.usuarios.filter(user => user.igreja === 'Igreja da Paz')); // Filtra apenas os usuários da Igreja da Paz

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

    if (selectedUsers.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos um participante para criar o grupo.');
      return;
    }

    const groupData = {
      nome: groupName,
      participantes: selectedUsers,
    };

    // Converta os dados do grupo para JSON
    const jsonData = JSON.stringify(groupData, null, 2);

    // Escreva os dados em um arquivo JSON
    const path = RNFS.DocumentDirectoryPath + '/groups.json'; // Caminho do arquivo
    RNFS.writeFile(path, jsonData, 'utf8')
      .then(() => {
        console.log('Arquivo JSON salvo com sucesso:', path);
        Alert.alert('Sucesso', 'O grupo foi salvo com sucesso.');
      })
      .catch(error => {
        console.error('Erro ao salvar o arquivo JSON:', error);
        Alert.alert('Erro', 'Houve um erro ao salvar o grupo. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Grupo</Text>
      {/* Componente TextInput para inserir o nome do grupo */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Grupo"
        value={groupName}
        onChangeText={text => setGroupName(text)} // Atualiza o estado do nome do grupo
      />
      <ScrollView style={styles.scrollView}>
        {usersData.map((user, index) => (
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
    backgroundColor: '#FFF',
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
    borderBottomColor: '#DDD',
  },
  selectedUserItem: {
    backgroundColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default GroupCreationScreen;
