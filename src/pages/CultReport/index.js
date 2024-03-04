import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const CultReport = () => {
  const navigation = useNavigation();
  const [cultoReports, setCultoReports] = useState([
    {
      id: 1,
      date: '20/02/2024',
      theme: 'Louvor e Adoração',
      participants: 50,
      visitors: 10,
      children: 15,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam eros eget velit rutrum, at venenatis velit accumsan.',
    },
    // Adicione mais relatórios aqui conforme necessário
  ]);

  // Função para adicionar um novo relatório de culto
  const handleAddReport = () => {
    // Implemente a navegação para a tela de lançamento de dados do culto
    navigation.navigate('HandleAddReport');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Relatórios</Text>
      <ScrollView>
        {/* Lista de relatórios de culto */}
        <View style={styles.reportList}>
          {cultoReports.map(report => (
            <View key={report.id} style={styles.reportItem}>
              <Text style={styles.reportTitle}>Relatório de Culto - {report.date}</Text>
              <Text style={styles.reportText}><Text style={styles.bold}>Tema:</Text> {report.theme}</Text>
              <Text style={styles.reportText}><Text style={styles.bold}>Participantes:</Text> {report.participants}</Text>
              <Text style={styles.reportText}><Text style={styles.bold}>Visitantes:</Text> {report.visitors}</Text>
              <Text style={styles.reportText}><Text style={styles.bold}>Crianças:</Text> {report.children}</Text>
              <Text style={styles.reportText}><Text style={styles.bold}>Descrição:</Text> {report.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Botão flutuante para adicionar novo relatório */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddReport}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  reportList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  reportItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reportText: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CultReport;
