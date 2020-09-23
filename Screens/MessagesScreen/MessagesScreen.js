import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions
  } from 'react-native';

import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'



function MessagesScreen() {



const insert = ()=>{

  const user = auth().currentUser

      
      database().ref(`/users/${user.uid}/listedCars`).set({
        listedCars: 'salut'
      })



}

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'green' }}>
       
        <TouchableOpacity onPress = {insert}>
          
            <Text style = {{backgroundColor:"red"}}> Insereaza in baza de date</Text>
          
        </TouchableOpacity>
        
      </View>
    );
  }




  export default MessagesScreen;