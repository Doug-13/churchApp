import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

// Dados de exemplo
const participantsData = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  datasets: [
    {
      data: [30, 35, 28, 32],
    },
  ],
};

const visitorsData = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  datasets: [
    {
      data: [5, 8, 10, 6],
    },
  ],
};

const averageData = 30; // Número médio de pessoas

const Indicators = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indicadores de Grupo de Crescimento</Text>
      
      <Text style={styles.subtitle}>Participantes</Text>
      <BarChart
        style={styles.chart}
        data={participantsData}
        width={300}
        height={200}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />

      <Text style={styles.subtitle}>Visitantes</Text>
      <LineChart
        style={styles.chart}
        data={visitorsData}
        width={300}
        height={200}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />

      <Text style={styles.subtitle}>Número Médio de Pessoas</Text>
      <Text style={styles.average}>{averageData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    marginTop: 10,
  },
  average: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default Indicators;
