import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Devotional = () => {
  const [devotional, setDevotional] = useState(null);

  useEffect(() => {
    const fetchDevotional = async () => {
      try {
        const devotionalData = require('../Devotional/devotional.json');
        // console.log('devotionalData:', devotionalData); // Verifica se o JSON foi carregado corretamente
  
        const currentDate = new Date();
        console.log(currentDate)
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Lembrando que os meses em JavaScript são baseados em zero
        // console.log('currentMonth:', currentMonth);
        // console.log('currentDay:', currentDay);
        console.log(currentDay)
        console.log(currentMonth)
        const currentDevotional = devotionalData[currentMonth][currentDay - 1];
        // console.log('currentDevotional:', currentDevotional); // Verifica o devocional para o dia atual
        console.log(currentDay)
        console.log(currentMonth)
        setDevotional(currentDevotional);
      } catch (error) {
        console.error('Erro ao carregar o devocional:', error);
      }
    };
  
    fetchDevotional();
  }, []);

  if (!devotional) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devocional Diário</Text>
      <Text style={styles.date}>{`${devotional.dia} de ${devotional.mes}`}</Text>
      <Text style={styles.text}>{devotional.texto}</Text>
      <Text style={styles.verse}>{devotional.versiculo}</Text>
      <Text style={styles.advice}>{devotional.conselho}</Text>
      <Text style={styles.author}>{devotional.autor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 10,
  },
  verse: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  advice: {
    fontWeight: 'bold',
  },
  author:{
    fontSize: 12,
    marginTop:20
  }
});

export default Devotional;
