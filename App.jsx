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
import Detail from './src/Detail';

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
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" size={focused ? 24 : 22} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12, fontWeight: '600', marginBottom: 8 }}>
              Home
            </Text>
          ),
          header: () => <CustomHeader title="Home" />,
        }}
      />
      <Tab.Screen 
        name="Camera" 
        component={Camera} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="camera" size={focused ? 24 : 22} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12, fontWeight: '600', marginBottom: 8 }}>
              Camera
            </Text>
          ),
          header: () => <CustomHeader title="Camera" />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="user" size={focused ? 24 : 22} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 14 : 12, fontWeight: '600', marginBottom: 8 }}>
              Profile
            </Text>
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
        <Stack.Screen name='Detail' component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
