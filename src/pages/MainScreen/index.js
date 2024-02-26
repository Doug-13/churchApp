import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

export default function MainScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >

      <View style={styles.container}>
        <View style={styles.containerIcons}>
          <TouchableOpacity style={styles.menuIcon} >
            <MaterialIcons name="menu" size={28} color="black" onPress={() => navigation.navigate("Menu")} />
          </TouchableOpacity>
          <Text style={styles.menuText}>Olá Douglas,</Text>
          <Image
            source={require('../../../assets/download.jpeg')} // Insira o caminho para a imagem do perfil
            style={styles.profileImage}
          />
        </View>
        <ScrollView scrollEnabled contentContainerStyle={{ flexGrow: 1 }} >
          <View style={styles.boxContainer}></View>
          <View style={styles.containerForm}>
            <Image
              source={require('../../../assets/Mevam.jpg')}
              style={styles.image}
              resizeMode="contain"
            />
            <StatusBar style="auto" />
            <Text style={styles.churchName}>Ministério Mevam - NH</Text>
            <View style={styles.schedule}>
              <Text style={styles.scheduleTitle}>Agenda</Text>
            </View>
            <ScrollView nestedScrollEnabled style={styles.containerSchedule}>
              <Text style={styles.dateStyle}>17/02/2024 - <Text style={styles.textStyle}>Culto da família</Text></Text>
              <Text style={styles.dateStyle}>18/02/2024 - <Text style={styles.textStyle}>Culto de Oração</Text></Text>
              <Text style={styles.dateStyle}>22/02/2024 - <Text style={styles.textStyle}>Santa Ceia</Text></Text>
              <Text style={styles.dateStyle}>24/02/2024 - <Text style={styles.textStyle}>Encontro de Casais</Text></Text>
              <Text style={styles.dateStyle}>25/02/2024 - <Text style={styles.textStyle}>Culto da família</Text></Text>
              <Text style={styles.dateStyle}>22/02/2024 - <Text style={styles.textStyle}>Santa Ceia</Text></Text>
              <Text style={styles.dateStyle}>24/02/2024 - <Text style={styles.textStyle}>Encontro de Casais</Text></Text>
              <Text style={styles.dateStyle}>25/02/2024 - <Text style={styles.textStyle}>Culto da família</Text></Text>
            </ScrollView >

          </View>
          <View style={styles.buttonsBlocks}>
            <View style={styles.containerBlocks}>
              {/* Bloco com ícone de bolo de aniversário */}
              <TouchableOpacity style={styles.block}>
                <MaterialIcons name="cake" size={50} color="black" />
                <Text>Aniversariantes</Text>
              </TouchableOpacity>

              {/* Bloco com ícone de dinheiro */}
              <TouchableOpacity style={styles.block}>
                <MaterialIcons name="attach-money" size={50} color="black" />
                <Text>Financeiro</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBlocks}>
              {/* Bloco com ícone de calendário */}
              <TouchableOpacity style={styles.block}>
                <MaterialIcons name="calendar-month" size={50} color="black" />
                <Text>Calendário</Text>
              </TouchableOpacity>

              {/* Bloco com ícone de grupos */}
              <TouchableOpacity style={styles.block} >
                <MaterialIcons name="groups" size={50} color="black" />
                <Text>Grupos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBlocks}>
              {/* Bloco com ícone de calendário */}
              <TouchableOpacity style={styles.block} onPress={() => navigation.navigate("Biblia")}>
                <MaterialIcons name="book" size={50} color="black" />
                <Text>Bíblia</Text>
              </TouchableOpacity>

              {/* Bloco com ícone de grupos */}
              <TouchableOpacity style={styles.block} onPress={() => navigation.navigate("Devotional")}>
                <MaterialIcons name="group" size={50} color="black" />
                <Text>Devocional</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBlocks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    
  },
  block: {
    width: 150,
    height: 100, // Altura ajustada para 100
    backgroundColor: '#f3d00f',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center', // Centraliza os itens verticalmente
    alignItems: 'center', // Centraliza os itens horizontalmente
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerIcons: {
    backgroundColor: "#f3d00f",
    flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,

  },
  menuText: {
    fontSize: 20,
  },
  menuIcon: {
    padding: 10,
    zIndex: 9999,
  },
  personIcon: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    zIndex: 9999,
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
    marginBottom: 10,
  },
  boxContainer: {
    margin:0,
    padding:0,
    
    zIndex: -9999,
    width: 800,
    height: 800,
    marginLeft: '-50%',
    backgroundColor: "#f3d00f",
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -700,
    borderRadius: 400,
  },
  containerForm: {
    backgroundColor: '#fff',
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
    marginTop: -60,
  },
  churchName: {
    fontSize: 30,
    marginTop: 10,
  },
  containerSchedule: {
    backgroundColor: '#f3d00f',
    width: '100%',
    height: windowHeight * 0.2,
    borderRadius: 20,
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 10,

  },

  textStyle: {
    fontSize: 19,
    marginTop: 10,
    fontWeight: 'normal',
  },
  dateStyle: {
    fontSize: 19,
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonsBlocks: {
    marginBottom: 200
  }
});
