import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { useFonts, MaterialCommunityIcons } from '@expo/vector-icons';
// import { AppLoading } from 'expo';
import { Entypo } from '@expo/vector-icons';


const CheckBox = ({ options = [], onChange }) => {
    const [selected, setSelected] = useState([]);

    function toggle(id) {
        let index = selected.findIndex(i => i === id);
        let arrSelecteds = [...selected];
        if (index !== -1) {
            arrSelecteds.splice(index, 1);
        } else {
            arrSelecteds.push(id);
        }
        setSelected(arrSelecteds);
    }

    useEffect(() => onChange(selected), [selected]);

    return (
        <View>
            {options.map((op, index) => (
                <View style={styles.optionBox} key={index}>
                    <TouchableOpacity
                        style={[styles.TouchableBox,{
                            backgroundColor: selected.findIndex(i => i === op.id) !== -1 
                                ? '#3EBD93' 
                                : '#fff',
                        }]}                                              
                        onPress={() => toggle(op?.id)}
                    >
                        {selected.findIndex(i => i === op.id) !== -1 ? (
                            // <MaterialCommunityIcons name="check-bold" color={'#3EBD93'} size={16} />
                            <Entypo name="check" size={16} color="white" />
                        ) : null}


                    </TouchableOpacity>
                    <Text style={styles.optext}>{op?.text}</Text>
                </View>
            ))}
        </View>
    );
}
//Exemplo de como utilizar Checkbox Multiplo
// setOptionsMultiple([
//     { text: "Estacionamento", id: 1 },
//     { text: 'Acessível a Cadeirantes', id: 2 },
//     { text: 'Acessível em Libras', id: 3 },
//     { text: 'Escolinha para Crianças', id: 4 }
// ]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    optionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
    },
    optext: {
        marginLeft: 12,
        color: "#555",
        fontSize: 16,
        fontWeight: '600',
    },
    TouchableBox: {
        height: 22,
        width: 22,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: '#black',
        borderWidth: 2,
        background:'#red'
    }
});

export default CheckBox;
    