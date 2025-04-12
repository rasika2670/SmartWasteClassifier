import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Image, ImageBackground
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
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/recycle-icon.png')} // adjust the path based on your project
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

        <Text style={styles.forgot}>Forgot Password ?</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.or}>or Login with</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Icon name="google" size={20} style={styles.googleIcon} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          Create an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>SignUp</Text>
        </Text>
      </View>

      <View style={styles.footer} />
    </View>
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
    fontSize: 40,
    fontWeight: '400',
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
  forgot: {
    alignSelf: 'flex-end',
    color: 'red',
    marginBottom: 20,
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
