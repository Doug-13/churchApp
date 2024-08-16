import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const LancamentosFinanceiros = () => {
    const { churchData, user } = useContext(AuthContext);
    const [lancamentos, setLancamentos] = useState([]);
    const [valor, setValor] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('');
    const [tipoContribuicao, setTipoContribuicao] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [dataLancamento, setDataLancamento] = useState(new Date());
    const [nomeOfertante, setNomeOfertante] = useState('');
    const [selectedOfferorId, setSelectedOfferorId] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [peopleChurch, setPeopleChurch] = useState([]);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        const fetchChurches = async () => {
            try {
                const response = await api.get(baseURL +`users/church/${churchData.id}`);
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
    }, [churchData.id]);

    const handleOfertanteSelection = (itemValue) => {
        setNomeOfertante(itemValue);

        const selectedOfferor = peopleChurch.find(person => `${person.nome} ${person.sobrenome}` === itemValue);
        if (selectedOfferor) {
            setSelectedOfferorId(selectedOfferor.id);
            console.log('Selected offeror:', selectedOfferor);
            return selectedOfferor;
        } else {
            console.log('Offeror not found:', itemValue);
            return null;
        }
    };

    const confirmarAdicaoLancamento = () => {
        if (!valor || !tipoLancamento || !dataLancamento) {
            Alert.alert(
                "Campos Obrigatórios",
                "Por favor, preencha todos os campos obrigatórios.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        Alert.alert(
            "Confirmar",
            "Tem certeza que deseja adicionar este lançamento?",
            [
                { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "Confirmar", onPress: adicionarLancamento }
            ]
        );
    };

    const adicionarLancamento = async () => {
        try {
            const formattedData = dataLancamento.toISOString().split('T')[0];

            const novoLancamento = {
                data: formattedData,
                tipo: tipoLancamento || 'Não especificado',
                tipo_contribuicao: tipoContribuicao || 'Não especificado',
                valor: parseFloat(valor) || 0,
                id_ofertante: selectedOfferorId,
                comentarios: comentarios || 'Sem comentários',
                descricao: descricao || 'Sem descrição',
                id_church: churchData.id,
                id_criador: user.id
            };

            console.log('New entry:', novoLancamento);

            const response = await api.post(baseURL +`financials/${churchData.id}`, novoLancamento);

            setLancamentos([...lancamentos, response.data]);

            setValor('');
            setTipoLancamento('');
            setTipoContribuicao('');
            setComentarios('');
            setDescricao('');
            setDataLancamento(new Date());
            setNomeOfertante('');
            setSelectedOfferorId(null);

            console.log('New entry added successfully:', response.data);

            Alert.alert(
                "Sucesso",
                "O lançamento foi realizado com sucesso.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } catch (error) {
            console.error('Error adding new entry:', error);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setDataLancamento(date);
    };

    const formatarData = (date) => {
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();
        return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lançamentos Financeiros</Text>
            <TextInput
                style={styles.input}
                placeholder="Valor"
                keyboardType="numeric"
                value={valor}
                onChangeText={text => setValor(text)}
            />
            <Picker
                selectedValue={tipoContribuicao}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setTipoContribuicao(itemValue)}>
                <Picker.Item label="Selecione o tipo de contribuição" value="" />
                <Picker.Item label="Oferta" value="Oferta" />
                <Picker.Item label="Dízimo" value="Dízimo" />
                <Picker.Item label="Outro" value="Outro" />
            </Picker>
            <Picker
                selectedValue={tipoLancamento}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setTipoLancamento(itemValue)}>
                <Picker.Item label="Selecione o tipo de lançamento" value="" />
                <Picker.Item label="Entrada" value="Entrada" />
                <Picker.Item label="Saída" value="Saída" />
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Comentários"
                value={comentarios}
                onChangeText={text => setComentarios(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={text => setDescricao(text)}
            />
            <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.dateInput}>{dataLancamento ? formatarData(dataLancamento) : "Selecionar Data do Lançamento"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={dataLancamento}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Picker
                style={styles.input}
                selectedValue={nomeOfertante}
                onValueChange={(itemValue, itemIndex) => {
                    setNomeOfertante(itemValue);
                    handleOfertanteSelection(itemValue);
                }}>
                <Picker.Item label="Selecione o ofertante" value="" />
                {peopleChurch.map((person, index) => (
                    <Picker.Item key={index} label={`${person.nome} ${person.sobrenome}`} value={`${person.nome} ${person.sobrenome}`} />
                ))}
            </Picker>
            <Button title="Adicionar Lançamento" onPress={confirmarAdicaoLancamento} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    picker: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',

    },
    dateInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
    },
});

export default LancamentosFinanceiros;
