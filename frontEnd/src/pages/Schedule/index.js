import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { baseURL } from '../../../constants/url.js';
import { AuthContext } from '../../context/auth.js';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const api = axios.create({
  baseURL,
});

const EventScreen = ({ navigation }) => {
  const { churchData } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [eventsByMonth, setEventsByMonth] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedGrouptId, setSelectedGrouptId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`events/list/${churchData.id}`);
        const responseData = response.data;
        if (responseData && responseData.data && responseData.data.length > 0) {
          setEvents(responseData.data);
        } else {
          console.error('Data array is missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchEvents();
  }, [churchData]);

  useEffect(() => {
    const organizeEventsByMonth = () => {
      const eventsByMonthObj = {};
      events.forEach(event => {
        const [day, month, year] = event.data_inicio_Rec.split('/').map(Number);
        const monthYear = `${year}-${month}`; // Mês e ano como string no formato 'YYYY-MM'
        if (!eventsByMonthObj[monthYear]) {
          eventsByMonthObj[monthYear] = [];
        }
        eventsByMonthObj[monthYear].push(event);
      });

      const eventsByMonthArray = Object.entries(eventsByMonthObj);
      setEventsByMonth(eventsByMonthArray);
    };

    organizeEventsByMonth();
  }, [events]);

  const isNextWeek = (date) => {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return date > today && date <= nextWeek;
  };

  const formatEventDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${day}/${month}/${year}`; // Modifique conforme necessário para o formato desejado
  };

  const handleShowDetails = (event, id_evento, id_recorrencia) => {
    setSelectedEventId(id_recorrencia);
    setSelectedGrouptId(id_evento);
    setShowEditOptions(true);
  };

  const handleEditEvent = (eventId) => {
    console.log('Editing Event:', eventId);
    navigation.navigate('EventEdit', { eventId: eventId });
  };

  const handleEditOptionSelected = (editGroup) => {
    if (editGroup) {
      console.log('Editing Group:', selectedGrouptId);
      navigation.navigate('EventGroupEdit', { groupId: selectedGrouptId });
    } else {
      console.log('Editing Event:', selectedEventId);
      handleEditEvent(selectedEventId);
    }

    setShowEditOptions(false);
  };

  const closeModal = () => {
    setShowEditOptions(false);
  };

  const renderHelpModal = () => {
    return (
      <Modal
        visible={showHelpModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajuda</Text>
            <Text style={styles.modalText}>Clique em um evento para editá-lo.</Text>
            <Button title="Fechar" onPress={() => setShowHelpModal(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({ item }) => {
    const eventDate = new Date(item.data_inicio_Rec);
    const nextWeekMarker = isNextWeek(eventDate) ? <View style={styles.nextWeekMarker} /> : null;

    return (
      <TouchableOpacity style={styles.item} onPress={() => handleShowDetails(item, item.id_evento, item.id_recorrencia)}>
        <View style={styles.eventDetails}>
          <Text style={styles.title}>{item.nome_evento}</Text>
          <Text style={styles.date}>Data: {formatEventDate(item.data_inicio_Rec)}</Text>
          <Text style={styles.subtitle}>Hora: {item.hora_inicio}</Text>
          <Text style={styles.subtitle}>Detalhes: {item.detalhes}</Text>
          <Text style={styles.subtitle}>id grupo: {item.id_evento}</Text>
          <Text style={styles.subtitle}>id evento: {item.id_recorrencia}</Text>
          {nextWeekMarker}
        </View>
      </TouchableOpacity>
    );
  };

  const renderMes = ({ item }) => {
    const [monthYear, events] = item;
    const [year, monthIndex] = monthYear.split('-').map(Number);
    const monthName = getMonthName(monthIndex);

    return (
      <View style={styles.mesContainer}>
        <Text style={styles.mesTitle}>{`${monthName} ${year}`}</Text>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    );
  };

  const getMonthName = (monthIndex) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthIndex - 1];
  };

  const handleAddEvent = () => {
    navigation.navigate('EventCreate');
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Agenda</Text>
        <TouchableOpacity onPress={() => setShowHelpModal(true)}>
          <FontAwesomeIcon name="question-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventsByMonth}
        renderItem={renderMes}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={showEditOptions}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar</Text>
            <Text style={styles.modalText}>Deseja editar o grupo de eventos ou apenas o evento selecionado?</Text>
            <View style={styles.modalButtons}>
              {selectedEventId === '-' ? (
                <Button title="Editar Evento" onPress={() => handleEditOptionSelected(true, selectedEventId)} />
              ) : (
                <Button title="Editar Grupo" onPress={() => handleEditOptionSelected(true, selectedEventId)} />
              )}
              {selectedEventId !== '-' && (
                <Button title="Editar Evento" onPress={() => handleEditOptionSelected(false, selectedGrouptId)} />
              )}
            </View>
          </View>
        </View>

      </Modal>
      {renderHelpModal()}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  nextWeekMarker: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
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
  details: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
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
  mesContainer: {
    marginBottom: 20,
  },
  mesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default EventScreen;
