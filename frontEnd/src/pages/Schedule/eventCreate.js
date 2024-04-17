import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const EventCreate = () => {
  const navigation = useNavigation();

  const [eventName, setEventName] = useState('');
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hour, setHour] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDateConfirm = date => {
    setInitDate(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  const handleTimeConfirm = time => {
    setHour(moment(time).format('HH:mm'));
    hideTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleCreateEvent = () => {
    const newEvent = {
      id: 1,
      church: 3,
      NameEvent: eventName,
      InitDate: initDate,
      EndDate: endDate,
      Hour: hour,
      Recoreency: false,
    };

    // Exibir alerta com opção de cancelar
    Alert.alert(
      'Confirmação',
      `Deseja criar o evento ${eventName} no dia ${initDate} às ${hour}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Evento criado:', newEvent);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Evento:</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={text => setEventName(text)}
      />
      <Text style={styles.label}>Data de Início:</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          value={initDate}
          editable={false}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Data do Fim:</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          value={endDate}
          editable={false}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Hora:</Text>
      <TouchableOpacity onPress={showTimePicker}>
        <TextInput
          style={styles.input}
          value={hour}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <Button title="Criar Evento" onPress={handleCreateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#555',
  },
});

export default EventCreate;
