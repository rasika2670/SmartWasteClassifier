import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import CustomButton from './components/CustomButton';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || '');
    }
  }, []);

  const handleSave = async () => {
    try {
      await auth().currentUser.updateProfile({ displayName });
      setEditing(false);
    } catch (error) {
      console.error('Failed to update name:', error);
    }
  };

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
        <View style={styles.avatarWrapper}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatarImage} />
          ) : (
            <FIcon name="user-circle" size={80} color="#2A9D8F" />
          )}
        </View>


        <View style={styles.nameRow}>
          {editing ? (
            <TextInput
              style={styles.nameInput}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text style={styles.username}>
              {displayName || 'Unnamed User'}
            </Text>
          )}

          <TouchableOpacity onPress={editing ? handleSave : () => setEditing(true)}>
            <MIcon
              name={editing ? 'check-circle-outline' : 'edit'}
              size={24}
              color="#2A9D8F"
            />
          </TouchableOpacity>
        </View>

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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d3557',
  },
  nameInput: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1d3557',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 4,
    minWidth: 150,
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
  }
});
