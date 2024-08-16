import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import { baseURL } from '../../../constants/url.js';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../../context/auth.js';

const api = axios.create({
  baseURL,
});

const EventCreate = () => {
  const navigation = useNavigation();
  const { user, churchData } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [eventName, setEventName] = useState('');
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hour, setHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [local, setLocal] = useState('');
  const [details, setDetails] = useState('');
  const [recurrence, setRecurrence] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    checkRecurringEvents(moment(initDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD'));
  }, [recurrence]);

  const handleDateConfirm = date => {
    const currentDate = moment().format('YYYY-MM-DD');
    const formattedDate = moment(date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');

    if (moment(formattedDate).isSameOrAfter(currentDate)) {
      const displayedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      setInitDate(displayedDate);
      setError(false);
      hideDatePicker();
    } else {
      Alert.alert('Erro', 'A data de início do evento deve ser igual ou posterior à data atual.', [
        {
          text: 'OK', onPress: () => {
            setError(true);
            setInitDate('');
            hideDatePicker();
          }
        }
      ]);
    }
  };

  const handleEndDateConfirm = date => {
    const formattedDate = moment(date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');

    if (moment(formattedDate).isSameOrAfter(initDate, 'day')) {
      const displayedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      setEndDate(displayedDate);

      hideEndDatePicker();
      checkRecurringEvents(moment(initDate, 'YYYY-MM-DD'), moment(displayedDate, 'YYYY-MM-DD'));

      const diffDays = moment(displayedDate, 'YYYY-MM-DD').diff(moment(initDate, 'YYYY-MM-DD'), 'days');
      if ((recurrence === 'diário' && diffDays > 32) || (recurrence === 'semanal' && diffDays > 184)) {
        Alert.alert(
          'Intervalo de Datas Excedido',
          `O intervalo de datas selecionado excede o limite permitido para ${recurrence === 'diário' ? 'eventos diários (30 dias)' : 'eventos semanais (6 meses)'
          }. Por favor, selecione um intervalo de datas menor.`,
          [{
            text: 'OK', onPress: () => {
              setError(true);
              setInitDate('');
              hideDatePicker();
            }
          }]
        );
        setEndDate('');
      }
    } else {
      Alert.alert('Erro', 'A data de término do evento deve ser igual ou posterior à data de início do evento.');
      setEndDate('');
    }
  };

  const checkRecurringEvents = (startDate, endDate) => {
    if (recurrence === 'diário' && startDate && endDate) {
      const diffDays = moment(endDate, 'YYYY-MM-DD').diff(moment(startDate, 'YYYY-MM-DD'), 'days');
      setIsRecurring(diffDays <= 30);
    } else if (recurrence === 'semanal' && startDate && endDate) {
      const diffDays = moment(endDate, 'YYYY-MM-DD').diff(moment(startDate, 'YYYY-MM-DD'), 'days');
      const diffWeeks = diffDays / 7;
      setIsRecurring(diffWeeks <= 26);
    } else {
      setIsRecurring(false);
    }
  };

  const handleInitTimeConfirm = time => {
    const selectedTime = moment(time).format('HH:mm');
    setHour(selectedTime);
    hideTimePicker();
  };

  const handleEndTimeConfirm = time => {
    const selectedTime = moment(time).format('HH:mm');
    setEndHour(selectedTime);
    hideEndDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleCreateEvent = async () => {
    const currentDate = moment().format('YYYY-MM-DD');

    if (
      eventName &&
      local &&
      initDate &&
      moment(initDate, 'YYYY-MM-DD', true).isValid() &&
      moment(initDate, 'YYYY-MM-DD').isSameOrAfter(currentDate) &&
      hour
    ) {
      try {
        const response = await api.post('events', {
          criado_por_id: user.id,
          igreja_id: churchData.id,
          nome_evento: eventName,
          local: local,
          data_inicio: moment(initDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
          data_fim: endDate ? moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : null,
          hora_inicio: hour,
          hora_fim: endHour || null,
          detalhes: details,
          recorrencia: recurrence,
        });
        console.log(response)
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
                console.log('Evento criado:', response.data);
                navigation.goBack();
              },
            },
          ]
        );
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao criar o evento. Por favor, tente novamente mais tarde.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Criar Evento</Text>
      </View>
      <View style={styles.containerInputs}>
        <Text style={styles.label}>Nome do Evento:</Text>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={text => setEventName(text)}
        />
        <Text style={styles.label}>Local:</Text>
        <TextInput
          style={styles.input}
          value={local}
          onChangeText={text => setLocal(text)}
        />
        <View style={styles.dateHour}>
          <Text style={styles.label}>{recurrence !== null && recurrence !== '' ? 'Data de Início:' : 'Data do Evento:'}</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={[styles.input, styles.dateInput]}
              value={initDate}
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
        </View>
        {recurrence !== null && recurrence !== 'Evento único' && (
          <View style={styles.dateHour}>
            <View>
              <Text style={styles.label}>Data do Fim (Opcional):</Text>
              <TouchableOpacity onPress={showEndDatePicker}>
                <TextInput
                  style={[styles.input, styles.dateInput]}
                  value={endDate}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>Hora do Fim (Opcional):</Text>
              <TouchableOpacity onPress={showTimePicker}>
                <TextInput
                  style={styles.input}
                  value={endHour}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.label}>Recorrência:</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Evento único',
            value: 'Evento único', // Alterado para o novo valor padrão
          }}
          onValueChange={value => setRecurrence(value)}
          items={[
            // { label: 'Evento único', value: 'Evento único' }, // Adicionado como uma opção
            { label: 'Diário', value: 'diário' },
            { label: 'Semanal', value: 'semanal' },
          ]}
          style={{
            inputAndroid: {
              ...styles.input,
              color: '#555',
            },
            inputIOS: {
              ...styles.input,
              color: '#555',
            },
            placeholder: {
              color: '#555',
            },
          }}
        />
        {isRecurring && (
          <Text style={styles.recurringMessage}>Serão criados eventos entre as datas selecionadas</Text>
        )}

        <Text style={styles.label}>Detalhes do Evento:</Text>
        <TextInput
          style={styles.input}
          value={details}
          onChangeText={text => setDetails(text)}
          multiline={true}
          numberOfLines={4}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={hideEndDatePicker}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={endDate ? handleEndTimeConfirm : handleInitTimeConfirm}
          onCancel={hideTimePicker}
        />
        <Button title="Criar Evento" onPress={handleCreateEvent} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  header: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerInputs: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  dateInput: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  timeInput: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  recurringMessage: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default EventCreate;
