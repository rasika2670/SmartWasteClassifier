import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

const CustomHeader = ({ title }) => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const user = auth().currentUser
    if (user) {
      setUsername(user.displayName || 'User')
    }
  }, [])

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.username}>Hello, {username}!</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 14,
    elevation: 3,
    backgroundColor: '#2A9D8F',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  username: {
    fontSize: 16,
    color: '#fff'
  },
})
