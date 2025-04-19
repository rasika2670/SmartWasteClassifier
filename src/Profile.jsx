import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import CustomButton from './components/CustomButton';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.replace('Login');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <FIcon name="user-circle" size={80} color="#2A9D8F" style={styles.avatar} />
        <Text style={styles.username}>{user?.displayName || 'Unnamed User'}</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          <FIcon name="envelope" size={22} color="#6c757d" />
          <Text style={styles.info}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          backgroundColor="#e63946"
          icon={<Icon name="logout" size={22} color="#fff" />}
          iconPosition="left"
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  avatar: {
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d3557',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    gap: 12,
  },
  info: {
    fontSize: 18,
    color: '#333',
    flexShrink: 1,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
