import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const GroupScreen = ({ navigation }) => {
  const [groupData, setGroupData] = useState([]);
  const { churchData, setSelectedGroupId } = useContext(AuthContext); // Obtendo setSelectedGroupId do contexto

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('groups/' + churchData.id);
        const responseData = response.data;
        if (responseData && responseData.data && responseData.data.length > 0) {
          setGroupData(responseData.data);
        } else {
          console.error('Data array is missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchGroups();
  }, [churchData]);

  const handleGroupPress = (groupId) => {
    setSelectedGroupId(groupId); // Definindo o id_grupo selecionado
    navigation.navigate('MainTabNavigator', { screen: 'GroupDetails' });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleGroupPress(item.id_grupo)}
    >
      <Text style={styles.nome_grupo}>{item.nome_grupo}</Text>
      <Text style={styles.nome_lider}>
        <Text style={styles.bold}>Líder:</Text> {item.nome_lider}
      </Text>
      <Text style={styles.descricao_grupo}>
        <Text style={styles.bold}>Descrição do Grupo:</Text> {item.descricao_grupo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grupos</Text>
      <FlatList
        data={groupData}
        renderItem={renderItem}
        keyExtractor={item => item.id_grupo.toString()} // Using ID as the unique key
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('InsertGroups')}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nome_grupo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  nome_lider: {
    fontSize: 16,
    color: '#666',
  },
  descricao_grupo: {
    fontSize: 16,
    color: '#666',
  },
  flatList: {
    flexGrow: 0,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
});

export default GroupScreen;
