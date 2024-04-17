import React from 'react';
import { View, Text, ScrollView, Linking, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Política de Privacidade</Text>
            <Text style={styles.text}>
                A sua privacidade é importante para nós. É política do ChurchApp respeitar a sua privacidade em relação a
                qualquer informação sua que possamos coletar no site ChurchApp, e outros sites que possuímos e operamos.
            </Text>
            {/* Outros parágrafos e elementos aqui */}
            <Text style={styles.userCommitment}>Compromisso do Usuário</Text>
            <Text style={styles.text}>
                O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ChurchApp oferece no site e com
                caráter enunciativo, mas não limitativo:
            </Text>
            <Text style={styles.bulletText}>
                - Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
            </Text>
            <Text style={styles.bulletText}>
                - Não difundir propaganda ou conteúdo de natureza racista, xenofóbica,
                Bet Nacional

                ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
            </Text>
            <Text style={styles.bulletText}>
                - Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ChurchApp, de seus fornecedores ou
                terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software
                que sejam capazes de causar danos anteriormente mencionados.
            </Text>
            <Text style={styles.userCommitment}>Mais Informações</Text>
            <Text style={styles.text}>
                Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se
                precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você
                usa em nosso site.
            </Text>
            <Text style={styles.text}>
                Esta política é efetiva a partir de 18 March 2024 14:14
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: '#444',
        marginBottom: 10,
    },
    text: {
        color: '#444',
    },
    blueText: {
        color: 'blue',
    },
    userCommitment: {
        fontSize: 18,
        color: '#444',
        marginTop: 20,
    },
    bulletText: {
        marginLeft: 20,
        color: '#444',
    },
});

export default PrivacyPolicyScreen;
