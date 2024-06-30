import React, { createContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { baseURL } from '../../constants/url';

const api = axios.create({
  baseURL,
});

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [churchData, setChurchData] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null); // Novo estado para o id do evento selecionado
    const [selectedGrouptId, setSelectedGrouptId] = useState(null); // Novo estado para o id do grupo selecionado
    const navigation = useNavigation();

    const updateUser = (userData) => {
        setUser(userData);
    };

    const updateChurchData = (data) => {
        setChurchData(data);
    };

    const updateReports = (newReports) => {
        console.log("Dados recebidos no contexto de autenticação:", newReports);
        setReports(newReports);
    };

    const SignIn = async (email, senha) => {
        try {
            setLoading(true);
    
            const response = await api.post(baseURL +'/users/login', {
                email: email,
                senha: senha
            });
    
            const userData = response.data.data;
            const idIgreja = userData.id_igreja;
    
            updateUser(userData);
    
            if (idIgreja === null || idIgreja === '') {
                navigation.navigate("Search");
            } else {
                const responseIgreja = await api.get(baseURL +`/church/${idIgreja}`);
                const dadosIgreja = responseIgreja.data;
    
                if (dadosIgreja.success) {
                    updateChurchData(dadosIgreja.data[0]);
                } else {
                    console.error('Erro ao buscar dados da igreja:', dadosIgreja.message);
                }
                navigation.navigate("MainScreen");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                Alert.alert('Erro', 'Email ou senha incorretos. Por favor, verifique suas credenciais e tente novamente.');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro durante o login. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };
    

    const handleChurchRegistrationSubmit = async (formData) => {
        try {
            setLoading(true);

            const formDataWithCreator = { ...formData, id_creator: user ? user.id : '' };
            const response = await api.post(baseURL +'/church/', formDataWithCreator);

            const churchId = response.data.id;
            const userChurchData = { id: user ? user.id : '', id_igreja: churchId };

            const churchResponse = await api.get(baseURL +`/church/user/${user ? user.id : ''}`);

            if (churchResponse.data.data.length > 0 && churchResponse.data.data[0].id) {
                const churchIdFromResponse = churchResponse.data.data[0].id;
                userChurchData.id_igreja = churchIdFromResponse;
                updateChurchData({ id: churchId, ...formData });
            }

            await api.post(baseURL +`/user/${user ? user.id : ''}`, userChurchData);

            Alert.alert(
                'Cadastro realizado com sucesso',
                'Seu cadastro foi concluído com sucesso!',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const conectionUserChurch = async (churchId) => {
        try {
            setLoading(true);

            const updatedUserData = { ...user, id_igreja: churchId };
            await api.post(baseURL +`/user/${user ? user.id : ''}`, updatedUserData);

            const churchResponse = await api.get(baseURL +`/church/${churchId}`);
            const dadosIgreja = churchResponse.data;

            if (dadosIgreja.success) {
                updateChurchData(dadosIgreja.data[0]);
            }

            Alert.alert(
                'Cadastro realizado com sucesso',
                'Seu cadastro foi concluído com sucesso!',
                [{ text: 'OK' }],
                { cancelable: false }
            );
            navigation.navigate('MainScreen');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            churchData,
            reports,
            selectedGroupId,
            selectedEventId, // Passando o estado do id do evento selecionado
            selectedGrouptId, // Passando o estado do id do grupo selecionado
            setSelectedGroupId,
            setSelectedEventId, // Passando a função para definir o id do evento selecionado
            setSelectedGrouptId, // Passando a função para definir o id do grupo selecionado
            signIn: SignIn,
            handleChurchRegistrationSubmit,
            loading,
            conectionUserChurch,
            updateReports
        }}>
            {children}
        </AuthContext.Provider>
    );
}
