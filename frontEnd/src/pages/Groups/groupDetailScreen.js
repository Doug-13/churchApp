import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { baseURL } from '../../../constants/url.js';

const api = axios.create({
  baseURL,
});

const GroupDetailScreen = () => {
  const { selectedGroupId } = useContext(AuthContext);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await api.get(`/groups/grupo/${selectedGroupId}`);
        const responseData = response.data;
        if (responseData.success && responseData.data && responseData.data.length > 0) {
          const data = responseData.data[0]; // Os dados estão dentro do primeiro elemento do array
          setGroupData(data);
        } else {
          console.error('Data is missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGroupData();
  }, [selectedGroupId]);

  if (!groupData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/Logo.png')} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{groupData.nome_do_grupo}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <View style={[styles.section, { backgroundColor: '#FFF7E0' }]}>
          <Text style={[styles.sectionTitle, { color: 'black' }]}>Informações do Grupo</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>ID do Grupo:</Text>
            <Text style={styles.value}>{groupData.id_grupo}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Líder:</Text>
            <Text style={styles.value}>{groupData.nome_do_lider}</Text>
          </View>
          {groupData.nome_do_vice_lider && (
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Vice-Líder:</Text>
              <Text style={styles.value}>{groupData.nome_do_vice_lider}</Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{groupData.descricao_grupo}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Data de Lançamento:</Text>
            <Text style={styles.value}>{new Date(groupData.data_lancamento).toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: '#FFFFE0' }]}>
          <Text style={[styles.sectionTitle, { color: 'black' }]}>Endereço</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{groupData.endereco || 'Não especificado'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Bairro:</Text>
            <Text style={styles.value}>{groupData.bairro || 'Não especificado'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Número:</Text>
            <Text style={styles.value}>{groupData.numero || 'Não especificado'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Cidade:</Text>
            <Text style={styles.value}>{groupData.cidade || 'Não especificado'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{groupData.estado || 'Não especificado'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    height: 200, // Altura da imagem
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sobreposição escura para legibilidade do texto
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Cor do texto sobre a imagem
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
    color: '#666',
  },
  value: {
    flex: 1,
    color: '#333',
  },
});

export default GroupDetailScreen;
