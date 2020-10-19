import React, { Component, useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableNativeFeedback
  } from 'react-native';

import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {userContext} from '../../context/user.context'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import MessageBody from '../../Screens/MessagesScreen/MessageBody'


function MessagesScreen({navigation,route}) {

  const [messages, setMessages] = useState([]);
  const {user, refreshUser, unseenMessagesCount, messagesObject} = useContext(userContext);

useEffect(()=>{

  console.log('din mesaj', unseenMessagesCount)
  console.log(messagesObject)
},[])



function returnTitleMessage(type, seen) {

  var mailIcon = seen ? 'mail-open' : "mail"
  var mailColor = seen ? "gray" : "orange"

  if(type == "carRequest"){
    return(
      <View style = {{marginLeft:15, flexDirection:'row'}}>
        <View>
        <Text style = {{fontSize:20, fontWeight:'bold'}}>Cererea ta a fost trimisa!</Text>
        <Text style = {{fontSize:16}}>Poti verifica detaliile sau poti anula cererea</Text>
        </View>
        <View style = {{marginLeft:20}}>
          <Icon name = {mailIcon} color = {mailColor} size = {40}/>
        </View>
      </View>
    )
  }else if(type == 'carRentConfirmation'){

  }else if(type == 'carToBeAcceptedOrDeclined'){

  }
}


function readMessage(message){
  if(message.messageBody.seen){
    navigation.navigate('MessageBody', {message: message})
  } else {
    firestore().collection('users').doc(`${user.uid}`).collection('messages').doc(`${message.messageId}`).update({seen: true})
    navigation.navigate('MessageBody',{message: message})
  }
}


  return (
      <View style={{backgroundColor:'white', width:width,height:height}}>
        <ScrollView>
          <View style = {{width:width, height:20}}>
            
          </View>
        

        
        
        
        {
          !messagesObject.length ? (

            <View style ={{width:width, height:height*0.6, justifyContent:"center", alignItems:"center"}}>
                <Image source = {require('../../images/noMessages.png')} style = {{aspectRatio:1, width: width*0.8, height:undefined}}/>
                  <Text style = {{fontSize: 18, fontWeight:'bold'}}>Nu exista niciun mesaj in acest moment.</Text>
                  <Text style = {{textAlign:"center",fontSize:16}}>Aici vei primi mesaje legate de calatoriile tale sau de masinile pe care le-ai inregistrat la inchiriere.</Text>
            
            </View>
          ):


          (messagesObject.map((message, index)=>{
            return(
              <TouchableNativeFeedback
              onPress={()=>{readMessage(message)}}
              background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
                <View style = {{}}>
                  <View style = {{width:width, justifyContent:"center", alignItems:"center"}}>
                    <View style = {{height:0.5, width: width*0.9, backgroundColor:"black"}}></View>
                  </View>
                    <View style = {{marginVertical:15}}>
                    {  
                      returnTitleMessage(message.messageBody.type,message.messageBody.seen)
                    }
                  </View>
                  <View style = {{width:width, justifyContent:"center", alignItems:"center"}}>
                    <View style = {{height:0.25, width: width*0.9, backgroundColor:"black"}}></View>
                  </View>
                </View>
                </TouchableNativeFeedback>

            )
          })
        )
        }
        </ScrollView>
      </View>
    );
  }




  export default MessagesScreen;