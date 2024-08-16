import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, TextInput, Alert, Modal, Switch } from 'react-native';
import axios from 'axios';
import CheckBox from '../../components/CheckBox2';
import { AuthContext } from '../../context/auth';
import { baseURL } from '../../../constants/url';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const api = axios.create({
    baseURL,
});

const LaunchMeeting = () => {
    const { selectedGroupId } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [visitors, setVisitors] = useState([]);
    const [members, setMembers] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [observations, setObservations] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeVisitors, setActiveVisitors] = useState([]);
    const [inactiveVisitors, setInactiveVisitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const [showVisitorsModal, setShowVisitorsModal] = useState(false);
    const [showAddVisitorModal, setShowAddVisitorModal] = useState(false);
    const [newVisitorName, setNewVisitorName] = useState('');
    const [newVisitorWhatsapp, setNewVisitorWhatsapp] = useState('');

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await api.get(`/pessoasGroups/${selectedGroupId}`);
                const visitorsResponse = await api.get(`/visitors/visitors_groups/${selectedGroupId}`);
                const responseData = response.data.data;

                console.log('Response Data:', responseData);
                console.log('Visitors Response Data:', visitorsResponse.data);

                const visitorsDataActive = Array.isArray(visitorsResponse.data.data) ? visitorsResponse.data.data.filter(visitor => visitor.visibilidade === 1) : [];
                const visitorsDataInactive = Array.isArray(visitorsResponse.data.data) ? visitorsResponse.data.data.filter(visitor => visitor.visibilidade !== 1) : [];

                console.log('Filtered Visitors Data (Active):', visitorsDataActive);
                console.log('Filtered Visitors Data (Inactive):', visitorsDataInactive);

                setMembers(responseData);
                setVisitors(visitorsDataActive);
                setActiveVisitors(visitorsDataActive);
                setInactiveVisitors(visitorsDataInactive);

                // Inicializar o estado attendanceData apenas com os IDs dos membros e visitantes
                const initialAttendanceData = {};
                responseData.forEach(member => {
                    initialAttendanceData[member.id] = false;
                });
                visitorsDataActive.forEach(visitor => {
                    initialAttendanceData[visitor.id] = false;
                });
                setAttendanceData(initialAttendanceData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchMeetingData();
    }, [selectedGroupId]);

    const MODAL_TYPES = {
        DETAILS: 'details',
        EDIT_VISITORS: 'edit_visitors',
    };
    const [modalType, setModalType] = useState(null);

    const openVisitorsModal = () => {
        setShowVisitorsModal(true);
    };
    const openModal = () => {
        setShowModal(true);
    };
    const handleVisitorClick = (visitor) => {
        setSelectedVisitor(visitor);
        openVisitorsModal();
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const handleConfirm = (date) => {
        hideDatePicker();
        setSelectedDate(date);
    };
    const hideDatePicker = () => {
        setShowDatePicker(false);
    };
    const toggleVisibility = () => {
        const updatedVisitor = { ...selectedVisitor };
        updatedVisitor.visibilidade = updatedVisitor.visibilidade === 1 ? 0 : 1;
        setSelectedVisitor(updatedVisitor);
    };

    const handleCheckBoxChange = (memberId) => {
        setAttendanceData(prevAttendanceData => {
            return { ...prevAttendanceData, [memberId]: !prevAttendanceData[memberId] };
        });
    };

    const handleVisitorCheckBoxChange = (visitorId) => {
        setAttendanceData(prevAttendanceData => {
            return { ...prevAttendanceData, [visitorId]: !prevAttendanceData[visitorId] };
        });
    };

    const handleSaveAttendance = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            if (!selectedDate) {
                Alert.alert('Por favor, selecione a data da reunião.');
                return;
            }

            const formattedDate = selectedDate.toISOString().slice(0, 10);
            const selectedMembers = members.filter(member => attendanceData[member.id]);
            const selectedMembersInfo = selectedMembers.map(member => ({ id: member.id, nome: member.nome_completo }));
            console.log('IDs e nomes dos membros selecionados:', selectedMembersInfo);

            const selectedVisitors = visitors.filter(visitor => attendanceData[visitor.id]);
            const selectedVisitorsInfo = selectedVisitors.map(visitor => ({ id: visitor.id, nome: visitor.nome }));
            console.log('IDs e nomes dos visitantes selecionados:', selectedVisitorsInfo);

            const response = await api.post('/presence/meeting', {
                data_reuniao: formattedDate,
                observacao: observations,
                id_grupo: selectedGroupId
            });

            const insertedReport = response.data.results.insertId;

            const membersPromises = selectedMembers.map(member => {
                return api.post('/presence/meeting/members', {
                    id_user: member.id,
                    nome_visitante: null,
                    id_reuniao: insertedReport
                });
            });

            const visitorsPromises = selectedVisitors.map(visitor => {
                return api.post('/presence/meeting/members', {
                    id_user: null,
                    id_visitante: visitor.id,
                    id_reuniao: insertedReport
                });
            });

            await Promise.all([...membersPromises, ...visitorsPromises]);

            Alert.alert('Presença salva com sucesso!');
            // clearFields();
        } catch (error) {
            console.error('Erro ao salvar presença:', error);
            Alert.alert('Erro ao salvar presença');
        } finally {
            setLoading(false);
        }
    };


    const handleSaveChanges = async () => {
        try {
            console.log('Dados a serem salvos:', selectedVisitor);
            const dataToSend = {
                ...selectedVisitor,
                id_grupo: selectedGroupId
            };
            console.log('Dados a serem salvos:', dataToSend);
            await api.put(`/visitor/${selectedVisitor.id}`, dataToSend);
            Alert.alert('Alterações salvas com sucesso');



            const updatedVisitorsResponse = await api.get(`/visitors/visitors_groups/${selectedGroupId}`);
            const visitorsDataActive = Array.isArray(updatedVisitorsResponse.data.data) ? updatedVisitorsResponse.data.data.filter(visitor => visitor.visibilidade === 1) : [];
            const visitorsDataInactive = Array.isArray(updatedVisitorsResponse.data.data) ? updatedVisitorsResponse.data.data.filter(visitor => visitor.visibilidade !== 1) : [];
            setVisitors(visitorsDataActive);
            setActiveVisitors(visitorsDataActive);
            setInactiveVisitors(visitorsDataInactive);

            setShowVisitorsModal(false);
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            Alert.alert('Erro ao salvar alterações');
        }
    };

    const openAddVisitorModal = () => {
        setShowAddVisitorModal(true);
    };

    const handleAddVisitor = async () => {
        try {
            const newVisitorData = {
                nome: newVisitorName,
                whatsapp: newVisitorWhatsapp,
                id_grupo: selectedGroupId
            };

            await api.post(`/visitor/visitors_group/`, newVisitorData);

            setNewVisitorName('');
            setNewVisitorWhatsapp('');

            const updatedVisitorsResponse = await api.get(`/visitors/visitors_groups/${selectedGroupId}`);
            const visitorsDataActive = Array.isArray(updatedVisitorsResponse.data.data) ? updatedVisitorsResponse.data.data.filter(visitor => visitor.visibilidade === 1) : [];
            const visitorsDataInactive = Array.isArray(updatedVisitorsResponse.data.data) ? updatedVisitorsResponse.data.data.filter(visitor => visitor.visibilidade !== 1) : [];
            setVisitors(visitorsDataActive);
            setActiveVisitors(visitorsDataActive);
            setInactiveVisitors(visitorsDataInactive);

            setShowAddVisitorModal(false);
        } catch (error) {
            console.error('Erro ao adicionar visitante:', error);
            Alert.alert('Erro ao adicionar visitante');
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>Lista de Presença</Text>
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

                <Text style={styles.sectionTitle}>Membros:</Text>
                {members.map((member) => (
                    <View key={member.id} style={styles.memberRow}>
                        <CheckBox
                            options={[{ text: member.nome_completo, id: member.id }]}
                            onChange={() => handleCheckBoxChange(member.id)}
                            checked={attendanceData[member.id]}
                        />
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Visitantes:</Text>
                {visitors.map((visitor, index) => (
                    <View key={index} style={styles.visitorRow}>
                        <CheckBox
                            options={[{ text: visitor.nome, id: visitor.id }]}
                            onChange={() => handleVisitorCheckBoxChange(visitor.id)}
                        />
                    </View>
                ))}

                <TouchableOpacity style={styles.editButton} onPress={openModal}>
                    <Text style={styles.editButtonText}>Editar Visitantes</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Observações:</Text>
                <TextInput
                    multiline
                    numberOfLines={6}
                    value={observations}
                    onChangeText={setObservations}
                    style={[styles.input, { height: 100 }]}
                />
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAttendance}>
                <Text style={styles.saveButtonText}>Salvar Presença</Text>
            </TouchableOpacity>

            <Modal visible={showVisitorsModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.editVisitor}>
                        <Text style={styles.modalHeading}>Editar Visitante</Text>
                        {selectedVisitor && (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    value={selectedVisitor.nome}
                                    onChangeText={(text) => setSelectedVisitor({ ...selectedVisitor, nome: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedVisitor.whatsapp}
                                    onChangeText={(text) => setSelectedVisitor({ ...selectedVisitor, whatsapp: text })}
                                />
                                <View style={styles.visibilityContainer}>
                                    <Text style={styles.visitorName}>Visibilidade:</Text>
                                    <Switch
                                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} // Ajuste o tamanho aqui
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={selectedVisitor.visibilidade === 1 ? "#f4f3f4" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleVisibility}
                                        value={selectedVisitor.visibilidade === 1}
                                    />
                                </View>
                            </View>
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setShowVisitorsModal(false)}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>



            {/* Modal para editar visitantes */}
            <Modal visible={showModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Editar Visitantes</Text>
                        <Text style={styles.textEdit}>Clique no nome para editar</Text>
                        <View style={styles.active}>
                            <Text style={styles.modalSubheading}>Ativos:</Text>
                            {activeVisitors.map((visitor, index) => (
                                <TouchableOpacity key={index} onPress={() => handleVisitorClick(visitor)} style={styles.touchable}>
                                    <Text style={styles.visitorName}>{visitor.nome}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.inative}>
                            <Text style={styles.modalSubheading}>Inativos:</Text>
                            {inactiveVisitors.map((visitor, index) => (
                                <TouchableOpacity key={index} onPress={() => handleVisitorClick(visitor)} style={styles.touchable}>
                                    <Text style={styles.visitorName}>{visitor.nome}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={openAddVisitorModal}>
                            <Text style={styles.buttonText}>Adicionar Visitante</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={closeModal}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showAddVisitorModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Adicionar Visitante</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Visitante"
                            value={newVisitorName}
                            onChangeText={setNewVisitorName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="WhatsApp do Visitante"
                            value={newVisitorWhatsapp}
                            onChangeText={setNewVisitorWhatsapp}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title="Salvar" onPress={handleAddVisitor} />

                    </View>
                    <View style={styles.button}>

                        <Button title="Fechar" onPress={() => setShowAddVisitorModal(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // Estilos comuns
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    modalContent: {
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%', // Defina a largura do modal conforme necessário
    },
    textEdit: {
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom:10,
    },
    editVisitor: {
        backgroundColor: '#FFF7E0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%', // Defina a largura do modal conforme necessário
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
    },
    visibilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30, // Espaçamento inferior para separar dos outros elementos
    },
    visibilityIcon: {
        marginLeft: 5, // Margem à esquerda para separar o ícone do texto
    },
    modalFechar: {
        marginTop: 20, // Ajuste a margem conforme necessário
    },
    button: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Outros estilos
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
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
    modalSubheading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 10,
    },
    modalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    touchable: {
        marginBottom: 10,
    },
    active: {
        backgroundColor: '#b2f0b2',
        borderRadius: 10,
    },
    inative: {
        backgroundColor: '#ffcccc',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    visitorName: {
        marginLeft: 20,
    },

    container: {
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 50, // Adicionando espaço para o botão de salvar
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    memberRow: {
        marginBottom: 10,
    },
    visitorRow: {
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});




export default LaunchMeeting;
