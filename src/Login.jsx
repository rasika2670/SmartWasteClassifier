import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ImageBackground, ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '991254921130-c2krr7okf7ufqjpt35gepqasg5c18le9.apps.googleusercontent.com',
});

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/recycle-icon.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <Text style={styles.logoText}>EcoClassify</Text>
        </ImageBackground>
        <Text style={styles.loginText}>Log in</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome Back!</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={16} color="#2A9D8F" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={styles.input}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#2A9D8F" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.loginBtnText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.or}>or Log in with</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Icon name="google" size={20} color="#DB4437" style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          Don't have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
};

export default Login;

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
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  loginText: {
    color: '#fff',
    fontSize: 26,
    marginTop: 5,
    alignSelf: 'flex-start'
  },

  content: {
    padding: 25,
    flex: 1,
    alignItems: 'center'
  },

  welcome: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2A9D8F',
    marginBottom: 25
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },

  inputIcon: {
    marginRight: 10,
    opacity: 0.8,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333'
  },

  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A9D8F',
    paddingVertical: 12,
    borderRadius: 30,   
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    width: '60%',
    margin: 16,
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
    width: '80%'
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
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    width: '75%',
    marginBottom: 20
  },

  googleIcon: {
    marginRight: 10,
  },

  googleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
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
    paddingBottom:100
  }
});
