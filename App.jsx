import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './src/Home';
import Profile from './src/Profile';
import Camera from './src/Camera';
import SignUp from './src/SignUp';
import Login from './src/Login';
import CustomHeader from './src/components/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2A9D8F',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          position: 'absolute',
          overflow: 'hidden',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#d1f0ec',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={22} color={color} />
          ),
          header: () => <CustomHeader title="Home" />,
        }}
      />
      <Tab.Screen 
        name="Camera" 
        component={Camera} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" size={22} color={color} />
          ),
          header: () => <CustomHeader title="Camera" />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={22} color={color} />
          ),
          header: () => <CustomHeader title="Profile" />,
        }}
      />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
