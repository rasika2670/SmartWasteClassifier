import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function Camera() {
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error('Error uploading image:', error);
      setResult({ error: 'Failed to classify image.' });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Classifier</Text>

      <Button title="Pick Image from Gallery" onPress={handleImageSelect} />
      <Button title="Take Photo" onPress={handleCameraClick} />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {loading && <ActivityIndicator size="large" color="#2A9D8F" />}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Label: {result.predicted_label}</Text>
          <Text style={styles.resultText}>Category: {result.category}</Text>
          <Text style={styles.resultText}>Disposal Method: {result.disposal_method}</Text>
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
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#264653',
    marginVertical: 4,
  },
});
