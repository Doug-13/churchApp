import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const TermsScreen = () => {
    const handleLinkPress = () => {
        // Implementar a lógica para lidar com pressionar o link
        //
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Termos de Serviço</Text>
                <Text style={styles.content}>Ao acessar ao site ChurchApp, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Uso de Licença</Text>
                <Text style={styles.content}>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ChurchApp, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</Text>
                <Text style={styles.listItem}>- modificar ou copiar os materiais;</Text>
                <Text style={styles.listItem}>- usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</Text>
                <Text style={styles.listItem}>- tentar descompilar ou fazer engenharia reversa de qualquer software contido no site ChurchApp;</Text>
                <Text style={styles.listItem}>- remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</Text>
                <Text style={styles.listItem}>- transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</Text>
                <Text style={styles.content}>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por ChurchApp a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.</Text>
            </View>

            {/* Restante dos termos aqui */}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: '#666',
    },
    listItem: {
        marginLeft: 20,
        marginBottom: 5,
        color: '#666',
    },
});

export default TermsScreen;
