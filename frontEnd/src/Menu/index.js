import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native'; // Importe o RefreshControl
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o estado de atualização
  const navigation = useNavigation();

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true); // Indique que a atualização está ocorrendo
    wait(2000).then(() => setRefreshing(false)); // Simule a atualização e pare quando estiver concluída
  }, []);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
    // Toggle submenu only if it's already open
    if (openSubMenu === buttonName) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(buttonName);
    }

    // Navigate to the corresponding screen based on the button name
    switch (buttonName) {
      case 'CultReport':
        navigation.navigate('CultReport');
        break;
      case 'Studies':
        navigation.navigate('Studies');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'Peoples':
        navigation.navigate('Peoples');
        break;
        case 'Permissions':
        navigation.navigate('Permissions');
        break;
      case 'Fluxo de Caixa':
        navigation.navigate('Financial');
        break;
      default:
        break;
    }
  }
  return (
    <Animatable.View animation="slideInLeft" style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/download.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>Nome do Usuário</Text>
        </View>
        {/* Botões do Menu */}
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Home' && styles.selectedButton]}
          onPress={() => handleButtonPress('Home')}
        >
          <Text style={[styles.menuText, selectedButton === 'Home' && styles.selectedButtonText]}>Sobre Nós</Text>
        </TouchableOpacity>
        {openSubMenu === 'Home' && (
          <View style={styles.subMenu}>
            <TouchableOpacity
              style={[styles.subMenuItem, selectedButton === 'ChurchRegister' && styles.selectedButton]}
              onPress={() => navigation.navigate("ChurchRegister", { fromScreen: "menu" })}
            >
              <Text style={[styles.subMenuText, selectedButton === 'ChurchRegister' && styles.selectedButtonText]}>Editar Perfil</Text>
            </TouchableOpacity>
            {/* Adicione outros itens do submenu aqui */}
          </View>
        )}
        {/* Outros botões do menu */}
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Pessoas' && styles.selectedButton]}
          onPress={() => handleButtonPress('Peoples')}
        >
          <Text style={[styles.menuText, selectedButton === 'Pessoas' && styles.selectedButtonText]}>Pessoas</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Permissões' && styles.selectedButton]}
          onPress={() => handleButtonPress('Permissions')}
        >
          <Text style={[styles.menuText, selectedButton === 'Permissões' && styles.selectedButtonText]}>
            Permissões
          </Text>
        </TouchableOpacity>

        {/* Criar botão de Equipes */}
        <TouchableOpacity

          style={[styles.menuItem, selectedButton === 'Equipes' && styles.selectedButton]}
          onPress={() => handleButtonPress('Equipes')}
        >
          <Text style={[styles.menuText, selectedButton === 'Equipes' && styles.selectedButtonText]}>Equipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Perfil' && styles.selectedButton]}
          onPress={() => handleButtonPress('Profile')}
        >
          <Text style={[styles.menuText, selectedButton === 'Perfil' && styles.selectedButtonText]}>Perfil</Text>
        </TouchableOpacity>
        {/* Criar botão de Estudos */}
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Estudos' && styles.selectedButton]}
          onPress={() => handleButtonPress('Studies')}
        >
          <Text style={[styles.menuText, selectedButton === 'Estudos' && styles.selectedButtonText]}>Estudos</Text>
        </TouchableOpacity>
        {/* Criar botão de Financeiro */}
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Financeiro' && styles.selectedButton]}
          onPress={() => handleButtonPress('Financeiro')}
        >
          <Text style={[styles.menuText, selectedButton === 'Financeiro' && styles.selectedButtonText]} onPress={() => handleButtonPress('Financial')}>Financeiro</Text>
        </TouchableOpacity>
        {/* {openSubMenu === 'Financeiro' && (
          <View style={styles.subMenu}>
            <TouchableOpacity
              style={[styles.subMenuItem, selectedButton === 'Ofertar' && styles.selectedButton]}
              onPress={() => handleButtonPress('Ofertar')}
            >
              <Text style={[styles.subMenuText, selectedButton === 'Ofertar' && styles.selectedButtonText]}>Ofertar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subMenuItem, selectedButton === 'Minhas Ofertas' && styles.selectedButton]}
              onPress={() => handleButtonPress('Minhas Ofertas')}
            >
              <Text style={[styles.subMenuText, selectedButton === 'Minhas Ofertas' && styles.selectedButtonText]}>Minhas Ofertas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subMenuItem, selectedButton === 'Fluxo de Caixa' && styles.selectedButton]}
              onPress={() => handleButtonPress('Fluxo de Caixa')}
            >
              <Text style={[styles.subMenuText, selectedButton === 'Fluxo de Caixa' && styles.selectedButtonText]}>Fluxo de Caixa</Text>
            </TouchableOpacity>
          </View>
        )} */}
        {/* Criar botão de Informações do Culto */}
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Lançar culto' && styles.selectedButton]}
          onPress={() => handleButtonPress('CultReport')}
        >
          <Text style={[styles.menuText, selectedButton === 'Lançar culto' && styles.selectedButtonText]}>Relatórios</Text>
        </TouchableOpacity>
        {/* Criar botão de Informações do Configurações */}
        <TouchableOpacity
          style={[styles.menuItem, selectedButton === 'Configurações' && styles.selectedButton]}
          onPress={() => handleButtonPress('Configurações')}
        >
          <Text style={[styles.menuText, selectedButton === 'Configurações' && styles.selectedButtonText]}>Configurações</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 20
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  menuText: {
    fontSize: 18,
  },
  selectedButton: {
    backgroundColor: 'lightblue',
  },
  selectedButtonText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  subMenu: {
    marginLeft: 20,
    marginTop: 10,
  },
  subMenuItem: {
    paddingVertical: 5,
  },
  subMenuText: {
    fontSize: 18,
  },
  logoutButton: {
    // marginLeft: 20,
    marginTop: 10,
    // backgroundColor:'red'
  },
  logoutText: {
    fontSize: 18,
    // color: 'red',
    fontWeight: 'bold',
  },
});

export default MenuScreen;
