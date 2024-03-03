import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    groupName: 'Professores Infantis',
    members: ['Maria', 'João', 'Pedro']
  },
  {
    id: '2',
    groupName: 'Líderes',
    members: ['Ana', 'Carlos', 'Mariana']
  },
  {
    id: '3',
    groupName: 'Jovens',
    members: ['Lucas', 'Juliana', 'Rafael']
  },
];

const GroupScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.groupName}>{item.groupName}</Text>
      <Text style={styles.members}>{item.members.join(', ')}</Text>
    </View>
  );

  const InsertGroups = () => {
    // Implemente a navegação para a tela de lançamento de dados do culto
    navigation.navigate('InsertGroups');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grupos</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.addButton} onPress={InsertGroups}>
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
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  members: {
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
