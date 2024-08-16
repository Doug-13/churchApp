import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const Indicators = () => {
  const { selectedGroupId } = useContext(AuthContext);
  const [groupData, setGroupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await api.get(`/presence/${selectedGroupId}`);
        const { success, data } = response.data;

        if (success && data && data.length > 0) {
          setGroupData(data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [selectedGroupId]);

  const countMembersAndVisitorsByDate = () => {
    const counts = {};
    groupData.forEach((entry) => {
      const date = entry.data_reuniao;
      if (!counts[date]) {
        counts[date] = { members: 0, visitors: 0 };
      }
      counts[date].members += entry.total_membros;
      counts[date].visitors += entry.total_visitantes;
    });
    return counts;
  };

  const counts = countMembersAndVisitorsByDate();
  const doubleDates = Object.keys(counts);
  const members = doubleDates.map((date) => counts[date].members);
  const visitors = doubleDates.map((date) => counts[date].visitors);
  const total = doubleDates.map((date, index) => members[index] + visitors[index]);


  // Re-definindo doubleBarChartData
  const BarAll = {
    labels: doubleDates,
    datasets: [
      {
        data: total,
        color: () => '#1f77b4', // Azul para membros
        name: 'Membros',
      },

    ],
  };
  const barVisitors = {
    labels: doubleDates,
    datasets: [
      {
        data: visitors,
        color: () => '#1f77b4', // Azul para membros
        name: 'Membros',
      },
      {
        data: visitors,
        color: () => '#fffff', // Laranja para visitantes
        name: 'Visitantes',
      },
    ],
  };

  // Calculando as médias
  const averageMembers = (members.reduce((a, b) => a + b, 0) / members.length).toFixed(2);
  const averageVisitors = (visitors.reduce((a, b) => a + b, 0) / visitors.length).toFixed(2);
  const averageTotalParticipants = (
    (members.reduce((a, b) => a + b, 0) + visitors.reduce((a, b) => a + b, 0)) /
    doubleDates.length
  ).toFixed(2);

  const chartConfig = {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    decimalPlaces: 0, // Garante que os valores no eixo y sejam números inteiros
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <View style={styles.screnn}>
            <Text style={styles.title}>Média de Participantes:</Text>
            <Text>Média de Membros: {averageMembers}</Text>
            <Text>Média de Visitantes: {averageVisitors}</Text>
            <Text>Média Total de Participantes: {averageTotalParticipants}</Text>
            <View style={styles.graphic1}>
              <Text style={styles.title}>Total de Participantes</Text>
              <View style={styles.chartContainer}>
                <BarChart
                  data={BarAll}
                  width={350}
                  height={200}
                  fromZero={true}
                  yAxisInterval={1}
                  chartConfig={chartConfig}
                  withInnerLines={true}
                  showValuesOnTopOfBars={true}
                />
              </View>
            </View>

            <Text style={styles.title}>Número de Membros e Visitantes por Data</Text>
            <View style={styles.chartContainer}>
              <BarChart
                data={barVisitors}
                width={350}
                height={200}
                fromZero={true}
                yAxisInterval={2}
                chartConfig={chartConfig}
                withInnerLines={true}
                showValuesOnTopOfBars={true}
                barColors={barVisitors.datasets.map((ds) => ds.color())}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 300,
    width: '90%',
  },
  screnn: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphic1:{
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Indicators;
