import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomButton from './components/CustomButton';

export default function Camera() {
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classified, setClassified] = useState(false);

  const resetState = () => {
    setImageUri(null);
    setResult(null);
    setClassified(false);
  };

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        classifyWaste(uri);
      }
    });
  };

  const handleCameraClick = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        classifyWaste(uri);
      }
    });
  };

  const classifyWaste = async (uri) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'waste.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post('http://10.0.2.2:5000/classify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data);
      setClassified(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResult({ error: 'Failed to classify image.' });
    }
    setLoading(false);
  };

  const handleDone = async () => {
    if (result && imageUri) {
      try {
        const user = auth().currentUser;

        await firestore().collection('Classifier').add({
          image: imageUri,
          wasteType: result.category,
          category: result.predicted_label,
          disposalMethod: result.disposal_method,
          timestamp: firestore.FieldValue.serverTimestamp(),
          userEmail: user?.email || 'N/A',
          userName: user?.displayName || 'User',
        });

        console.log('Data saved to Firestore');
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    }
    resetState();
  };

  const handleRetry = () => {
    resetState();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Classifier</Text>

      {!classified && (
        <>
          <CustomButton title="Pick Image from Gallery" onPress={handleImageSelect} />
          <CustomButton title="Take Photo" onPress={handleCameraClick} />
        </>
      )}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {loading && <ActivityIndicator size="large" color="#2A9D8F" />}

      {result && !loading && (
        <View style={styles.resultBox}>
          <View style={styles.resultRow}>
            <Text style={styles.label}>Label:</Text>
            <Text style={styles.value}>{result.predicted_label}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{result.category}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.label}>Disposal Method:</Text>
            <Text style={styles.value}>{result.disposal_method}</Text>
          </View>

          <View style={styles.actionButtons}>
            <CustomButton title="Done" onPress={handleDone} />
            <CustomButton title="Retry" onPress={handleRetry} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    gap: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A9D8F',
    margin: 10,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#e3f9f5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 10,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 6,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    width: 120,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
    flexShrink: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});
