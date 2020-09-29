import React, {useEffect, useState,useRef} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useLinkProps, NavigationContainer } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures'
import  swipeDirections from 'react-native-swipe-gestures'
import { initialWindowMetrics } from 'react-native-safe-area-context';
import ChangePassword from '../../CustomComponents/ChangePassword';
import CarSlideShow from '../../CustomComponents/CarSlideShow';
import {cars, models} from '../../config/cars'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
import Loader from '../../CustomComponents/Loader'
import firestore from '@react-native-firebase/firestore'
import {SharedElement} from 'react-navigation-shared-element'
navigator.geolocation = require('@react-native-community/geolocation');
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'


function CarInfoScreen( {navigation, route}){

    const [index, setIndex] = useState(0) 
    const [imageKey, setImageKey] = useState()
    const [userPhoto, setUserPhoto] = useState()
    const [userName, setUserName] = useState('user user')
    const [address, setAddress] = useState()
    const mapRef = useRef()

useEffect(()=>{
    const user = auth().currentUser
    setImageKey(route.params.userCar.photos.length) 
    
    firestore().collection('users').doc(`${route.params.userCar.user}`).get().then((result)=>{
        
        console.log(result)
        setUserName(result.data().displayName)
        setUserPhoto(result.data().photoURL)
    })
    

},[])


const changeIndex = ({nativeEvent}) =>{

    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if(slide!=index){
      setIndex(slide)
    }
}



        return(

            
            
                <View>
                    
                <ScrollView>
                    
                        {console.log("route params:",route.params.userCar.photos[0])}
                    <View> 
                    
                    <ScrollView
                    
                    horizontal
                    pagingEnabled
                    bounces = {false}
                   
                    scrollEventThrottle={16}
                    onScroll={changeIndex}
                    showsHorizontalScrollIndicator={false}
                    
                    >
                        
                        <View style = {{backgroundColor:'black'}}>
                            <SharedElement id = {`${route.params.userCar.photos[0]}`}>
                                <Image source = {{uri:route.params.userCar.photos[0]}} style = {styles.uploadPic}/> 
                            </SharedElement>
                            {console.log("index: ", index)}
                            {console.log('randare flatlist')}
                            
                            </View>

                        {route.params.userCar.photos.slice(1).map((image,index: number) =>{

                            return(

                            <View style = {{backgroundColor:'black'}}>
                            
                                <Image source = {{uri:image}} style = {styles.uploadPic}/> 
                          
                            {console.log("index: ", index)}
                            {console.log('randare flatlist')}
                             
                            </View>
                            )

                        })}

                    
                    </ScrollView>
                        
                        <Text style = {styles.numberTrack}>{index+1}/{imageKey}</Text>
                    
                   
                        
                    <View  style = {{flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",bottom:"5%",left:0,right:0}}>
                        
                        {route.params.userCar.photos.map((image: string,i: number)=>{

                            return(<Text style = {((index) == i) ? styles.activeBullet : styles.notActiveBullet }>{'\u2B24'}</Text>)
                        })}
                        </View> 

                        

                        


                </View>
            
                <View style = {{alignItems:"center"}} >
                    <Text style = {{fontSize:30}}>{route.params.userCar.brand} {route.params.userCar.model}</Text>
                </View>
                
                <View style = {{alignItems:"center"}}>      
                    <View style = {styles.boxInfo}>
                        <Text style = {{fontSize:25,paddingVertical:10}}>Transmisie: {route.params.userCar.transmission}</Text>
                    </View>
                </View>  

                <View style = {{alignItems:"center"}}>      
                    <View style = {styles.boxInfo}>
                        <Text style = {{fontSize:25,paddingVertical:10}}>Combustibil: {route.params.userCar.fuel}</Text>
                    </View>
                </View> 

                <View style = {{alignItems:"center"}}>      
                    <View style = {styles.boxInfo}>
                        <Text style = {{fontSize:25,paddingVertical:10}}>Numar de locuri: {route.params.userCar.seats}</Text>
                    </View>
                </View>

                <View style = {{alignItems:"center"}}>      
                    <View style = {styles.boxInfo}>
                        <Text style = {{fontSize:25,paddingVertical:10}}>Kilometrii: {route.params.userCar.kilometers}</Text>
                    </View>
                </View>

                <View style = {{alignItems:"center"}}>      
                    <View style = {styles.boxInfo}>
                        <Text style = {{fontSize:25,paddingVertical:10}}>Masina se afla in: {route.params.userCar.locality}</Text>
                    </View>
                </View>    
                    <MapView
                          style={styles.map}
                          ref = {mapRef}
                          showsUserLocation
                          userLocationUpdateInterval = {100}
                          onPress={e => console.log(e.nativeEvent)}
                          initialRegion={{
                            latitude: route.params.userCar.latitude,
                            longitude: route.params.userCar.longitude,
                            latitudeDelta: 0.9,
                            longitudeDelta: 0.2,
                          }}
                          
                          
                          onRegionChangeComplete={()=>{}}
                          >
                               <Marker
                                    coordinate={{latitude:route.params.userCar.latitude, longitude:route.params.userCar.longitude }}
                                    title={`${route.params.userCar.brand} ${route.params.userCar.model}`}
                                    onPress={()=>{mapRef.current.animateToRegion({
                                        latitude: route.params.userCar.latitude,
                                        longitude: route.params.userCar.longitude,
                                        latitudeDelta: 0.000922,
                                        longitudeDelta: 0.000421
                                        }
                                    
                                    )}}
                                    description = {route.params.userCar.address}
                                    />   
                        </MapView>     
                





                
                <View style = {{}}>
                    
                    <View style = {{...styles.profilePicBorder}}>
                        <Image source={{uri: userPhoto}} style={styles.profilePic}/>
                    </View>
                    
                      
                    
                        
                    
                    <View style = {{justifyContent:"center",alignItems:"center",width:width*0.23+8}}>
                    <Text style = {{fontSize:20}}>{userName.split(' ')[0]}</Text>
                    </View>   
                        
                </View>

                
                

                
                </ScrollView>

                             
                    <TouchableOpacity style = {{backgroundColor:"rgba(255,255,255,0.7)",borderRadius:50,position:'absolute', top:30,left:20}} onPress={()=>{navigation.goBack()}}>
                        <Icon name='arrow-back' size={30} color='black' />
                    </TouchableOpacity>
            
                
                </View>
                   
          

        )

}



export default CarInfoScreen


const styles = StyleSheet.create({

    
   
    
     
    
     
      slideShow:{
        paddingVertical:0
    },
    uploadPic:{
      aspectRatio:16/9,
      width:width,
      height:undefined,
      resizeMode:'contain',
      


    },
    numberTrack:{
      backgroundColor:"rgba(0,0,0,0.8)",
      borderRadius:15,
      position:'absolute',
      color:'white',
      right:0,
      fontSize:width*0.04,
      paddingHorizontal:6,
      textAlign:'center',
      margin:15
    },
    
    activeBullet:{
        color:"rgb(138,199,253)",
        fontSize:15
      }
      ,
      notActiveBullet:{
        color:"rgb(219, 219, 219)",
        fontSize:10
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
        map: {
            width:width,
            height:250,
          
          },

          boxInfo:{
            justifyContent:"center",
            alignItems:"center",
            margin:10,
            backgroundColor:"white",
            width:"90%",
            borderWidth:0.5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,
            
            elevation: 18,
            borderRadius:10
        }
      
     
     
    

})