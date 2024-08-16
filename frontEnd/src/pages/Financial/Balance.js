import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

const Balance = () => {
    const { user, churchData } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState(null);

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const response = await api.get(baseURL +`financials/church/${churchData.id}`);
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

    const calcularTotalPorTipo = (tipo, mes) => {
        let total = 0;
        if (Array.isArray(events[mes])) {
            events[mes].forEach(evento => {
                if (evento.tipo === tipo) {
                    total += parseFloat(evento.valor);
                }
            });
        }
        return total;
    };

    const totalEntradas = () => {
        let total = 0;
        Object.keys(events).forEach(mes => {
            total += calcularTotalPorTipo('Entrada', mes);
        });
        return total;
    };

    const totalSaidas = () => {
        let total = 0;
        Object.keys(events).forEach(mes => {
            total += calcularTotalPorTipo('Saída', mes);
        });
        return total;
    };

    const renderSaldo = (saldo) => {
        if (saldo > 0) {
            return (
                <Text style={[styles.totalText, { color: 'green', fontWeight: 'bold' }]}>Saldo: R$ {saldo.toFixed(2)}</Text>
            );
        } else if (saldo < 0) {
            return (
                <Text style={[styles.totalText, { color: 'red', fontWeight: 'bold' }]}>Saldo: R$ {saldo.toFixed(2)}</Text>
            );
        } else {
            return (
                <Text style={styles.totalText}>Saldo: R$ {saldo.toFixed(2)}</Text>
            );
        }
    };

    const handleMonthSelect = (month) => {
        if (selectedMonth === month) {
            // Se o mês selecionado for o mesmo que o clicado, fecha o container
            setSelectedMonth(null);
        } else {
            // Caso contrário, define o mês selecionado para abrir o container
            setSelectedMonth(month);
        }
        setSelectedEventType(null);
    };

    const handleEventTypeSelect = (eventType) => {
        setSelectedEventType(eventType);
    };

    const renderEventList = (tipo, mes) => {
        const filteredEvents = events[mes].filter(evento => evento.tipo === tipo);
        return filteredEvents.map((evento, index) => (
            <TouchableOpacity key={index} onPress={() => handleEventTypeSelect(evento)}>
                <View style={[styles.eventItem, tipo === 'Entrada' ? styles.entryBackground : styles.exitBackground]}>
                    <Text style={styles.eventText}>{evento.descricao}</Text>
                    <Text style={styles.eventText}>{evento.valor}</Text>
                </View>
            </TouchableOpacity>
        ));
    };

    const renderSelectedEventType = () => {
        if (!selectedEventType) return null;
        return (
            <View style={styles.selectedEventContainer}>
                <Text style={styles.selectedEventText}>{selectedEventType.descricao}</Text>
                <Text style={styles.selectedEventText}>{selectedEventType.valor}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                events.length === 0 ? (
                    <Text style={styles.noRecordsText}>Sem registros para apresentar.</Text>
                ) : (
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.totalContainer}>
                            {renderSaldo(totalEntradas() - totalSaidas())}
                            <Text style={styles.totalText}>Total de Entradas: R$ {totalEntradas().toFixed(2)}</Text>
                            <Text style={styles.totalText}>Total de Saídas: R$ {totalSaidas().toFixed(2)}</Text>
                        </View>
                        {Object.keys(events).map((mes, index) => (
                            <TouchableOpacity key={index} onPress={() => handleMonthSelect(mes)}>
                                <View style={[styles.monthContainer, { backgroundColor: '#fff' }]}>
                                    <Text style={styles.monthTitle}>{getMonthName(parseInt(mes))}</Text>
                                    <View style={styles.totalContainer}>
                                        <Text style={[(calcularTotalPorTipo('Entrada', mes) - calcularTotalPorTipo('Saída', mes)) > 0 ? { color: 'green', fontWeight: 'bold' } : (calcularTotalPorTipo('Entrada', mes) - calcularTotalPorTipo('Saída', mes)) < 0 ? { color: 'red', fontWeight: 'bold' } : {}, styles.totalText]}>Saldo: R$ {(calcularTotalPorTipo('Entrada', mes) - calcularTotalPorTipo('Saída', mes)).toFixed(2)}</Text>
                                        <Text style={styles.totalText}>Total de Entradas: R$ {calcularTotalPorTipo('Entrada', mes).toFixed(2)}</Text>
                                        <Text style={styles.totalText}>Total de Saídas: R$ {calcularTotalPorTipo('Saída', mes).toFixed(2)}</Text>
                                        {selectedMonth === mes && (
                                            <>
                                                <Text style={styles.eventListTitle}>Entradas:</Text>
                                                {renderEventList('Entrada', mes)}
                                                <Text style={styles.eventListTitle}>Saídas:</Text>
                                                {renderEventList('Saída', mes)}
                                            </>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                        {renderSelectedEventType()}
                    </ScrollView>
                )
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    monthContainer: {
        marginBottom: 20,
        borderRadius: 8,
        padding: 12,
        width: '100%', // Largura ocupando toda a tela
    },
    monthTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noRecordsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    scrollView: {
        flex: 1,
    },
    totalContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    totalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    eventText: {
        fontSize: 16,
    },
    entryBackground: {
        backgroundColor: '#c8e6c9', // Fundo verde para entradas
    },
    exitBackground: {
        backgroundColor: '#ffcdd2', // Fundo vermelho para saídas
    },
    selectedEventContainer: {
        padding: 10,
        backgroundColor: '#eee',
        marginTop: 20,
    },
    selectedEventText: {
        fontSize: 16,
    },
});

export default Balance;
