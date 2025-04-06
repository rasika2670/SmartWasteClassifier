import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = auth().currentUser
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.replace('Login') // or whatever your login screen is
      })
  }

  return (
    <View style={styles.container}>
      {/* Profile Content */}
      <View style={styles.profileBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>{user?.displayName || 'Not available'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user?.email}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Logout" color="#e63946" onPress={handleLogout} />
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d3557',
  },
  welcome: {
    fontSize: 16,
    color: '#457b9d',
    marginTop: 8,
  },
  profileBox: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 10,
  },
  info: {
    fontSize: 18,
    color: '#1d3557',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
})
