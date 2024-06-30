import React, { useState } from 'react';
import { Text, View, Button, TextInput, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionHistory from '../../pages/Financial/TransactionHistory';
import FinancialReleases from '../../pages/Financial/FinancialReleases';
import Balance from '../Financial/Balance';

const Tab = createMaterialTopTabNavigator();

const FluxoDeCaixaScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Lançamentos" component={FinancialReleases} />
      <Tab.Screen name="Histórico de Transações" component={TransactionHistory} />
      <Tab.Screen name="Saldo" component={Balance} />
    </Tab.Navigator>
  );
};

const LancamentosScreen = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [lancamentos, setLancamentos] = useState([]);

  const adicionarLancamento = () => {
    if (descricao && valor) {
      setLancamentos([...lancamentos, { descricao, valor: parseFloat(valor) }]);
      setDescricao('');
      setValor('');
    }
  };

  return (
    <View>
      <Text>Lançamentos</Text>
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <Button title="Adicionar Lançamento" onPress={adicionarLancamento} />
      <FlatList
        data={lancamentos}
        renderItem={({ item }) => (
          <View>
            <Text>{item.descricao}: R${item.valor}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const HistoricoTransacoesScreen = () => {
  return (
    <View>
      <Text>Histórico de Transações</Text>
    </View>
  );
};

export default FluxoDeCaixaScreen;
