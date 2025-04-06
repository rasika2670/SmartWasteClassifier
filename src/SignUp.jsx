import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '991254921130-c2krr7okf7ufqjpt35gepqasg5c18le9.apps.googleusercontent.com', // Replace with your Firebase project's webClientId
});

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      auth().currentUser.updateProfile({ displayName: name });
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Google Sign-In Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up</Text>
      <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>or <Text style={styles.link}>Already have an account</Text></Text>
      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password ?</Text>
      <View style={styles.separatorContainer}><View style={styles.separator} /><Text style={styles.or}>or</Text><View style={styles.separator} /></View>

      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Icon name="google" size={20} color="#EA4335" style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  linkText: { marginBottom: 15 },
  link: { color: 'blue' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  forgot: { color: 'blue', textAlign: 'left', marginBottom: 10 },
  separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  separator: { flex: 1, height: 1, backgroundColor: '#ccc' },
  or: { marginHorizontal: 8, color: '#666' },
  googleButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 12, borderRadius: 5, justifyContent: 'center' },
  googleIcon: { marginRight: 8 },
  googleText: { fontWeight: 'bold' },
});