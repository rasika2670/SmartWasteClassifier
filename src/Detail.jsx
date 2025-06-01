import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';

const Detail = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.resultCard}>
        <Text style={styles.sectionTitle}>Classification Details</Text>
        <View style={styles.resultRow}>
          <Text style={styles.label}>Label:</Text>
          <Text style={styles.value}>{item.category || 'N/A'}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.label}>Waste Type:</Text>
          <Text style={styles.value}>{item.wasteType || 'N/A'}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.label}>Disposal:</Text>
          <Text style={styles.value}>{item.disposalMethod || 'N/A'}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.label}>Detected At:</Text>
          <Text style={styles.value}>
            {item.timestamp?.toDate
              ? moment(item.timestamp.toDate()).format('LLL')
              : 'N/A'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    height:'100%',
    padding: 16,
    backgroundColor: '#F7F7F7',
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2A9D8F',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  resultRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    flex: 1.5,
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
  },
}); 