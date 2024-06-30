import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const EventEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;

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
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [cancelSwitch, setCancelSwitch] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      const response = await api.get(`events/listRecurringEvents/${eventId}`);
      const event = response.data.data[0]; // Ajuste para acessar os dados corretos

      console.log(event)
      setEventName(event.nome_evento);
      setInitDate(event.data_inicio_Form);
      setEndDate(event.data_fim_Form);
      setHour(event.hora_inicio);
      setEndHour(event.hora_fim);
      setLocal(event.local);
      setDetails(event.detalhes);
      setRecurrence(event.recorrencia);
      setCancelSwitch(event.ativo);

    } catch (error) {
      console.error('Erro ao buscar dados do evento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do evento. Por favor, tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    checkRecurringEvents(moment(initDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD'));
  }, [recurrence]);

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
    const currentDate = moment().format('YYYY-MM-DD');
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

  const handleInitTimeConfirm = time => {
    const selectedTime = moment(time).format('HH:mm');
    setHour(selectedTime);
    hideTimePicker();
  };

  const handleEndTimeConfirm = time => {
    const selectedTime = moment(time).format('HH:mm');
    setEndHour(selectedTime);
    hideEndTimePicker();
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

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };


  const handleUpdateEvent = async () => {
      try {
          // Verificar campos obrigatórios
          if (!initDate || !endDate || !hour) {
              Alert.alert('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.');
              return;
          }
  
          // Formatar as datas no formato 'YYYY-MM-DD'
          const formattedInitDate = moment(initDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
          const formattedEndDate = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
  
          // Preparar os dados do evento atualizado
          const updatedEvent = {
              data_inicio: formattedInitDate,
              data_fim: formattedEndDate,
              hora_inicio: hour,
              hora_fim: endHour || null,
              ativo: cancelSwitch ? 1 : 0,
          };
  
          console.log('Enviando dados do evento atualizado:', updatedEvent);
  
          // Enviar solicitação de atualização ao servidor
          const response = await api.put(`${baseURL}event/${eventId}`, updatedEvent);
  
          console.log('Resposta do servidor:', response);
  
          // Verificar o status da resposta
          if (response.status === 200 && response.data.success) {
              Alert.alert('Sucesso', response.data.message);
              // Realizar outras ações necessárias após o sucesso
          } else {
              throw new Error(response.data.message || 'Resposta inesperada do servidor');
          }
  
      } catch (error) {
          // Log detalhado do erro
          console.error('Erro ao atualizar evento:', error.message, error.response ? error.response.data : '');
  
          // Exibir mensagem de alerta de erro
          Alert.alert('Erro', `Ocorreu um erro ao atualizar o evento. Por favor, tente novamente mais tarde. Detalhes: ${error.message}`);
      }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar Evento <Text>{eventId}</Text></Text>
      </View>
      <View style={styles.containerInputs}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Cancelar:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={cancelSwitch ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setCancelSwitch}
            value={cancelSwitch}
          />
        </View>
        <Text style={styles.label}>Nome do Evento:</Text>
        <TextInput
          style={styles.inputInative}
          value={eventName}
          editable={false} // Making the field read-only
        />
        <Text style={styles.label}>Local:</Text>
        <TextInput
          style={styles.inputInative}
          value={local}
          editable={false} // Making the field read-only
        />
        <View style={styles.dateHour}>
          <Text style={styles.label}>{recurrence !== null && recurrence !== '' ? 'Data do Evento:' : 'Data do Evento:'}</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={[styles.input, styles.dateInput]}
              value={initDate}
              editable={false}
            />
          </TouchableOpacity>

        </View>
        <View style={styles.dateHour}>
          <Text style={styles.label}>Hora de Início:</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <TextInput
              style={styles.input}
              value={hour}
              editable={false}
            />
          </TouchableOpacity>
        </View>
        {recurrence !== null && recurrence !== '' && (
          <View style={styles.dateHour}>
            <View>
              <Text style={styles.label}>Data do Fim:</Text>
              <TouchableOpacity onPress={showEndDatePicker}>
                <TextInput
                  style={[styles.input, styles.dateInput]}
                  value={endDate}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>Hora do Fim:</Text>
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
          onConfirm={handleInitTimeConfirm}
          onCancel={hideTimePicker}
        />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />
        <Button title="Atualizar Evento" onPress={handleUpdateEvent} />
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
  inputInative: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
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
  dateHour: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default EventEdit;
