import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async id => {
    try {
      await firestore().collection('Classifier').doc(id).delete();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.wasteType}>{item.wasteType}</Text>
        <Text style={styles.disposal}>{item.disposalMethod}</Text>

        <View style={styles.cardBottomRow}>
          <Text style={styles.timestamp}>
            {item.timestamp?.toDate
              ? moment(item.timestamp.toDate()).fromNow()
              : 'Time not available'}
          </Text>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
            <Icon name="delete" size={20} color="#E63946" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.Home}>
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.ecoScore}>
              <Text style={styles.text}>Your Eco Score</Text>
              <View style={styles.scoreRow}>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreValue}>87</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreValue}>A+</Text>
                </View>
              </View>
            </View>
          }
          data={wasteData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 30 }}>
              No waste data uploaded yet.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F7F7F7',
  },
  ecoScore: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1D3557',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 15,
  },
  scoreBox: {
    height: 100,
    width: 100,
    borderRadius: 16,
    backgroundColor: '#2A9D8F',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  scoreValue: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
  },
  disposal: {
    fontSize: 18,
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
    fontSize: 14,
    color: '#999',
  },
  deleteBtn: {
    padding: 4,
  },
});