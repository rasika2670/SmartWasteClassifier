import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const chartWidth = Dimensions.get('window').width - 40;

const WastePieChart = ({ wasteData }) => {
    const groupWasteByType = data => {
        const counts = {
            Recyclable: 0,
            Biodegradable: 0,
            Hazardous: 0,
            'E-Waste': 0,
            Other: 0,
        };

        data.forEach(item => {
            const type = item.wasteType?.toLowerCase();
            if (type?.includes('recyclable')) counts.Recyclable++;
            else if (type?.includes('biodegradable')) counts.Biodegradable++;
            else if (type?.includes('hazardous')) counts.Hazardous++;
            else if (type?.includes('e-waste')) counts['E-Waste']++;
            else counts.Other++;
        });

        return counts;
    };

    const wasteCounts = groupWasteByType(wasteData);
    const pieData = Object.entries(wasteCounts)
        .filter(([_, count]) => count > 0)
        .map(([name, count], index) => ({
            name,
            count,
            color: ['#2A9D8F', '#E76F51', '#F4A261', '#264653', '#A8DADC'][index % 5],
            legendFontColor: '#333',
            legendFontSize: 14,
        }));

    return (
        <View style={styles.card}>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#1D3557' }}>
                Eco Insights
            </Text>
            {pieData.length > 0 ? (
                <PieChart
                    data={pieData}
                    width={chartWidth}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: () => '#000',
                    }}
                    accessor="count"
                    backgroundColor="transparent"
                    absolute
                />
            ) : (
                <Text style={{ textAlign: 'center', color: '#888' }}>No data to show.</Text>
            )}
        </View>
    );
};

export default WastePieChart;

const styles = StyleSheet.create({
    card : {
        marginBottom: 20, 
        backgroundColor: '#fff', 
        borderRadius: 16, 
        padding: 12, marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        margin: 1
    }
});