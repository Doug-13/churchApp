import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function SignIn() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.containerHeader}>
        <Animatable.Text animation='fadeInLeft' delay={500} style={styles.welcome}>Seja Bem Vindo(a)</Animatable.Text>
        <Animatable.View animation='fadeInRight' delay={100} style={styles.imageContainer}>
          <Image
            source={require('../../../assets/Logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
       </Animatable.View>
      </View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
        <StatusBar style="auto" />

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu E-mail..."
          style={styles.input}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Digite sua senha..."
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.buttonRegister}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d00f",
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: "8%",
    paddingStart: '5%',
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  welcome: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#000000',
  marginVertical: 8, // Adiciona espaço vertical entre o texto e a imagem
},
  imageContainer: {
    alignItems: 'center', // Centraliza horizontalmente
  },
  image: {
    width: 300,
    height: 180,
    borderRadius: 20,
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 2,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: '#000000',
    width: '100%',
    borderRadius: 6,
    paddingVertical: 8,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 19,
    color: '#ffff',
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 3,
    alignSelf: 'center'
  },
  registerText: {
    color: '#000000',
  }
});
