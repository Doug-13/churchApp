import React, { useState, useEffect, useContext } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../context/auth.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});


export default function Profile() {
  const navigation = useNavigation();
  const { churchData, user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBatismoPicker, setShowBatismoPicker] = useState(false); // State para controle do modal de seleção de data de batismo
  const [showEntradaPicker, setShowEntradaPicker] = useState(false); // State para controle do modal de seleção de data de entrada na igreja
  const [userData, setUserData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    telefone: '',
    data_nascimento: '',
    Instagram: '',
    WhatsApp: '',
    foto_url: '',
    profissao: '',
    escolaridade: '',
    data_batismo: '',
    data_entrada_igreja: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cidade: '',
    bairro: ''
  });


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(baseURL +`users/${user.id}`);
        if (response.data.success) {
          const userDataFromApi = response.data.data;
          setUserData(userDataFromApi);
        } else {
          console.error('Erro ao buscar dados do usuário:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  
    fetchUserData();
  }, []); // Executa apenas uma vez ao montar o componente (dependência vazia)
  

  const handleUpdateProfile = async () => {
    console.log('Dados do usuário a serem enviados:', userData);

    if (editMode) {
      Alert.alert(
        "Atualizar Perfil",
        "Tem certeza de que deseja atualizar seu perfil?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Atualização do perfil cancelada"),
            style: "cancel"
          },
          {
            text: "Sim", onPress: async () => {
              console.log('Dados do usuário a serem enviados:', userData);

              try {
                const formattedUserData = {
                  data: {
                    nome: userData.nome,
                    sobrenome: userData.sobrenome,
                    email: userData.email,
                    senha: userData.senha,
                    telefone: userData.telefone,
                    data_nascimento: typeof userData.data_nascimento === 'string' ? userData.data_nascimento.split('T')[0] : userData.data_nascimento,

                    profissao: userData.profissao,
                    escolaridade: userData.escolaridade,
                    data_batismo: userData.data_batismo.split('T')[0],
                    data_entrada_igreja: userData.data_entrada_igreja.split('T')[0],
                    logradouro: userData.logradouro,
                    numero: parseInt(userData.numero),
                    complemento: userData.complemento,
                    cidade: userData.cidade,
                    bairro: userData.bairro,
                    cep: userData.cep,
                    id_igreja: userData.id_igreja,
                    foto_url: userData.foto_url,
                    data_cadastro: userData.data_cadastro,
                    data_modificacao: userData.data_modificacao,
                    Instagram: userData.Instagram,
                    WhatsApp: userData.WhatsApp
                  }
                };

                const response = await api.put(baseURL +`user/edit/${user.id}`, formattedUserData);
                if (response.data.success) {
                  console.log('Perfil atualizado com sucesso!');
                  // Adicione lógica adicional, se necessário
                } else {
                  console.error('Erro ao atualizar perfil:', response.data.message);
                }
              } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
              }
            }
          }
        ]
      );
    }
  };

  const handleConfirmNascimento = (date) => {
    setShowDatePicker(false);
    setUserData({ ...userData, data_nascimento: date });
  };

  const handleConfirmBatismo = (date) => { // Função para confirmar seleção de data de batismo
    setShowBatismoPicker(false);
    setUserData({ ...userData, data_batismo: date });
  };

  const handleConfirmEntrada = (date) => { // Função para confirmar seleção de data de entrada na igreja
    setShowEntradaPicker(false);
    setUserData({ ...userData, data_entrada_igreja: date });
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
    setShowBatismoPicker(false);
    setShowEntradaPicker(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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
            <View style={styles.titleContainer}>
              <Text style={styles.orientation}>Dados Pessoais</Text>
              {editMode ? (
                <TouchableOpacity onPress={toggleEditMode}>
                  <Feather name="check" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleEditMode}>
                  <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.title}>Nome</Text>
            <TextInput
              placeholder="Digite seu nome..."
              style={[styles.input, !editMode && styles.disabled]}
              value={userData.nome}
              onChangeText={(text) => setUserData({ ...userData, nome: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Sobrenome</Text>
            <TextInput
              placeholder="Digite seu sobrenome..."
              style={styles.input}
              value={userData.sobrenome}
              onChangeText={(text) => setUserData({ ...userData, sobrenome: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Email</Text>
            <TextInput
              placeholder="Digite seu E-mail..."
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              editable={editMode}
            />

            <View style={styles.rowContainer}>
              <Text style={styles.title}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Digite sua senha..."
                  style={[styles.input, { flex: 1 }]} // Adicionado flex: 1 para ocupar todo o espaço disponível
                  value={userData.senha}
                  onChangeText={(text) => setUserData({ ...userData, senha: text })}
                  editable={editMode}
                />
                {editMode &&
                  <TouchableOpacity onPress={toggleShowPassword}>
                    <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" style={styles.Icon} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            <Text style={styles.title}>(DDD) + Telefone</Text>
            <TextInput
              placeholder="Digite seu telefone..."
              style={styles.input}
              value={userData.telefone}
              onChangeText={(text) => setUserData({ ...userData, telefone: text })}
              editable={editMode}
            />

            <View style={styles.dateContainer}>
              <Text style={styles.title}>Data de Nascimento</Text>
              <View style={styles.dateRow}>
                <Text style={[styles.input, !editMode && styles.disabled]}>
                  {userData.data_nascimento ? new Date(userData.data_nascimento).toLocaleDateString('pt-BR') : 'Carregando...'}
                </Text>
                {editMode &&
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Feather name="calendar" size={24} color="black" style={styles.Icon} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              date={userData.data_nascimento ? new Date(userData.data_nascimento) : new Date()}
              onConfirm={handleConfirmNascimento} // Corrigido para chamar handleConfirmNascimento
              onCancel={hideDatePicker}
            />


            <Text style={styles.title}>Profissão</Text>
            <TextInput
              placeholder="Digite sua profissão..."
              style={styles.input}
              value={userData.profissao}
              onChangeText={(text) => setUserData({ ...userData, profissao: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Escolaridade</Text>
            <TextInput
              placeholder="Digite sua escolaridade..."
              style={styles.input}
              value={userData.escolaridade}
              onChangeText={(text) => setUserData({ ...userData, escolaridade: text })}
            />

            <View style={styles.dateContainer}>
              <Text style={styles.title}>Data de Batismo</Text>
              <View style={styles.dateRow}>
                <Text style={[styles.input, !editMode && styles.disabled]}>
                  {userData.data_batismo ? new Date(userData.data_batismo).toLocaleDateString('pt-BR') : 'Selecionar data'}
                </Text>
                {editMode &&
                  <TouchableOpacity onPress={() => setShowBatismoPicker(true)}>
                    <Feather name="calendar" size={24} color="black" style={styles.Icon} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.title}>Data de Entrada na Igreja</Text>
              <View style={styles.dateRow}>
                <Text style={[styles.input, !editMode && styles.disabled]}>
                  {userData.data_entrada_igreja ? new Date(userData.data_entrada_igreja).toLocaleDateString('pt-BR') : 'Selecionar data'}
                </Text>
                {editMode &&
                  <TouchableOpacity onPress={() => setShowEntradaPicker(true)}>
                    <Feather name="calendar" size={24} color="black" style={styles.Icon} />
                  </TouchableOpacity>
                }
              </View>
            </View>


            <DateTimePickerModal
              isVisible={showBatismoPicker}
              mode="date"
              date={userData.data_batismo ? new Date(userData.data_batismo) : new Date()}
              onConfirm={handleConfirmBatismo}
              onCancel={hideDatePicker}
            />

            <DateTimePickerModal
              isVisible={showEntradaPicker}
              mode="date"
              date={userData.data_entrada_igreja ? new Date(userData.data_entrada_igreja) : new Date()}
              onConfirm={handleConfirmEntrada}
              onCancel={hideDatePicker}
            />
            <Text style={styles.orientation}>Endereço</Text>

            <Text style={styles.title}>CEP</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Digite seu CEP..."
                style={styles.input}
                value={userData.cep}
                onChangeText={(text) => setUserData({ ...userData, cep: text })}
                editable={editMode}
              />
            </View>

            <Text style={styles.title}>Logradouro</Text>
            <TextInput
              placeholder="Digite sua Rua..."
              style={styles.input}
              value={userData.logradouro}
              onChangeText={(text) => setUserData({ ...userData, logradouro: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Número</Text>
            <TextInput
              placeholder="Digite o número..."
              style={styles.input}
              value={userData.numero}
              onChangeText={(text) => setUserData({ ...userData, numero: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Complemento</Text>
            <TextInput
              placeholder="Digite o complemento..."
              style={styles.input}
              value={userData.complemento}
              onChangeText={(text) => setUserData({ ...userData, complemento: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Cidade</Text>
            <TextInput
              placeholder="Digite sua cidade..."
              style={styles.input}
              value={userData.cidade}
              onChangeText={(text) => setUserData({ ...userData, cidade: text })}
              editable={editMode}
            />

            <Text style={styles.title}>Bairro</Text>
            <TextInput
              placeholder="Digite seu bairro..."
              style={styles.input}
              value={userData.bairro}
              onChangeText={(text) => setUserData({ ...userData, bairro: text })}
              editable={editMode}
            />

            <TouchableOpacity
              style={[styles.button, !editMode && styles.disabledButton]}
              onPress={handleUpdateProfile}
              disabled={!editMode}
            >
              <Text style={styles.buttonText}>Atualizar Perfil</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView >
    </KeyboardAvoidingView >
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 10,
    fontSize: 16,
    flex: 1,
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    color: '#999999',

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
  disabledButton: {
    backgroundColor: '#999999', // cor de fundo do botão desativado
    opacity: 0.6, // opacidade reduzida para indicar que está desativado
    // outros estilos desejados para o botão desativado
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold'
  }, dateContainer: {
    marginTop: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  Icon: {
    marginLeft: 10,
    marginBottom: 15
  },
  disabled: {
    // backgroundColor: '#f5f5f5',
    color: '#999999',
    // Ajuste o padding conforme necessário
  }

});
