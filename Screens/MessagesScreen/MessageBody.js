import React, { Component, useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableNativeFeedback,
    StyleSheet,
    Image
  } from 'react-native';

import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {userContext} from '../../context/user.context'
import {SharedElement} from 'react-navigation-shared-element'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import {backgroundColor, textColor} from '../../colors'


function MessageBody({navigation, route}) {

    const [userCar, setUserCar] = useState({photos: []})

useEffect(()=>{
  console.log('carid',route.params.message.messageBody )
  firestore().collection('listedCars').doc(`${route.params.message.messageBody.carId}`).get().then((querySnapshot)=>{
    setUserCar(querySnapshot.data());
  })
},[])

    return(

      <View style = {{justifyContent:"center", alignItems:"center",marginTop:"6%"}}>
          <ScrollView style = {styles.messageContainer}>
              
              <View style = {{flexDirection:"row", alignItems:"center"}}>
                <TouchableOpacity onPress = {()=>{navigation.goBack()}}>
                  <Icon name = {'arrow-back'} color = {textColor} size = {30}/>
                </TouchableOpacity>
                <Text style = {{marginLeft:"2%",fontSize: 20, color:textColor}}>Ai solicitat masina</Text>
              </View>

              <TouchableOpacity style = {{backgroundColor:"black", margin:5, borderRadius:10, overflow:'hidden'}} onPress = {()=>{navigation.navigate('CarInfoScreen', {userCar})}}>
                  <SharedElement id = {`${userCar.photos[0]}`}>
                    <Image source={{uri: userCar.photos[0]}} style = {{width:"100%",aspectRatio:16/9,height:undefined, resizeMode:"contain"}}/>
                  </SharedElement>
              </TouchableOpacity>
              <Text style = {{marginLeft:"2%",fontSize: 20, color:textColor}}>Vei ridica masina la data de:</Text>
              
              <Text style = {{fontWeight:"bold", textAlign:"center",fontSize:20, color:textColor}}>{route.params.message.messageBody.details.startDate} ora {route.params.message.messageBody.details.startHour}</Text>
              <Text style = {{marginLeft:"2%", fontSize:20, color:textColor}}>Vei returna masina la data de: </Text>
              <Text style = {{fontWeight:"bold",textAlign:"center",fontSize:20, color:textColor}}>{route.params.message.messageBody.details.endDate} ora {route.params.message.messageBody.details.endHour}</Text>

              <Text style ={{marginLeft:"2%",marginBottom:"1%", fontSize:20, color:textColor, }}>  Un mesaj cu solicitarea ta a fost trimisa proprietarului masinii. Acesta va refuza sau accepta solicitarea ta. Vei primi un mesaj de indata ce acesta confirma cererea</Text>
              <Text style = {{fontSize:20, color:textColor, textAlign:"center"}}>Intre timp poti anula aceasta solicitare</Text>
              <View style = {{justifyContent:"center", alignItems:"center", marginBottom:"3%", marginTop:"1%"}}>
                <TouchableOpacity style = {{backgroundColor:"#780c0c",paddingHorizontal:10, borderRadius:15}}>
                    <Text style = {{fontSize:20, color:'white'}}>Anuleaza</Text>
                </TouchableOpacity>
              </View>

          </ScrollView>
      </View>
    )

}

export default MessageBody;

const styles = StyleSheet.create({

  messageContainer:{
    backgroundColor:"white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    width: width*0.95,
    borderRadius: 15

  }


})