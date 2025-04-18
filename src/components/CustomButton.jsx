import React, { useRef } from 'react';
import { Text, Pressable, Animated, StyleSheet } from 'react-native';

export default function CustomButton({
  title = 'Click Me',
  onPress = () => {},
  backgroundColor = '#2A9D8F',  // Default background color
  textColor = '#fff',           // Default text color
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      android_ripple={{ color: '#ffffff30' }}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor, // Using the backgroundColor prop
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
