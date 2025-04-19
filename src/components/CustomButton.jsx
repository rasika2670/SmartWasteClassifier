import React, { useRef } from 'react';
import { Text, Pressable, Animated, StyleSheet, View } from 'react-native';

export default function CustomButton({
  title = 'Click Me',
  onPress = () => { },
  backgroundColor = '#2A9D8F',
  textColor = '#fff',
  icon = null, // icon component like <Ionicons name="add" size={20} color="#fff" />
  iconPosition = 'left', // or 'right'
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
            backgroundColor,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.content}>
          {icon && iconPosition === 'left' && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.icon}>{icon}</View>}
        </View>
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
    shadowRadius: 4
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap:10
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
