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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d3557',
  },
  username: {
    fontSize: 16,
    color: '#457b9d',
  },
})
