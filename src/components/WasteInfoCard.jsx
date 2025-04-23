import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const WasteInfoCard = ({ waste, onToggleExpand, isExpanded }) => {
  return (
    <View style={[styles.card, { borderColor: waste.color }]}>
      <View style={styles.cardHeader}>
        {/* Waste Icon and Name on the Left */}
        <View style={styles.iconTextContainer}>
          <FIcon name={waste.icon} size={30} color={waste.color} />
          <Text style={[styles.cardTitle, { color: waste.color }]}>{waste.name}</Text>
        </View>

        {/* Dropdown Arrow on the Right */}
        <TouchableOpacity onPress={() => onToggleExpand(waste.name)}>
          <MIcon
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={waste.color}
          />
        </TouchableOpacity>
      </View>
      
      {/* Disposal Method and Description */}
      <Text style={styles.disposalMethod}>{waste.disposalMethod}</Text>
      {isExpanded && (
        <Text style={styles.description}>{waste.description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
    borderWidth: 0.2,
    borderLeftWidth: 8,
    borderColor: '#ddd',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: '100%',
    marginHorizontal: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
  },
  disposalMethod: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

export default WasteInfoCard;
