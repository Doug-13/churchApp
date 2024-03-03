// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const TransactionsScreen = () => {
//   const [balance, setBalance] = useState(0);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [nomeCulto, setNomeCulto] = useState('');
//   const [data, setData] = useState(new Date());
//   const [valorEntrada, setValorEntrada] = useState('');

//   const handleAddEntrada = () => {
//     // Lógica para adicionar uma nova entrada
//     // Você pode usar os valores de nomeCulto, data e valorEntrada aqui
//     // Atualizar o saldo e fechar o modal
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.balanceText}>Saldo: R$ {balance.toFixed(2)}</Text>

//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
//           <Text style={styles.buttonText}>Adicionar Entrada</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//               style={styles.input}
//               placeholder="Nome do culto"
//               value={nomeCulto}
//               onChangeText={text => setNomeCulto(text)}
//             />
//             <DateTimePicker
//               value={data}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 const currentDate = selectedDate || data;
//                 setData(currentDate);
//               }}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Valor da entrada"
//               value={valorEntrada}
//               onChangeText={text => setValorEntrada(text)}
//               keyboardType="numeric"
//             />
//             <Button title="Adicionar Entrada" onPress={handleAddEntrada} />
//             <Button title="Fechar" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   balanceText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// export default TransactionsScreen;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Platform, Modal, Button, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // Adicione esta linha

const CultDataEntryScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [theme, setTheme] = useState('');
    const [participants, setParticipants] = useState('');
    const [visitors, setVisitors] = useState('');
    const [children, setChildren] = useState('');
    const [description, setDescription] = useState('');
    const [visitorData, setVisitorData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleSaveData = () => {
        // Implemente a lógica para salvar os dados do culto
        const cultData = {
            date,
            theme,
            participants,
            visitors,
            children,
            description,
            visitorData,
        };
        console.log('Dados do culto salvos:', cultData);
        // Mostrar mensagem de salvo com sucesso
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            navigation.goBack(); // Voltar para a página anterior após 1 segundo
        }, 1000);
        // Você pode enviar os dados para um servidor ou salvá-los localmente
    };

    const handleAddVisitorInfo = () => {
        const newVisitorData = [];
        for (let i = 0; i < visitorCount; i++) {
            newVisitorData.push({
                name: '',
                phoneNumber: ''
            });
        }
        setVisitorData(newVisitorData);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const renderVisitorInputs = () => {
        return visitorData.map((visitor, index) => (
            <View key={index}>
                <Text style={styles.label}>Visitante {index + 1}:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do visitante"
                    value={visitor.name}
                    onChangeText={(text) => handleVisitorNameChange(text, index)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="(xx) xxxxx-xxxx"
                    value={visitor.phoneNumber}
                    onChangeText={(text) => handleVisitorPhoneNumberChange(text, index)}
                    keyboardType="phone-pad"
                    maxLength={15}
                />
            </View>
        ));
    };

    const handleVisitorNameChange = (text, index) => {
        const newVisitorData = [...visitorData];
        newVisitorData[index].name = text;
        setVisitorData(newVisitorData);
    };

    const handleVisitorPhoneNumberChange = (text, index) => {
        const formattedPhoneNumber = text
            .replace(/\D/g, '') // Remove todos os caracteres não numéricos
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') // Formata como (xx) xxxxx-xxxx

        const newVisitorData = [...visitorData];
        newVisitorData[index].phoneNumber = formattedPhoneNumber;
        setVisitorData(newVisitorData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Data do Culto:</Text>
                    <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
                        <Text style={styles.datePickerButtonText}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <Text style={styles.label}>Tema do Culto:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tema"
                        value={theme}
                        onChangeText={setTheme}
                    />
                    <Text style={styles.label}>Participantes:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Participantes"
                        value={participants}
                        onChangeText={setParticipants}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Visitantes:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Visitantes"
                        value={visitors}
                        onChangeText={(text) => {
                            setVisitors(text);
                            setVisitorCount(parseInt(text));
                        }}
                        keyboardType="numeric"
                    />
                    {parseInt(visitors) > 0 && (
                        <TouchableOpacity onPress={handleAddVisitorInfo}>
                            <Text style={styles.visitorInfoButton}>Adicionar informações do visitante</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.visitorsContainer}>
                        <Text style={styles.label}>Dados dos Visitantes:</Text>
                        {visitorData.map((visitor, index) => (
                            <View key={index} style={styles.visitorInfo}>
                                <Text>Visitante {index + 1}:</Text>
                                <Text>Nome: {visitor.name}</Text>
                                <Text>Telefone: {visitor.phoneNumber}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.label}>Crianças:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Crianças"
                        value={children}
                        onChangeText={setChildren}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Descrição:</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Descrição"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalClose}
            >
                <ScrollView contentContainerStyle={styles.modalScrollView}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Preencher informações dos visitantes</Text>
                            {renderVisitorInputs()}
                            <Button title="Salvar" onPress={handleModalClose} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            {isSaved && (
                <View style={styles.successMessage}>
                    <Text style={styles.successMessageText}>Dados salvos com sucesso!</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    formContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    datePickerButton: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 10,
    },
    datePickerButtonText: {
        fontSize: 16,
    },
    visitorInfoButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    visitorsContainer: {
        marginTop: 20,
    },
    visitorInfo: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    successMessage: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    successMessageText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CultDataEntryScreen;
