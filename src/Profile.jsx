import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import CustomButton from './components/CustomButton';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WasteInfoCard from './components/WasteInfoCard';
import { wasteData } from './utils/wasteData';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [expandedWaste, setExpandedWaste] = useState(null);

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

  const handleToggleExpand = (wasteName) => {
    setExpandedWaste(expandedWaste === wasteName ? null : wasteName);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card Section */}
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatarImage} />
          ) : (
            <FIcon name="user-circle" size={90} color="#2A9D8F" />
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
              size={20}
              color="#2A9D8F"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <FIcon name="envelope" size={16} color="#6c757d" />
          <Text style={styles.info}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.profileCard}>
        {/* Waste Management Section */}
        <Text style={styles.sectionTitle}>Waste Management Tips</Text>
        <Text style={styles.sectionSubtitle}>
          Learn how to classify and dispose of waste properly to contribute to a cleaner environment.
        </Text>

        {/* Waste Info Cards */}
        {wasteData.map((waste) => (
          <WasteInfoCard
            key={waste.name}
            waste={waste}
            onToggleExpand={handleToggleExpand}
            isExpanded={expandedWaste === waste.name}
          />
        ))}
      </View>
      {/* Logout Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          backgroundColor="#e63946"
          icon={<Icon name="logout" size={22} color="#fff" />}
          iconPosition="left"
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7', // Soft background color
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 24,
    alignItems: 'center',
    elevation: 8,  // Deeper shadow for more depth
    marginBottom: 20,  // Space between profile and waste info section
    shadowColor: '#000',  // Subtle shadow for elevation
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatarWrapper: {
    marginBottom: 15,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#2A9D8F', // Border color to match profile color
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d3557', // Darker shade for text
    textAlign: 'center',
  },
  nameInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1d3557',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
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
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2A9D8F',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 120,
    paddingHorizontal: 40,
  },
});
