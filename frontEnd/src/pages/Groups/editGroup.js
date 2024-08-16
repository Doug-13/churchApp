import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/auth';
import { baseURL } from '../../../constants/url';

const api = axios.create({
    baseURL,
});

const EditGroup = ({ route }) => {
    const { groupId } = route.params;
    const navigation = useNavigation();
    const { churchData, user } = useContext(AuthContext);
    const [peopleChurch, setPeopleChurch] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [leader, setLeader] = useState(null);
    const [viceLeader, setViceLeader] = useState(null);
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchChurchData = async () => {
        try {
            const response = await api.get(`/users/church/${churchData.id}`);
            const responseDataUsers = response.data;
            if (responseDataUsers && responseDataUsers.data) {
                const pessoasOrdenadas = responseDataUsers.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setPeopleChurch(pessoasOrdenadas);
            } else {
                console.error('Data array is missing');
            }
        } catch (error) {
            console.error('Error fetching church data:', error);
        }
    };

    const fetchGroupData = async () => {
        try {
            const response = await api.get(`/groups/grupo/${groupId}`);
            const responseData = response.data;

            if (responseData.success && responseData.data && responseData.data.length > 0) {
                const data = responseData.data[0];
                setGroupName(data.nome_do_grupo);
                setGroupDescription(data.descricao_grupo);
                setLeader(data.nome_do_lider ? { id: null, nome: data.nome_do_lider } : null);
                setViceLeader(data.nome_do_vice_lider ? { id: null, nome: data.nome_do_vice_lider } : null);
                setEndereco(data.endereco || '');
                setBairro(data.bairro || '');
                setNumero(data.numero || '');
                setCidade(data.cidade || '');
                setEstado(data.estado || '');
            } else {
                console.error('Group data is missing');
            }
        } catch (error) {
            console.error('Error fetching group data:', error);
        }
    };

    const fetchMembersData = async () => {
        try {
            const membersResponse = await api.get(`/pessoasGroups/${groupId}`);
            const membersData = membersResponse.data;
            console.log("Lista de Membros: ", membersData);
            setMembersData(membersData.data || []);

            // Seleciona automaticamente os membros atuais do grupo
            setSelectedUsers(membersData.data || []);
        } catch (error) {
            console.error('Error fetching members data:', error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchChurchData();
        await fetchGroupData();
        await fetchMembersData();
        setRefreshing(false);
    }, [churchData.id, groupId]);

    useEffect(() => {
        fetchChurchData();
    }, [churchData]);

    useEffect(() => {
        if (groupId) {
            fetchGroupData();
            fetchMembersData();
        }
    }, [groupId]);

    const toggleUserSelection = useCallback((user) => {
        setSelectedUsers(prevSelectedUsers => {
            const index = prevSelectedUsers.findIndex(u => u.id === user.id);
            if (index === -1) {
                return [...prevSelectedUsers, user];
            } else {
                return prevSelectedUsers.filter(u => u.id !== user.id);
            }
        });
    }, []);

    const isUserSelected = (user) => {
        return selectedUsers.some(selectedUser => selectedUser.id === user.id);
    };

    const isLeaderOrViceLeader = (user) => {
        return (leader && leader.nome === `${user.nome} ${user.sobrenome}`) || (viceLeader && viceLeader.nome === `${user.nome} ${user.sobrenome}`);
    };

    const handleSave = async () => {
        if (groupName.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um nome para o grupo.');
            return;
        }
    
        if (selectedUsers.length <= 1) {
            Alert.alert('Erro', 'Selecione pelo menos dois participantes para criar o grupo.');
            return;
        }
    
        try {
            // Obter os membros atuais do grupo do banco de dados
            const currentMembersResponse = await api.get(`/pessoasGroups/${groupId}`);
            const currentMembers = currentMembersResponse.data.data || [];
    
            // Filtrar os membros que já estão no grupo para evitar duplicidade
            const newMembers = selectedUsers.filter(selectedUser => 
                !currentMembers.some(currentMember => currentMember.id === selectedUser.id)
            );
    
            // if (newMembers.length === 0) {
            //     Alert.alert('Erro', 'Todos os usuários selecionados já estão no grupo.');
            //     return;
            // }
    
            const updatedGroup = {
                nome_grupo: groupName,
                descricao_grupo: groupDescription,
                id_lider: leader && leader.id ? leader.id : null,
                id_vicelider: viceLeader && viceLeader.id ? viceLeader.id : null,
                id_criador: user.id,
                id_igreja: churchData.id,
                data_lancamento: new Date().toISOString(),
                endereco,
                bairro,
                numero,
                cidade,
                estado
            };
    
            console.log('Dados do grupo a serem enviados:', updatedGroup);
            console.log(`/groups/${groupId}`);
            console.log('Usuários selecionados:', newMembers);
    
            const response = await api.put(`/groups/${groupId}`, updatedGroup);
            console.log('Response:', response.data);
    
            // Enviar os novos membros para o backend para serem adicionados ao grupo
            for (const member of newMembers) {
                await api.post(`/pessoasGroups/${groupId}/addMember`, { member_id: member.id });
            }
    
            setSelectedUsers([]);
            setGroupName('');
            setGroupDescription('');
            setLeader(null);
            setViceLeader(null);
            setEndereco('');
            setBairro('');
            setNumero('');
            setCidade('');
            setEstado('');
            navigation.goBack();
            console.log('Grupo atualizado:', response.data.data);
        } catch (error) {
            console.error('Error updating group:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao atualizar o grupo. Por favor, tente novamente.');
        }
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                <Text style={styles.header}>Editar Grupo</Text>
                <Text style={styles.label}>Nome do Grupo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Grupo"
                    value={groupName}
                    onChangeText={setGroupName}
                />
                <Text style={styles.label}>Descrição do Grupo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descreva o objetivo do grupo"
                    value={groupDescription}
                    onChangeText={setGroupDescription}
                />
                <Text style={styles.label}>Endereço:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Endereço"
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <Text style={styles.label}>Bairro:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Bairro"
                    value={bairro}
                    onChangeText={setBairro}
                />
                <Text style={styles.label}>Número:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número"
                    value={numero}
                    onChangeText={setNumero}
                />
                <Text style={styles.label}>Cidade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    value={cidade}
                    onChangeText={setCidade}
                />
                <Text style={styles.label}>Estado:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Estado"
                    value={estado}
                    onChangeText={setEstado}
                />
                <Text style={styles.label}>Líder:</Text>
                <Picker
                    selectedValue={leader ? leader.nome : null}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        const selectedLeader = peopleChurch.find(person => `${person.nome} ${person.sobrenome}` === itemValue);
                        setLeader(selectedLeader ? { id: selectedLeader.id, nome: `${selectedLeader.nome} ${selectedLeader.sobrenome}` } : null);
                    }}
                >
                    <Picker.Item label="Selecione o líder" value={null} />
                    {peopleChurch.map((user, index) => (
                        <Picker.Item
                            label={`${user.nome} ${user.sobrenome}`}
                            value={`${user.nome} ${user.sobrenome}`}
                            key={index}
                        />
                    ))}
                </Picker>

                <Text style={styles.label}>Vice-Líder:</Text>
                <Picker
                    selectedValue={viceLeader ? viceLeader.nome : null}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        const selectedViceLeader = peopleChurch.find(person => `${person.nome} ${person.sobrenome}` === itemValue);
                        setViceLeader(selectedViceLeader ? { id: selectedViceLeader.id, nome: `${selectedViceLeader.nome} ${selectedViceLeader.sobrenome}` } : null);
                    }}
                >
                    <Picker.Item label="Selecione o vice-líder" value={null} />
                    {peopleChurch.map((user, index) => (
                        <Picker.Item
                            label={`${user.nome} ${user.sobrenome}`}
                            value={`${user.nome} ${user.sobrenome}`}
                            key={index}
                        />
                    ))}
                </Picker>

                <Text style={styles.label}>Participantes do grupo:</Text>
                <View>
                    <ScrollView style={styles.scrollView}>
                        {peopleChurch.map((user, index) => {
                            const isSelected = isUserSelected(user);
                            const isLeaderOrVice = isLeaderOrViceLeader(user);

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.userItem,
                                        isSelected && styles.selectedUserItem,
                                        isLeaderOrVice && styles.leaderOrViceLeaderItem
                                    ]}
                                    onPress={() => toggleUserSelection(user)}
                                >
                                    <Text style={isLeaderOrVice ? styles.leaderOrViceLeaderText : styles.userText}>
                                        {user.nome} {user.sobrenome}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                    <Text style={styles.addButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    selectedUserItem: {
        backgroundColor: '#f3d00f',
    },
    addButton: {
        marginBottom:20,
        backgroundColor: '#3498DB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 15,

    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    picker: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderColor: '#CCCCCC',
        borderWidth: 1,
    },
    leaderOrViceLeaderText: {
        fontWeight: 'bold',
    },
    leaderOrViceLeaderItem: {
        backgroundColor: '#3498DB',
    },
    userText: {
        color: '#000',
    },
});

export default EditGroup;
