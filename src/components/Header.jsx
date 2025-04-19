import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = ({ title }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUsername(user.displayName || 'User');
    }
  }, []);

  const renderIcon = () => {
    if (title === 'Home') {
      return <Icon name="home" size={24} color="#fff" />;
    } else if (title === 'Profile') {
      return <Icon name="user" size={24} color="#fff" />;
    } else {
      return <Icon name="camera" size={24} color="#fff" />;
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {renderIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.username}>Hello, {username}!</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 14,
    elevation: 3,
    backgroundColor: '#2A9D8F',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // spacing between icon and title
  },
  username: {
    fontSize: 16,
    color: '#fff',
  },
});
