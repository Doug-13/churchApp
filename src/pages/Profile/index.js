import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Profile() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/download.jpeg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </Animatable.View>

          <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
            <StatusBar style="auto" />
            <Text style={styles.orientation}>Cadastre seu Perfil</Text>

            <Text style={styles.title}>Nome</Text>
            <TextInput
              placeholder="Digite seu nome..."
              style={styles.input}
            />

            <Text style={styles.title}>Sobrenome</Text>
            <TextInput
              placeholder="Digite seu sobrenome..."
              style={styles.input}
            />

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

            <Text style={styles.title}>Confirmar Senha</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Confirme sua senha..."
              style={styles.input}
            />

            <Text style={styles.title}>(DDD) + Telefone</Text>
            <TextInput
              placeholder="Digite seu telefone..."
              style={styles.input}
            />

            <Text style={styles.title}>Data de Nascimento</Text>
            <TextInput
              placeholder="Digite sua data de nascimento..."
              style={styles.input}
            />

            <Text style={styles.title}>CEP</Text>
            <TextInput
              placeholder="Digite seu CEP..."
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ChurchRegister")}
            >
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d00f",
  },
  orientation: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 18,
    marginLeft: '3%',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: "3%",
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  containerForm: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingStart: '5%',
    paddingEnd: '5%',
    width: '100%',
  },
  title: {
    fontSize: 18,
    marginTop: 18
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000000',
    width: '100%',
    borderRadius: 6,
    paddingVertical: 8,
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold'
  }
});
