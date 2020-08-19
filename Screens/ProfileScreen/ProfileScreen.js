import React, {useState, useEffect} from 'react';

import {Text, View, Button, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
function ProfileScreen( {route,navigation}) {

  
  const user = auth().currentUser
  const [count, setCount] = useState(0);
  




  
return (
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>{user.email}</Text>
    
        <TouchableOpacity onPress = {()=>{auth().signOut(); console.log("user has signed out"); navigation.navigate('Search')  }}>
          <Text>Sign out</Text>
        </TouchableOpacity>
    
    </ScrollView>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1

  }
})

  export default ProfileScreen;