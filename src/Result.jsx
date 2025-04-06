import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const ResultScreen = ({ route }) => {
    const { result, image } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Classification Results</Text>
            <Image source={{ uri: image }} style={styles.image} />
            {result ? (
                result.map((item, index) => (
                    <View key={index} style={styles.resultBox}>
                        <Text style={styles.text}>
                            🗑️ Waste Type: {item.label}
                        </Text>
                        <Text style={styles.confidence}>
                            Confidence: {Math.round(item.score * 100)}%
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.error}>Error processing image</Text>
            )}
        </ScrollView>
    );
};

export default ResultScreen;

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
    resultBox: {
        width: '90%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        elevation: 3,
    },
    text: { fontSize: 18 },
    confidence: { fontSize: 16, color: 'gray' },
    error: { fontSize: 18, color: 'red', marginTop: 20 },
});
