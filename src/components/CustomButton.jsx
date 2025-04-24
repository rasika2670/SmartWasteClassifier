import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function CustomButton({ title, onPress, icon, backgroundColor = '#2A9D8F', style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor }, style]}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
