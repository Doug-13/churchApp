import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Events from './events.json';
import EventCreate from './eventCreate';

const EventScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Filtrando os eventos da igreja 3
    const churchEvents = Events.filter(event => event.church === 3);
    
    // Ordenando os eventos pela data de início
    churchEvents.sort((a, b) => {
      const dateA = new Date(
        parseInt(a.InitDate.substring(6, 10)),
        parseInt(a.InitDate.substring(3, 5)) - 1,
        parseInt(a.InitDate.substring(0, 2))
      );
      const dateB = new Date(
        parseInt(b.InitDate.substring(6, 10)),
        parseInt(b.InitDate.substring(3, 5)) - 1,
        parseInt(b.InitDate.substring(0, 2))
      );
      return dateA - dateB;
    });

    setEvents(churchEvents);
  }, []);

  // Função para adicionar um novo evento
  const handleAddEvent = () => {
    // Navegar para a tela de criação de eventos
    navigation.navigate('EventCreate');
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.eventDetails}>
        <Text style={styles.title}>{item.NameEvent}</Text>
        <Text style={styles.date}>Data: {item.InitDate}</Text>
        <Text style={styles.subtitle}>Hora: {item.Hour}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Agenda</Text>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {/* Botão de adicionar eventos */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },
  eventDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a1b9a',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default EventScreen;
