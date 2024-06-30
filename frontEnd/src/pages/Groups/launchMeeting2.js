import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, Platform } from 'react-native';
import axios from 'axios';
import CheckBox from '../../components/CheckBox2/index';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native'; 

const api = axios.create({
    baseURL,
});

const LaunchMeeting = () => {
    const { selectedGroupId } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState('');
    const [meeting, setMeeting] = useState({ membros: '', visitantes: '' });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [observations, setObservations] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newVisitorName, setNewVisitorName] = useState('');
    const [participants, setParticipants] = useState({});
    const [attendanceData, setAttendanceData] = useState({});
    const [selectedVisitorIds, setSelectedVisitorIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation(); 
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await api.get(`/pessoasGroups/${selectedGroupId}`);
                const visitorsresponse = await api.get(`/visitors/visitors_groups/${selectedGroupId}`);
                const responseData = response.data;
                const visitorsData = visitorsresponse.data;
                console.log('Dados de Membros:', responseData);
                console.log('Dados de visitorsresponse:', visitorsData); // Adicione esta linha para exibir os dados no console
    
                if (responseData.success && responseData.data && responseData.data.length > 0) {
                    setMeeting(responseData.data[0]);
                    const idsArray = responseData.data[0].ids_membros ? responseData.data[0].ids_membros.split(',') : [];
                    const membersArray = responseData.data[0].membros ? responseData.data[0].membros.split(',') : [];
                    const participantsObject = {};
                    membersArray.forEach((member, index) => {
                        participantsObject[member.trim()] = { id: idsArray[index], isMember: true };
                    });
                    const allVisitors = {};
                    responseData.data.forEach(meeting => {
                        const visitorsArray = meeting.visitantes ? meeting.visitantes.split(',') : [];
                        visitorsArray.forEach(visitante => {
                            if (visitante) {
                                const trimmedVisitor = visitante.trim();
                                allVisitors[trimmedVisitor] = true;
                            }
                        });
                    });
                    const uniqueVisitors = Object.keys(allVisitors);
                    setVisitors(uniqueVisitors);
                } else {
                    console.error('Data is missing');
                    Alert.alert('Dados ausentes');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Erro ao buscar dados da reunião.');
            }
        };
    
        fetchMeetingData();
    }, [selectedGroupId]);

    const refreshPage = () => {
        setSelectedDate('');
        setMeeting({ membros: '', visitantes: '' });
        setShowDatePicker(false);
        setObservations('');
        setShowModal(false);
        setNewVisitorName('');
        setParticipants({});
        setAttendanceData({});
        setSelectedVisitorIds([]);
        setLoading(false);
        setVisitors([]);
        
        fetchMeetingData();
    };

    const handleDateChange = (event, selectedDate) => {
        setSelectedDate(selectedDate || selectedDate);
        setShowDatePicker(Platform.OS === 'ios');
    };
    
    const clearFields = () => {
        setSelectedDate('');
        setObservations('');
        navigation.goBack();
        setParticipants(prevState => {
            const updatedParticipants = { ...prevState };
            Object.keys(updatedParticipants).forEach(participantName => {
                updatedParticipants[participantName].isChecked = false;
            });
            return updatedParticipants;
        });
        setSelectedVisitorIds([]);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleCheckBoxChange = (participantName) => {
        console.log('Nome do participante:', participantName);
        const participantData = participants[participantName];
        if (participantData && participantData.isMember) {
            console.log('O participante é um membro.');
            setAttendanceData(prevState => {
                const updatedAttendanceData = { ...prevState };
                updatedAttendanceData[participantData.id] = !updatedAttendanceData[participantData.id];
                return updatedAttendanceData;
            });
        } else if (participantData && !participantData.isMember) {
            console.log('O participante é um visitante.');
            setSelectedVisitorIds(prevState => {
                if (prevState.includes(participantName)) {
                    return prevState.filter(name => name !== participantName);
                } else {
                    return [...prevState, participantName];
                }
            });
        } else {
            console.log('Participante não encontrado.');
        }
    };
    


        

    const handleSaveAttendance = async () => {
        if (loading) {
            return;
        }
    
        setLoading(true);
    
        try {
            if (!selectedDate) {
                Alert.alert('Por favor, selecione a data da reunião.');
                setLoading(false);
                return;
            }
    
            const formattedDate = selectedDate.toISOString().slice(0, 10);
            
            const response = await api.post('/presence/meeting', {
                data_reuniao: formattedDate,
                observacao: observations,
                id_grupo: selectedGroupId
            });
    
            const insertedReport = response.data.results.insertId;
    
            const selectedMemberIds = Object.keys(attendanceData).filter(memberId => attendanceData[memberId]);
            const selectedMembers = selectedMemberIds.map(memberId => {
                if (meeting.ids_membros && meeting.membros) {
                    const memberIndex = meeting.ids_membros.split(',').indexOf(memberId);
                    return memberIndex !== -1 ? meeting.membros.split(',')[memberIndex] : null;
                }
                return null;
            });
    
            const selectedVisitors = Object.keys(participants).filter(participant => !participants[participant].isMember && selectedVisitorIds.includes(participant));
    
            const membersPromises = [];
            for (const memberId of selectedMemberIds) {
                const memberData = {
                    id_user: memberId,
                    nome_visitante: null,
                    id_reuniao: insertedReport
                };
                membersPromises.push(api.post('/presence/meeting/members', memberData));
            }
    
            const visitorsPromises = [];
            for (const visitorName of selectedVisitors) {
                const visitorData = {
                    id_user: null,
                    nome_visitante: visitorName,
                    id_reuniao: insertedReport
                };
                visitorsPromises.push(api.post('/presence/meeting/members', visitorData));
            }
    
            await Promise.all([...membersPromises, ...visitorsPromises]);
    
            setLoading(false);
            Alert.alert('Presença salva com sucesso!');
            clearFields();
        } catch (error) {
            console.error('Erro ao salvar a presença:', error);
            setLoading(false);
            Alert.alert('Erro ao salvar a presença. Por favor, tente novamente mais tarde.');
        }
    };

    const addVisitor = () => {
        const trimmedVisitorName = newVisitorName.trim();
        if (trimmedVisitorName) {
            setParticipants(prevState => ({
                ...prevState,
                [trimmedVisitorName]: { isMember: false }
            }));
            setMeeting(prevMeeting => ({
                ...prevMeeting,
                visitantes: `${prevMeeting.visitantes},${trimmedVisitorName}`
            }));
            setSelectedVisitorIds(prevState => [...prevState, trimmedVisitorName]);
            setShowModal(false);
            setNewVisitorName('');
        }
    };

    const hideDatePicker = () => {
        setShowDatePicker(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setSelectedDate(date);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Chamada de Presença</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
                <Text style={styles.datePickerButtonText}>{selectedDate ? selectedDate.toLocaleDateString() : "Selecione a Data da Reunião"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    locale="pt-br"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            )}
            <ScrollView style={styles.participantsList}>
                {/* Exibição dos dados de membros */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionHeading}>Membros Participantes:</Text>
                    {meeting.membros && meeting.membros.split(',').map((membro, idx) => (
                        <View key={idx} style={styles.participantRow}>
                            <CheckBox
                                options={[{ text: membro.trim(), id: membro.trim() }]}
                                onChange={() => handleCheckBoxChange(membro.trim())}
                            />
                        </View>
                    ))}
                    <Text style={styles.sectionHeading}>Visitantes:</Text>
                    {visitors.map((visitante, idx) => (
                        <View key={idx} style={styles.participantRow}>
                            <CheckBox
                                options={[{ text: visitante.trim(), id: visitante.trim() }]}
                                onChange={() => handleCheckBoxChange(visitante.trim())}
                            />
                        </View>
                    ))}
                    <Button title="Adicionar Visitante" onPress={() => setShowModal(true)} />
                </View>

                {/* Exibição dos dados de visitantes */}
                <Text style={styles.sectionHeading}>Observações:</Text>
                <TextInput
                    multiline
                    numberOfLines={6}
                    value={observations}
                    onChangeText={setObservations}
                    style={[styles.input, { height: 100 }]}
                />
            </ScrollView>
            <Button title="Salvar Presença" onPress={handleSaveAttendance} />
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeading}>Adicionar Visitante</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder="Nome do Visitante"
                            value={newVisitorName}
                            onChangeText={setNewVisitorName}
                            style={[styles.input, styles.modalInput]}
                        />
                        <Button title="Adicionar" onPress={addVisitor} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    participantsList: {
        width: '100%',
    },
    sectionHeading: {
        height: 30,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
    participantRow: {
        marginBottom: 5,
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
        elevation: 5,
        minWidth: 300,
    },
    modalHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    modalInput: {
        width: 300,
        marginBottom: 20,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    datePickerButtonText: {
        fontSize: 16,
        color: '#333',
    },
});

export default LaunchMeeting;
