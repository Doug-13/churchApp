import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
    baseURL,
});

const GroupCreationScreen = () => {
    const navigation = useNavigation();
    const { churchData, user } = useContext(AuthContext);
    const [peopleChurch, setPeopleChurch] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [leader, setLeader] = useState(null);
    const [viceLeader, setViceLeader] = useState(null);
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        const fetchChurches = async () => {
            try {
                const response = await api.get(baseURL + `users/church/${churchData.id}`);
                const responseData = response.data;

                if (responseData && responseData.data && responseData.data.length > 0) {
                    const pessoasOrdenadas = responseData.data.sort((a, b) => a.nome.localeCompare(b.nome));
                    setPeopleChurch(pessoasOrdenadas);
                } else {
                    console.error('Data array is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChurches();
    }, [churchData]);

    const toggleUserSelection = (user) => {
        const index = selectedUsers.findIndex(u => u.nome === user.nome && u.sobrenome === user.sobrenome);
        if (index === -1) {
            setSelectedUsers([...selectedUsers, user]);
        } else {
            const updatedUsers = [...selectedUsers];
            updatedUsers.splice(index, 1);
            setSelectedUsers(updatedUsers);
        }
    };

    const isLeaderOrViceLeader = (user) => {
        return (leader && leader.id === user.id) || (viceLeader && viceLeader.id === user.id);
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
            const sortedParticipants = selectedUsers.slice().sort((a, b) => {
                const nameA = `${a.nome} ${a.sobrenome}`.toUpperCase();
                const nameB = `${b.nome} ${b.sobrenome}`.toUpperCase();
                return nameA.localeCompare(nameB);
            });

            const newGroup = {
                nome_grupo: groupName,
                descricao_grupo: groupDescription,
                id_lider: leader && leader.id ? leader.id : null,
                id_vicelider: viceLeader && viceLeader.id ? viceLeader.id : null,
                id_criador: user.id,
                id_igreja: churchData.id,
                data_lancamento: new Date().toISOString(),
                endereco: endereco,
                bairro: bairro,
                numero: numero,
                cidade: cidade,
                estado: estado
            };

            // Enviar os dados do newGroup para o servidor
            const response = await api.post(baseURL + '/groups', newGroup);
            console.log('Response:', response.data);

            // Extrair o ID do grupo da resposta do servidor
            const { insertId } = response.data.results;

            // Resetar o estado e navegar de volta
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

            // Fazer o que quiser com o ID do grupo, como exibir no console
            console.log('ID do grupo:', insertId);
        } catch (error) {
            console.error('Error creating group:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao criar o grupo. Por favor, tente novamente.');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Criar Grupo</Text>
                <Text style={styles.label}>Nome do Grupo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Grupo"
                    value={groupName}
                    onChangeText={text => setGroupName(text)}
                />
                <Text style={styles.label}>Descrição do Grupo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descreva o objetivo do grupo"
                    value={groupDescription}
                    onChangeText={text => setGroupDescription(text)}
                />
                <Text style={styles.label}>Endereço:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Endereço"
                    value={endereco}
                    onChangeText={text => setEndereco(text)}
                />
                <Text style={styles.label}>Bairro:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Bairro"
                    value={bairro}
                    onChangeText={text => setBairro(text)}
                />
                <Text style={styles.label}>Número:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número"
                    value={numero}
                    onChangeText={text => setNumero(text)}
                />
                <Text style={styles.label}>Cidade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    value={cidade}
                    onChangeText={text => setCidade(text)}
                />
                <Text style={styles.label}>Estado:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Estado"
                    value={estado}
                    onChangeText={text => setEstado(text)}
                />
                <Text style={styles.label}>Líder:</Text>
                <Picker
                    selectedValue={leader}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setLeader(itemValue)}
                >
                    <Picker.Item label="Selecione o líder" value={null} />
                    {peopleChurch.map((user, index) => (
                        <Picker.Item label={`${user.nome} ${user.sobrenome}`} value={user} key={index} />
                    ))}
                </Picker>
                <Text style={styles.label}>Vice-Líder:</Text>
                <Picker
                    selectedValue={viceLeader}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setViceLeader(itemValue)}
                >
                    <Picker.Item label="Selecione o vice-líder" value={null} />
                    {peopleChurch.map((user, index) => (
                        <Picker.Item label={`${user.nome} ${user.sobrenome}`} value={user} key={index} />
                    ))}
                </Picker>
                <Text style={styles.label}>Escolha os membros do grupo:</Text>
                <ScrollView style={styles.scrollView}>
                    {peopleChurch.map((user, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.userItem,
                                selectedUsers.some(u => u.nome === user.nome && u.sobrenome === user.sobrenome) && styles.selectedUserItem,
                                isLeaderOrViceLeader(user) && styles.leaderOrViceLeaderItem // Novo estilo para líder ou vice-líder
                            ]}
                            onPress={() => toggleUserSelection(user)}
                        >
                            <Text style={isLeaderOrViceLeader(user) ? styles.leaderOrViceLeaderText : null}>{user.nome} {user.sobrenome}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                    <Text style={styles.addButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

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
    // Novo estilo para o texto do líder ou vice-líder
    leaderOrViceLeaderText: {
        fontWeight: 'bold', // Pode aplicar estilos adicionais para destacar o líder ou vice-líder
    },
    // Novo estilo para o item de líder ou vice-líder
    leaderOrViceLeaderItem: {
        backgroundColor: '#C0C0C0', // Pode mudar a cor ou adicionar estilos adicionais
    },
});

export default GroupCreationScreen;
