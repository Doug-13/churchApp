import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
          <StatusBar style="auto" />
          <Image
            source={require('../../../assets/Logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </Animatable.View>
      </View>
      <View style={styles.containerForm}>
        <StatusBar style="false" />
        <View style={styles.slogan}>
          <Text style={styles.sloganText}>"Inspirando Comunhão, Fortalecendo Vínculos: Sua Igreja na Ponta dos Dedos."</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d00f",
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "#f3d00f",
    marginTop: '14%',
    marginBottom: "8%",
    // paddingStart: '5%', 
  },
  containerForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: "#ffff",
    borderColor: '#000000',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  image: {
    width: 380,
    height: 380,
    borderRadius: 20

  },
  slogan: {
    marginTop: 10, // Ajuste conforme necessário
    marginBottom: 50,
  },
  sloganText: {
    fontSize: 20,
    // fontWeight: 'bold',
    paddingLeft: '5%',
    paddingRight: '5%',
    textAlign: 'center'
  },
  button: {
    // position: 'relative',
    backgroundColor: '#000000',
    borderRadius: 6,
    paddingVertical: 8,
    width: '90%',
    // alignSelf: 'center',
    // bottom: '15%',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  buttonText: {
    fontSize: 19,
    color: "#ffff",
    fontWeight: 'bold'
  }
});
