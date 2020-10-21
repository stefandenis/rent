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

import firestore from '@react-native-firebase/firestore';
import {userContext} from '../../context/user.context'
import {SharedElement} from 'react-navigation-shared-element'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import {backgroundColor, textColor} from '../../colors'
import MessagesScreen from './MessagesScreen';


function MessageBody({navigation, route}) {

    const [userCar, setUserCar] = useState({photos: []})
    const [confirmed, setConfirmed] = useState()    

useEffect(()=>{
  console.log('carid',route.params.message.messageBody )
  firestore().collection('listedCars').doc(`${route.params.message.messageBody.carId}`).get().then((querySnapshot)=>{
    setUserCar(querySnapshot.data());
  })

  firestore().collection('listedCars').doc(`${route.params.message.messageBody}`)

},[])


function createMessageId(){
  const date = new Date()
  var requestDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  var requestHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
  var messageId = 360000*date.getFullYear() + 27616*date.getMonth() + 864*date.getDate() + 36*date.getHours() + 0.060*date.getMinutes() + 0.001*date.getSeconds()

  return messageId;
}


function getDate(){
  const date = new Date()

  var day = date.getDate()<=9 ? `0${date.getDate()}` : `${date.getDate()}`
  var month = date.getMonth()<=8 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
  var year = `${date.getFullYear()}`


  var responseDate = `${day}-${month}-${year}`
  var responseHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
  
  return [responseDate, responseHour]
}

function acceptRequest(message){

  /* cand dau accept ce modific? ... 
  modific: requestStatus: {
    status: 'accepted'
    responseDate: Date
  }
  

  trimite mesaj catre cel care a facut cererea :


  */



  const messageId = createMessageId()
  const acceptedMessageRef = firestore().collection('users').doc(`${message.senderData.uid}`).collection('messages').doc(`${messageId}`)
  const listedCarDocRef = firestore().collection('listedCars').doc(`${message.carId}`)
  firestore().runTransaction(transaction =>{
    
    return transaction.get(listedCarDocRef).then(carData=>{
      
      var [responseDate, responseHour] = getDate()
      var newScheduledTrips = carData.data().scheduledTrips
        carData.data().scheduledTrips.forEach((value,index)=>{
          if(value.rentUser == message.senderData.uid){
            
      
            var newScheduledTrip = value
            newScheduledTrip.requestStatus = {
              status:'accepted',
              responseDate:responseDate,
              responseHour:responseHour
                
              } 

            }
            newScheduledTrips[index] = newScheduledTrip
            transaction.update(listedCarDocRef, {scheduledTrips: newScheduledTrips})
            transaction.set(acceptedMessageRef, {
              
            })
          })
        })


    })

    

    
    

  

    

  
}

function declineRequest(){

}
function returnMessageBody(message){
  var title;

  
  
switch(message.type){
  case 'carRequest':
    title = 'Ai solicitat masina'
    return (
      <ScrollView style = {styles.messageContainer}>
        
        <View style = {{flexDirection:"row", alignItems:"center"}}>
          <TouchableOpacity onPress = {()=>{navigation.goBack()}}>
            <Icon name = {'arrow-back'} color = {textColor} size = {30}/>
          </TouchableOpacity>
        <Text style = {{marginLeft:"2%",fontSize: 20, color:textColor}}>{title}</Text>
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
    )
   
  case 'confirmCarRequest':
    title = `Masina ta este dorita de`
    return (

      <View style={{marginBottom: "5%"}}>
        
      <ScrollView style = {styles.messageContainer}>
    
        
         
          <View style = {{justifyContent:"center", alignItems:"center"}}>
            <Text style = {{marginLeft:"2%",fontSize: 20, color:textColor,}}>{title}</Text> 
          </View>

          <View style = {{justifyContent:"center", alignItems:"center"}}>
            <View style = {styles.profilePicBorder}>
              <Image source={message.senderData.profileURL ? {uri:message.senderData.profileURL} : require('../../images/noPhotoURL.png')} style={styles.profilePic}/>
              
            </View>
            <Text style = {{ fontSize:20, color:textColor,marginBottom:"3%"}}>{message.senderData.displayName}</Text>
            </View>

          
          <Text style = {{marginLeft:"2%",fontSize: 20, color:textColor}}>Masina va fi ridicata la data: </Text>
          
          <Text style = {{fontWeight:"bold", textAlign:"center",fontSize:20, color:textColor}}>{route.params.message.messageBody.details.startDate} ora {route.params.message.messageBody.details.startHour}</Text>
          <Text style = {{marginLeft:"2%", fontSize:20, color:textColor}}>Si returnata la data de: </Text>
          <Text style = {{fontWeight:"bold",textAlign:"center",fontSize:20, color:textColor}}>{route.params.message.messageBody.details.endDate} ora {route.params.message.messageBody.details.endHour}</Text>

          <TouchableOpacity style = {{backgroundColor:"black", margin:5, borderRadius:10, overflow:'hidden'}} onPress = {()=>{navigation.navigate('CarInfoScreen', {userCar})}}>
              <SharedElement id = {`${userCar.photos[0]}`}>
                <Image source={{uri: userCar.photos[0]}} style = {{width:"100%",aspectRatio:16/9,height:undefined, resizeMode:"contain"}}/>
              </SharedElement>
          </TouchableOpacity>
            
          
          <View style = {{flexDirection:'row', justifyContent:"center", marginTop:"5%"}}>
          <View style = {{justifyContent:"center", alignItems:"center", marginBottom:"3%", marginTop:"1%", marginRight:"5%"}}>
            <TouchableOpacity style = {{backgroundColor:"#567FE5",paddingHorizontal:10, borderRadius:15}} onPress = {()=>{acceptRequest(message)}}>
                <Text style = {{fontSize:20, color:'white'}}>Accepta</Text>
            </TouchableOpacity>
          </View>

          <View style = {{justifyContent:"center", alignItems:"center", marginBottom:"3%", marginTop:"1%",marginLeft:"5%"}}>
            <TouchableOpacity style = {{backgroundColor:"#780c0c",paddingHorizontal:10, borderRadius:15 } } onPress = {()=>{declineRequest(message)}}>
                <Text style = {{fontSize:20, color:'white'}}>Refuza</Text>
            </TouchableOpacity>
          </View>
      </View>
  
      
    </ScrollView>

      <View style = {{position:'absolute',elevation:15}}>
        <TouchableOpacity style = {{}} onPress = {()=>{navigation.goBack()}}>
          <Icon name = {'arrow-back'} color = {textColor} size = {30}/>
        </TouchableOpacity>
      </View>
    
    </View>
    )
    
}



 
}



    return(

      <View style = {{justifyContent:"center", alignItems:"center",marginTop:"6%"}}>
          {
            returnMessageBody(route.params.message.messageBody)
          }
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

  },
  profilePicBorder:{
    width:width*0.23+8,
    borderRadius:100,
    overflow: 'hidden',
    borderColor:"white",
    shadowColor: "#000",
    borderWidth:4,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    },
    
    profilePic:{

        width:width*0.23,
        height:undefined,
        aspectRatio:1, 
              
    },


})