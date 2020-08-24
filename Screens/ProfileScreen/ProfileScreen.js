import React, {useState, useEffect} from 'react';

import {Text, View, Button, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
function ProfileScreen( {route,navigation}) {

  
  const user = auth().currentUser
  const [count, setCount] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);





  
return (
      <View style = {styles.container}>  
        <Text>{user.email}</Text>
        <Text>{user.displayName}</Text>
        <TouchableOpacity onPress = {()=>{auth().signOut(); console.log("user has signed out"); navigation.navigate('Search')  }}>
          <Text>Sign out</Text>
        </TouchableOpacity>
        </View> 
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"

  }
})

  export default ProfileScreen;