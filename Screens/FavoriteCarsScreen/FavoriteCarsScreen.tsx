import React, {useEffect, useState, useRef} from 'react'
import {View,Image, StyleSheet,ScrollView,Text, Animated,  Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';
import auth from '@react-native-firebase/auth'
import Loader from '../../CustomComponents/Loader'
import CarInfoCard from '../../CustomComponents/CarInfoCard';
import DatePicker from '../../CustomComponents/DatePicker'
import {getSearchCards} from '../../queryFunctions/queryFunctions'
import firestore from '@react-native-firebase/firestore'
import app from '@react-native-firebase/app'



const {width, height} = Dimensions.get('window');

function FavoriteCarsScreen(props){

    const [userFavoriteCars, setUserFavoriteCars] = useState([])
    const [triggerReRenderNumber, setTriggerReRenderNumber] = useState(0)

useEffect(()=>{

//ma deranjeaza, trebuie cautata o solutie mai buna. La 10000 de masini poate o sa 
//fie prea costisitoare filtrarea client side. Om face cloud functions cand e nevoie.
  
    const user = auth().currentUser
    var carIds = []
    firestore().collection('users').doc(`${user.uid}`).get().then((querySnapshot) => {
        if(querySnapshot.data().favorites){

                setUserFavoriteCars(querySnapshot.data().favorites)
                
                
                    
        } 
            })
        
    
    
},[])

async function addToFavorites(index, favoriteFlag){
    const user = auth().currentUser
    var clickedCarId = userFavoriteCars[index].carId
    var clickedCarInfo = userFavoriteCars[index]
    
    var favoritesToSendBack = [clickedCarInfo]
    var favoriteCarObject = {}
    //var favoritesToSendBack = [clickedCarId]
    
        if(favoriteFlag){        
            await firestore().collection('users').doc(`${user.uid}`).get().then((querySnapshot =>{   
                if(querySnapshot.data().favorites){
             
                    
                    favoritesToSendBack = querySnapshot.data().favorites
                    favoritesToSendBack.push(clickedCarInfo)
                    
                }

               firestore().collection('users').doc(`${user.uid}`).update({favorites: favoritesToSendBack}).then(()=>{
                
               })
              
            }))

        


        }else{

           
            await firestore().collection('users').doc(`${user.uid}`).get().then((querySnapshot =>{   
                if(querySnapshot.data().favorites){
                    
                    favoritesToSendBack = querySnapshot.data().favorites
                    favoritesToSendBack = favoritesToSendBack.filter( (value,i,arr) => { 
                        
                        return value.carId != clickedCarId
                    })
                }

               firestore().collection('users').doc(`${user.uid}`).update({favorites: favoritesToSendBack}).then(()=>{
               
               })
              
            }))

        }
    
        setTriggerReRenderNumber(triggerReRenderNumber+1)
        props.route.params.reRenderSearchList(triggerReRenderNumber+1)
        
    
    


}


    return(

        
        <View style = {{}}>
           
            
            
            <ScrollView>
                {
                    userFavoriteCars.map((userCar,index)=>{
                        return(
                            <CarInfoCard userCar = {userCar} index = {index} carId={userCar.carId} receiveFavorites={(index, favoriteFlag)=>{addToFavorites(index,favoriteFlag);}}/>    
                            )
                        })      
                    
                }
                
            </ScrollView>
            <TouchableOpacity style = {{backgroundColor:"rgba(255,255,255,0.7)",borderRadius:50,position:'absolute', top:30,left:20}} onPress={()=>{props.navigation.goBack(); }}>
                <Icon name='arrow-back' size={30} color='black' />
            </TouchableOpacity>
            
        </View>
    )

}
const styles = StyleSheet.create({



})
export default FavoriteCarsScreen


