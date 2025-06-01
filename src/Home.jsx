import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WastePieChart from './components/WastePieChart';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      console.warn('No user logged in');
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('Classifier')
      .where('userEmail', '==', user.email)
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWasteData(data);
          setLoading(false);
        },
        error => {
          console.error('Error fetching Firestore data:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleDelete = id => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this waste entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('Classifier').doc(id).delete();
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.wasteType}>{item.wasteType}</Text>
        <Text style={styles.disposal}>{item.disposalMethod}</Text>
        <View style={styles.cardBottomRow}>
          <Text style={styles.timestamp}>
            {item.timestamp?.toDate ? moment(item.timestamp.toDate()).fromNow() : 'Time not available'}
          </Text>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
            <Icon name="delete" size={20} color="#E63946" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.Home}>
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>
      ) : (
        <FlatList
          ListHeaderComponent={<WastePieChart wasteData={wasteData} />}
          data={wasteData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30 }}>No waste data uploaded yet.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    margin: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  cardContent: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  wasteType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
  },
  disposal: {
    fontSize: 14,
    color: '#2A9D8F',
    fontWeight: '500',
    marginBottom: 6,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
  },
  deleteBtn: {
    padding: 4,
  },
});
