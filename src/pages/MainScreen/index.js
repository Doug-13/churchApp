import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        {/* <Text style={styles.title}>Jeff, o programador do Reino</Text> */}
      </View>
      <View style={styles.containerForm}>
        <Image
          source={require('../../../assets/Mevam.jpg')}
          style={styles.image}
          resizeMode="contain"
        />

        <StatusBar style="auto" />

        <Text style={styles.churchName}>Mevam</Text>
        <View style={styles.schedule}>
          <Text style={styles.scheduleTitle}>Agenda</Text>
        </View>
        <View style={styles.containerSchedule}>

          <Text style={styles.textStyle}>17/02/2024 - Culto da família</Text>
          <Text style={styles.textStyle}>18/02/2024 - Culto de Oração</Text>
          <Text style={styles.textStyle}>22/02/2024 - Santa Ceia</Text>
          <Text style={styles.textStyle}>24/02/2024 - Culto de Libertação</Text>
          <Text style={styles.textStyle}>25/02/2024 - Culto da família</Text>
        </View>
        <View>
          <Text>Aniversariantes do mês</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d00f",
  },
  schedule: {
    marginTop: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
  },
  scheduleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  boxContainer: {
    flex: 1,
    backgroundColor: "#f3d00f",
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 350 / 2,
    borderColor: '#f3d00f',
    // border:3
    marginTop: -60,
  },
  churchName: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSchedule: {
    flex: 1,
    backgroundColor: "#F0FFFF",
    width: '100%',
    height: '20%',
    borderColor: '#0000'
    // border

  },
  textStyle: {
    fontSize: 15,
    marginTop: 10,

    justifyContent: 'center',
    alignItems: 'center',

  }
})