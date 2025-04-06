<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import Profile from "./src/Profile";
import Camera from './src/Camera';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Camera" 
        component={Camera} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Camera from './src/Camera';
import Profile from './src/Profile';
import ResultScreen from './src/Result';

const Stack = createStackNavigator();
>>>>>>> 28289db11ddd316016e6105d3d0d1e92d6c8da43

const App = () => {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
=======
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
>>>>>>> 28289db11ddd316016e6105d3d0d1e92d6c8da43
