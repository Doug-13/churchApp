import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MeetingData = [
  { id: 1, title: 'Reunião 1', details: 'Detalhes da Reunião 1' },
  { id: 2, title: 'Reunião 2', details: 'Detalhes da Reunião 2' },
  { id: 3, title: 'Reunião 3', details: 'Detalhes da Reunião 3' },
];

const Meeting = () => {
  const [expandedMeeting, setExpandedMeeting] = useState(null);

  const handleMeetingPress = (id) => {
    if (expandedMeeting === id) {
      setExpandedMeeting(null);
    } else {
      setExpandedMeeting(id);
    }
  };

  return (
    <View style={styles.container}>
      {MeetingData.map((meeting) => (
        <TouchableOpacity
          key={meeting.id}
          style={styles.meetingBlock}
          onPress={() => handleMeetingPress(meeting.id)}
        >
          <Text style={styles.meetingTitle}>{meeting.title}</Text>
          {expandedMeeting === meeting.id && (
            <Text style={styles.meetingDetails}>{meeting.details}</Text>
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
  },
  meetingBlock: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meetingDetails: {
    fontSize: 16,
    marginTop: 5,
    color: 'blue',
  },
});

export default Meeting;
