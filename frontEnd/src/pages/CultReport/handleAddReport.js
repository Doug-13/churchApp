import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Platform, Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});
const HandleAddReport = ({ navigation, route }) => {
    const { churchData, user, updateReports, reports } = useContext(AuthContext);
    const { isNewReport, report } = route.params;
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [theme, setTheme] = useState('');
    const [preacher, setPreacher] = useState('');
    const [type, setType] = useState('');
    const [participants, setParticipants] = useState('');
    const [visitors, setVisitors] = useState('');
    const [description, setDescription] = useState('');
    const [visitorData, setVisitorData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Entrou no useEffect");
        if (!isNewReport && report) {
            console.log("Relatório existente:", report);
            setTheme(report.tema);
            setPreacher(report.pregador);
            setType(report.tipo_culto);
            setParticipants(report.numero_presentes.toString());
            setVisitors(report.numero_visitantes.toString());
            setDescription(report.comentarios);
            setDate(new Date(report.data));
            setTime(report.hora);
            setVisitorData(report.visitors);           
        }
    }, [report, isNewReport]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
        setShowTimePicker(false);
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
        setShowDatePicker(false);
    };

    const handleTimeChange = (event, selectedTime) => {
        const selectedHour = selectedTime.getHours();
        const selectedMinute = selectedTime.getMinutes();
        const formattedHour = selectedHour < 10 ? `0${selectedHour}` : selectedHour;
        const formattedMinute = selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute;
        const formattedTime = `${formattedHour}:${formattedMinute}`;
        setTime(formattedTime);
        setShowTimePicker(false);
    };

    const handleSaveData = async () => {
        try {
            console.log("Entrou em handleSaveData");
            setLoading(true);
    
            const formattedDate = date.toISOString().slice(0, 10); // Formatar data como 'AAAA-MM-DD'
            const cultData = {
                data: formattedDate,
                hora: time.trim(), // Remover espaços em branco
                tema: theme.trim(), // Remover espaços em branco
                pregador: preacher.trim(), // Remover espaços em branco
                tipo_culto: type.trim(), // Remover espaços em branco
                numero_presentes: participants.trim(), // Remover espaços em branco
                numero_visitantes: visitors.trim(), // Remover espaços em branco
                comentarios: description.trim(), // Remover espaços em branco
                id_criador: user.id,
                id_igreja: churchData.id,
            };
    
            console.log('Dados dos visitantes antes de salvar:', visitorData); // Adicione este console.log para verificar os dados dos visitantes antes de salvar
    
            let response;
            if (isNewReport) {
                response = await api.post(baseURL +`reports/${churchData.id}`, cultData);
                const insertedReport = response.data.results.insertId; // Ajuste aqui para acessar o ID do relatório
                console.log('Relatório salvo:', insertedReport);
                
                for (let i = 0; i < visitorData.length; i++) {
                    const visitor = visitorData[i];
                    const cultVisitorData = {
                        id_culto: insertedReport,
                        nome: visitor.nome.trim(),
                        whatsapp: visitor.whatsapp.trim()
                    };
                    
                    console.log(cultVisitorData, churchData.id);
                    
                    const visitorResponse = await api.post(baseURL +`visitors/${churchData.id}`, cultVisitorData);
                    console.log('Visitor saved:', visitorResponse.data);
                }
    
                // Atualizar a lista de relatórios
                updateReports([...reports, response.data]);
    
                setIsSaved(true);
                setTimeout(() => {
                    setIsSaved(false);
                    navigation.goBack();
                }, 1000);
            } else {
                console.log('Dados que serão enviados para atualização:', cultData);
                console.log('Endereço da solicitação:', `http://192.168.100.254:3006/api/report/${report.id}`);
                response = await api.put(baseURL +`report/${report.id}`, cultData);
                console.log('Dados:', cultData);
                const updatedReports = reports.map(rep => rep.id === report.id ? response.data : rep);
                updateReports(updatedReports);
                
                setIsSaved(true);
                setTimeout(() => {
                    setIsSaved(false);
                    navigation.goBack();
                }, 1000);
            }
    
        } catch (error) {
            console.error('Error saving cult data:', error);
            // Handle error as needed
        } finally {
            setLoading(false);
        }
    };

    const handleAddVisitorInfo = () => {
        const newVisitorData = [];
        for (let i = 0; i < visitorCount; i++) {
            newVisitorData.push({
                nome: '',
                whatsapp: ''
            });
        }
        setVisitorData(newVisitorData);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const renderVisitorInputs = () => {
        return visitorData.map((visitor, index) => (
            <View key={index}>
                <Text style={styles.label}>Visitante {index + 1}:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do visitante"
                    value={visitor.nome || ''}
                    onChangeText={(text) => handleVisitorNameChange(text, index)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="(xx) xxxxx-xxxx"
                    value={visitor.whatsapp || ''}
                    onChangeText={(text) => handleVisitorPhoneNumberChange(text, index)}
                    keyboardType="phone-pad"
                    maxLength={15}
                />
            </View>
        ));
    };
    
    const handleVisitorNameChange = (text, index) => {
        const newVisitorData = [...visitorData];
        newVisitorData[index].nome = text;
        setVisitorData(newVisitorData);
    };
    const handleVisitorPhoneNumberChange = (text, index) => {
        const cleanedPhoneNumber = text.replace(/\D/g, ''); // Remover todos os caracteres não numéricos
        const formattedPhoneNumber = cleanedPhoneNumber.length === 0 ? '' : `(${cleanedPhoneNumber.slice(0, 2)}) ${cleanedPhoneNumber.slice(2, 7)}-${cleanedPhoneNumber.slice(7, 11)}`; // Formatar como (xx) xxxxx-xxxx se o número não estiver vazio
    
        const newVisitorData = [...visitorData];
        newVisitorData[index].whatsapp = formattedPhoneNumber;
        setVisitorData(newVisitorData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Data do Culto:</Text>
                    <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
                        <Text style={styles.datePickerButtonText}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <Text style={styles.label}>Hora do culto:</Text>
                    <TouchableOpacity style={styles.datePickerButton} onPress={showTimepicker}>
                        <Text style={styles.datePickerButtonText}>{time || 'Selecionar Hora'}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                        />
                    )}
                    <Text style={styles.label}>Tipo do culto:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo do Culto"
                        value={type}
                        onChangeText={setType}
                    />
                    <Text style={styles.label}>Tema do Culto:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tema"
                        value={theme}
                        onChangeText={setTheme}
                    />

                    <Text style={styles.label}>Pregador:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do Pregador"
                        value={preacher}
                        onChangeText={setPreacher}
                    />
                    <Text style={styles.label}>Participantes:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="N° de Pessoas"
                        value={participants}
                        onChangeText={setParticipants}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Visitantes:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="N° de Visitantes"
                        value={visitors}
                        onChangeText={(text) => {
                            setVisitors(text);
                            setVisitorCount(parseInt(text));
                        }}
                        keyboardType="numeric"
                    />
                    {parseInt(visitors) > 0 && (
                        <TouchableOpacity onPress={handleAddVisitorInfo}>
                            <Text style={styles.visitorInfoButton}>Adicionar informações do visitante</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.visitorsContainer}>
                        {renderVisitorInputs()}
                    </View>
                    <Text style={styles.label}>Descrição:</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Descrição"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
                <Text style={styles.saveButtonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {renderVisitorInputs()}
                            <Button title="Salvar" onPress={handleModalClose} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
    },
    datePickerButtonText: {
        fontSize: 16,
        color: '#000',
    },
    visitorInfoButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    visitorsContainer: {
        marginBottom: 20,
    },
    descriptionInput: {
        height: 100,
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        margin: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        maxHeight: '80%',
        width: '80%',
    },
});

export default HandleAddReport;