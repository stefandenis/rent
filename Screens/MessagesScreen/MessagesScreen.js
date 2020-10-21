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

},[])



function returnTitleMessage(type, seen, message) {

  var mailIcon = seen ? 'mail-open' : "mail"
  var mailColor = seen ? "gray" : "orange"

  var title, subTitle;

  switch(type){

    case 'carRequest': 
      title = 'Cererea ta a fost trimisa!';
      subTitle = 'Poti verifica detaliile sau poti anula cererea.'
      break;
    case 'confirmCarRequest': 
      title = `Cerere de la ${message.senderData.displayName.split(' ')[0]}`;
      subTitle = 'Poti sa accepti sau sa refuzi aceasta cerere.'
      break;
   
    case 'carResponseDecline':
      title = 'Proprietarul nu a acceptat cererea ta'
      subTitle = 'Poti sa alegi alta masina.'
      break;
    case 'carResponseAccept':
      title = 'Proprietarul a acceptat cererea ta'
      subTitle = 'Intra aici pentru a afla mai multe despre masina.'
      break;
    
  }
  
    return(
      <View style = {{marginLeft:15, flexDirection:'row'}}>
        <View>
        <Text style = {{width:width*0.85,fontSize:width*0.055, fontWeight:'bold'}}>{title}</Text>
        <Text style = {{width:width*0.85,fontSize:width*0.040}}>{subTitle}</Text>
        </View>
        <View style = {{marginLeft:0, justifyContent:"center"}}>
          <Icon name = {mailIcon} color = {mailColor} size = {width*0.1}/>
        </View>
      </View>
    )
  
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
                      returnTitleMessage(message.messageBody.type,message.messageBody.seen, message.messageBody)
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