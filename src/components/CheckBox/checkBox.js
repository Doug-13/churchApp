import React from "react";
import {SafeAreaView, View, StyleSheet, Text } from "react-native";
import Checkbox from '../src/components/Checkbox';

const CheckBoxPage = () => {
    const optionsindividual = [{ text:'Li e concordo', id:1}];
    return(
        <SafeAreaView style={styles.container}>
        <text style={styles.title}>CheckBox individual</text>
        <Checkbox options={optionsindividual} onChange={(op) => alert(op)} />
        <Text style={styles.title}>Li e concordo com os termos</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fefefe',
    },
    title: {
        color: '#333',
        size: 16,
        fontWeight: '700',
        textTransform: 'uppercase',


    }
});
export default CheckBoxPage;