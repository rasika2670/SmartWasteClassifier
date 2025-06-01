import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator,
  Alert, Platform, ScrollView
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomButton from './components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestCameraPermission = async () => {
  const result = await request(
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA
  );
  console.log('Camera permission:', result);
};

// Your machine’s local IP (update accordingly for physical devices)
const SERVER_IP = '192.168.1.2'; // Change this to your machine's local IP

// Dynamically select base URL based on platform
const baseURL = Platform.select({
  ios: 'http://localhost:5000', // Works on iOS simulators
  android: `http://${SERVER_IP}:5000`, // Use local IP for Android emulator or real devices
});

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
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, res => {
      if (!res.didCancel && !res.errorCode && res.assets?.[0]?.uri) {
        const uri = normalizeUri(res.assets[0].uri);
        setImageUri(uri);
        classifyWaste(uri);
      }
    });
  };

  const handleCameraClick = async () => {
    try {
      const permissionResult = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA
      );
  
      if (permissionResult === RESULTS.GRANTED) {
        launchCamera({ mediaType: 'photo', quality: 1 }, res => {
          if (!res.didCancel && !res.errorCode && res.assets?.[0]?.uri) {
            const uri = normalizeUri(res.assets[0].uri);
            setImageUri(uri);
            classifyWaste(uri);
          } else {
            console.log('Camera cancelled or failed:', res.errorCode);
          }
        });
      } else {
        Alert.alert('Camera Permission Denied', 'Please allow camera access in settings.');
      }
    } catch (err) {
      console.error('Camera launch failed:', err);
      Alert.alert('Error', 'Failed to open camera.');
    }
  };

  const normalizeUri = (uri) => {
    if (Platform.OS === 'android' && !uri.startsWith('file://')) {
      return `file://${uri}`;
    }
    return uri;
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

      const response = await axios.post(
        `${baseURL}/classify`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setResult(response.data);
      setClassified(true);
    } catch (err) {
      console.error('Upload error:', err);
      Alert.alert('Network Error', 'Could not reach the classification server.');
      setResult({ error: 'Network Error' });
    }
    setLoading(false);
  };

  const handleDone = async () => {
    if (!result || !imageUri) return resetState();
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
    } catch (e) {
      console.error('Firestore save error:', e);
    }
    resetState();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              <Text style={styles.value}>{result?.predicted_label || 'N/A'}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.value}>{result?.category || 'N/A'}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.label}>Disposal:</Text>
              <Text style={styles.value}>{result?.disposal_method || 'N/A'}</Text>
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
              onPress={resetState}
              backgroundColor="#e63946"
              icon={<Icon name="reload" size={20} color="#fff" />}
              style={styles.smallButton}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
    alignItems: 'center',
    paddingBottom: 100
  },
  title: {
    fontSize: 20,
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
    gap: 10,
  },
  smallButton: {
    flex: 1,
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
