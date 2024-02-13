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
        <Text style={styles.title}>Agenda</Text>
        <View style={styles.containerSchedule}>
         
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d00f",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    alignItems: 'center'
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
    marginTop: -60
  },
  churchName: {
    fontSize: 30,
    marginTop: 20
  },
  containerSchedule:{
    flex: 1,
    backgroundColor: "#F0FFFF",
    width:'100%',
    height:'20%',
    borderColor:'#0000'
    // border

  }
})