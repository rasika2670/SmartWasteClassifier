import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    return (
        <SafeAreaView style={styles.Home}>
            <ScrollView >
                <View style={styles.ecoScore}>
                    <Text style={styles.text}>Your Eco Score</Text>
                    <View style={styles.boxes}>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                    </View>
                </View>
                {[...Array(8)].map((_, index) => (
                    <View key={index} style={[styles.ecoScore, styles.classified]}>
                        <View style={styles.box}></View>
                        <View style={{ gap: 20 }}>
                            <Text style={styles.text}>Waste Type</Text>
                            <Text style={styles.confidenceText}>Confidence Score: 80%</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    Home: {
        flex: 1,
        paddingHorizontal: 20,
    },
    ecoScore: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 20,
        backgroundColor: "white",
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20
    },
    boxes: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    box: {
        height: 100,
        width: 100,
        backgroundColor: 'black',
        margin: 10
    },
    text: {
        fontSize: 26,
        fontWeight: "600"
    },
    classified: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'flex-start'
    },
    confidenceText: {
        fontSize: 20,
        flexWrap: 'wrap',
        width: '80%'
    }
})
