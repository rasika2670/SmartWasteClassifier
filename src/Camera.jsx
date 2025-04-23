import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomButton from './components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';

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
      formData.append('image', { uri, name: 'waste.jpg', type: 'image/jpeg' });

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
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    }
    resetState();
  };

  const handleRetry = () => resetState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Classifier</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <FIcon name="camera" size={48} color="#ccc" />
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#2A9D8F" style={{ marginTop: 20 }} />}

      {!classified && !loading && (
        <View style={styles.actionsRow}>
          <CustomButton
            title="Gallery"
            onPress={handleImageSelect}
            icon={<FIcon name="image" size={20} color="#fff" />}
            style={styles.smallButton}
          />
          <CustomButton
            title="Camera"
            onPress={handleCameraClick}
            icon={<FIcon name="camera" size={20} color="#fff" />}
            style={styles.smallButton}
          />
        </View>
      )}

      {result && !loading && (
        <>
          <View style={styles.resultCard}>
            <View style={styles.resultRow}>
              <Text style={styles.label}>Label:</Text>
              <Text style={styles.value}>{result.predicted_label}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.value}>{result.category}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.label}>Disposal:</Text>
              <Text style={styles.value}>{result.disposal_method}</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <CustomButton
              title="Done"
              onPress={handleDone}
              icon={<Icon name="checkbox-marked-circle-outline" size={20} color="#fff" />}
              style={styles.smallButton}
            />
            <CustomButton
              title="Retry"
              onPress={handleRetry}
              backgroundColor="#e63946"
              icon={<Icon name="reload" size={20} color="#fff" />}
              style={styles.smallButton}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2A9D8F',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    marginTop: 8,
    color: '#AAA',
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 20,
  },
  smallButton: {
    flex: 1,
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  resultRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    flex: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
  },
});
