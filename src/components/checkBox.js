import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";

const CheckBoxPage = () => {
    return(
        <SafeAreaView style={Styles.container}>
        <CheckBox options ></CheckBox>
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
export default CheckBoxPage