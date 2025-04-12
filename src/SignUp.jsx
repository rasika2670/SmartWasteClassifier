import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ImageBackground
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '991254921130-c2krr7okf7ufqjpt35gepqasg5c18le9.apps.googleusercontent.com',
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
      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/recycle-icon.png')} // adjust as needed
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <Text style={styles.logoText}>EcoClassify</Text>
        </ImageBackground>
        <Text style={styles.loginText}>Sign up</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Join the Movement!</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={18} color="#2A9D8F" style={styles.inputIcon} />
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={16} color="#2A9D8F" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#2A9D8F" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#2A9D8F" style={styles.inputIcon} />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
          <Text style={styles.loginBtnText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.or}>or Sign up with</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Icon name="google" size={20} style={styles.googleIcon} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          Already have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </View>

      <View style={styles.footer} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#2A9D8F',
    height: '30%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 14,
    paddingHorizontal: 40
  },
  imageBackground: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  loginText: {
    color: '#fff',
    fontSize: 28,
    marginTop: 5,
    alignSelf: 'flex-start'
  },
  content: {
    padding: 25,
    flex: 1,
  },
  welcome: {
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 20,
    alignSelf: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  loginBtn: {
    backgroundColor: '#2A9D8F',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center'
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 8,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center'
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  signup: {
    textAlign: 'center',
    color: '#000',
  },
  signupLink: {
    color: '#2A9D8F',
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#2A9D8F',
    height: '8%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }
});
