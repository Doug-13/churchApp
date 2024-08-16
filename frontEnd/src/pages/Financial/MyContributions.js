import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});
const getMonthName = (monthIndex) => {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthIndex];
};

export default function MinhasOfertasScreen() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await api.get(baseURL +`financials/${user.id}`);
        console.log('Dados retornados:', response.data);

        if (response.data && Array.isArray(response.data.data)) {
          const eventosPorMes = {};
          response.data.data.forEach(evento => {
            const mes = new Date(evento.data).getMonth();
            if (!eventosPorMes[mes]) {
              eventosPorMes[mes] = [];
            }
            eventosPorMes[mes].push(evento);
          });

          setEvents(eventosPorMes);
          setLoading(false);
        } else {
          console.error('Erro: Dados retornados em formato inválido');
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
        setLoading(false);
      }
    };

    fetchOfertas();
  }, [user.id]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Minhas Ofertas</Text> */}
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        events.length === 0 ? (
          <Text style={styles.noRecordsText}>Sem registros para apresentar.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {Object.keys(events).map((mes, index) => (
              <View key={index} style={styles.monthContainer}>
                <Text style={styles.monthTitle}>{getMonthName(parseInt(mes))}</Text>
                {events[mes]?.map((oferta, index) => (
                  <View key={index} style={styles.offerContainer}>
                    <Text style={styles.offerText}>
                      <Text style={styles.bold}>Data Lançamento:</Text> {new Date(oferta.data_lancamento).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text style={styles.offerText}>
                      <Text style={styles.bold}>Valor:</Text> R$ {parseFloat(oferta.valor).toFixed(2)}
                    </Text>
                    <Text style={styles.offerText}>
                      <Text style={styles.bold}>Comentários:</Text> {oferta.comentarios}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  monthContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    width: '100%', // Largura ocupando toda a tela
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offerContainer: {
    marginBottom: 10,
  },
  offerText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  noRecordsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
