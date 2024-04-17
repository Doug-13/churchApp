import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Linking, Modal } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importe useFocusEffect
import { AuthContext } from '../../context/auth.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const Tab = createBottomTabNavigator();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedYear = year;

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

const fetchVisitors = async (churchId) => {
  try {
    console.log(`http://192.168.100.254:3006/api/visitors/visitors_list/`, churchId)
    const visitorsResponse = await api.get(baseURL +`visitors/visitors_list/${churchId}`);

    return visitorsResponse.data.data;
  } catch (error) {
    console.error('Error fetching visitors data:', error);
    throw new Error('Erro ao buscar visitantes');
  }
};


const FinanceiroScreen = () => (
  <View style={styles.centeredContainer}>
    <Text>Financeiro</Text>
  </View>
);

const VisitantesScreen = ({ churchId }) => {
  const [visitorsByDate, setVisitorsByDate] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(() => {
    const fetchVisitorsData = async () => {
      try {
        const data = await fetchVisitors(churchId);
        const groupedVisitors = groupVisitorsByDate(data);
        setVisitorsByDate(groupedVisitors);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };
    fetchVisitorsData();
  });

  const groupVisitorsByDate = (visitors) => {
    const grouped = {};
    visitors.forEach((visitor) => {
      const formattedDate = formatDate(visitor.data);
      if (grouped[formattedDate]) {
        grouped[formattedDate].push(visitor);
      } else {
        grouped[formattedDate] = [visitor];
      }
    });
    return grouped;
  };

  const callNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(visitorsByDate)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View key={item[0]}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{item[0]}</Text>
            </View>
            <FlatList
              data={item[1]}
              keyExtractor={(visitor) => visitor.id.toString()}
              renderItem={({ item: visitor }) => (
                <View style={styles.visitorItem}>
                  <View style={styles.visitorInfo}>
                    <Text style={styles.visitorName}>{visitor.nome}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    {visitor.whatsapp && (
                      <TouchableOpacity onPress={() => Linking.openURL(`whatsapp://send?phone=55${visitor.whatsapp}`)}>
                        <FontAwesome name="whatsapp" size={24} color="green" />
                      </TouchableOpacity>
                    )}
                    <View style={{ width: 30 }} />
                    {visitor.whatsapp && (
                      <TouchableOpacity onPress={() => callNumber(visitor.whatsapp)}>
                        <MaterialIcons name="phone" size={24} color="blue" />
                      </TouchableOpacity>
                    )}
                    <View style={{ width: 30 }} />
                  </View>
                </View>
              )}
            />
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Church ID: {churchId}</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CultReport = () => {
  const navigation = useNavigation();
  const [cultoReports, setCultoReports] = useState([]);
  const [expandedReportId, setExpandedReportId] = useState(null);
  const { churchData } = useContext(AuthContext);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const cultoResponse = await api.get(baseURL +`reports/${churchData.id}`);
        const visitorsResponse = await api.get(baseURL +`visitors/${churchData.id}`);

        const cultoData = cultoResponse.data.data;
        const visitorsData = visitorsResponse.data.data;

        const combinedReports = cultoData.map(report => {
          const visitors = visitorsData.filter(visitor => visitor.id_culto === report.id);
          console.log('Te liga',visitors)
          return {
            ...report,
            visitors: visitors,
          };

        });

        setCultoReports(combinedReports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchReports();
  }, [churchData.id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Relatórios</Text>
      <Tab.Navigator>
        <Tab.Screen name="Relatórios">
          {() => <ReportList cultoReports={cultoReports} expandedReportId={expandedReportId} setExpandedReportId={setExpandedReportId} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Visitantes">
          {() => <VisitantesScreen churchId={churchData.id} />}
        </Tab.Screen>
        <Tab.Screen name="Financeiro" component={FinanceiroScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const ReportList = ({ cultoReports, expandedReportId, setExpandedReportId, navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={cultoReports}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity
            style={styles.reportItem}
            onPress={() => {
              setExpandedReportId(expandedReportId === item.id ? null : item.id);
            }}
          >
            <Text style={styles.reportTitle}>Relatório {formatDate(item.data)}</Text>
            <Text style={styles.reportText}><Text style={styles.bold}>Tema:</Text> {item.tema}</Text>
            {expandedReportId === item.id ? (
              <>
                <Text style={styles.reportText}><Text style={styles.bold}>Hora:</Text> {item.hora}</Text>
                <Text style={styles.reportText}><Text style={styles.bold}>Participantes:</Text> {item.numero_presentes}</Text>
                <Text style={styles.reportText}><Text style={styles.bold}>Visitantes:</Text> {item.visitors.map(visitor => visitor.nome).join(', ')}</Text>
                <Text style={styles.reportText}><Text style={styles.bold}>Descrição:</Text> {item.comentarios}</Text>
                <TouchableOpacity onPress={() => setExpandedReportId(null)}>
                  <View style={[styles.viewMoreContainer, styles.centeredIcon, { borderWidth: 1, borderColor: 'black', borderRadius: 15 }]}>
                    <AntDesign name="minus" size={18} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('HandleAddReport', { report: item, isNewReport: false })}>
                  <View style={[styles.editButtonContainer, styles.centeredIcon]}>
                    <AntDesign name="edit" size={18} color="black" />
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => setExpandedReportId(item.id)}>
                <View style={[styles.viewMoreContainer, styles.centeredIcon, { borderWidth: 1, borderColor: 'black', borderRadius: 15 }]}>
                  <AntDesign name="plus" size={18} color="black" />
                </View>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      )}
    />
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate('HandleAddReport', { isNewReport: true })}
    >
      <AntDesign name="plus" size={28} color="white" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  reportList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  reportItem: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    padding: 12,
    elevation: 3,
  },
  visitorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    padding: 12,
    elevation: 3,
  },
  visitorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorName: {
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
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
  centeredIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 28,
    width: 28,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  divider: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  churchIdButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 10,
  },
  churchIdButtonText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CultReport;
