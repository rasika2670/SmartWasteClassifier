import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CameraScreen = () => {
  const [image, setImage] = useState(null);

  // Open Camera
  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0].uri);
      }
    });
  };

  // Open Gallery
  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select an Image</Text>
      <View style={styles.buttonContainer}>
        <Button title="Open Camera" onPress={openCamera} />
        <Button title="Upload from Gallery" onPress={openGallery} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});