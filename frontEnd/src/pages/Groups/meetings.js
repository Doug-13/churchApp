import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const Meeting = () => {
  const { selectedGroupId } = useContext(AuthContext);
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await api.get(`/presence/${selectedGroupId}`);
        const responseData = response.data;

        if (responseData.success && responseData.data && responseData.data.length > 0) {
          setGroupData(responseData.data);
        } else {
          console.error('Data is missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGroupData();
  }, [selectedGroupId]);

  const handleMeetingPress = (index) => {
    if (expandedMeeting === index) {
      setExpandedMeeting(null);
    } else {
      setExpandedMeeting(index);
    }
  };

  return (
    <View style={styles.container}>
      {groupData.map((meeting, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.meetingBlock, { backgroundColor: index % 2 === 0 ? '#E1ECF4' : '#D1E9E7' }]}
          onPress={() => handleMeetingPress(index)}
        >
          <Text style={styles.meetingTitle}><Text style={styles.boldText}>{meeting.data_reuniao}</Text></Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.boldText]}>Total de Participantes: </Text>
            <Text style={styles.detailText}>{parseInt(meeting.total_membros) + parseInt(meeting.total_visitantes)}</Text>
          </View>
          {expandedMeeting === index && (
            <View style={styles.detailsContainer}>

              <View style={styles.detailRow}>
                <Text style={[styles.detailText, styles.boldText]}>Membros Participantes:</Text>
              </View>
              {meeting.membros.split(',').map((membro, idx) => (
                <Text key={idx} style={styles.detailText}>- {membro.trim()}</Text>
              ))}
              <View style={styles.detailRow}>
                <Text style={[styles.detailText, styles.boldText]}>Visitantes:</Text>
              </View>
              {meeting.visitantes.split(',').map((visitante, idx) => (
                <Text key={idx} style={styles.detailText}>- {visitante.trim()}</Text>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  meetingBlock: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  meetingTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#2E4057',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#2E4057',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Meeting;
