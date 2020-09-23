import React, {useEffect, useState, useRef} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert, Share } from 'react-native'
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
import {SharedElement} from 'react-navigation-shared-element'
import CarInfoCard from '../../CustomComponents/CarInfoCard';
import functions from '@react-native-firebase/functions'

const imageSource = require("../../images/background.png")

navigator.geolocation = require('@react-native-community/geolocation');
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'
const MAX_HEIGHT_SEARCHBAR = height*0.15

function SearchListScreen( {navigation}){

    const [loading, setLoading] = useState(false)
    const [locality, setLocality] = useState('București')
    const [listedCars, setListedCars] = useState(null)
    const [userCars, setUserCars] = useState([])
    const scrollY = new Animated.Value(0)
    
    const scrollRef = useRef()
    const opacityValue = scrollY.interpolate(
        {
            inputRange: [0, MAX_HEIGHT_SEARCHBAR],
            outputRange: [1,0],
            
          }
    )
    const searchCircleOpacity = scrollY.interpolate(
        {
            inputRange: [0, MAX_HEIGHT_SEARCHBAR],
            outputRange: [0,1],
            
          }
    )

useEffect(()=>{
    
    setLoading(true)
    const user = auth().currentUser
    navigator.geolocation.getCurrentPosition((geo_info)=>{
        Geocoder.geocodePosition({lat: geo_info.coords.latitude, lng: geo_info.coords.longitude}).then(res => {
            console.log(res[0].locality)
            
            //for phone
            //setLocality(res[0].locality)
            //for emulator
            
            functions()
                .httpsCallable('getCarCards')({locality: locality, user: user.uid})
                .then(response=>{
                    console.log('response.data:', response.data)
                    setUserCars(Object.values(response.data))
                    setLoading(false)
                    
                })
        
        
        })
        .catch(err => console.log(err))
        
        }
    );


},[])

useEffect(()=>{
    const user = auth().currentUser
    functions()
    .httpsCallable('getCarCards')({locality: locality, user: user.uid})
    .then(response=>{
        console.log('response.data:', response.data)
        setUserCars(Object.values(response.data))
        setLoading(false)
        
    })



.catch(err => console.log(err))
}, [locality])




        return(

            <View>
                <Loader loading={loading}/>
            <ScrollView
            keyboardShouldPersistTaps='always'
          
            showsVerticalScrollIndicator={false}
            ref = {scrollRef}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}]
              )}
            >
            <Animated.View style = {{opacity: opacityValue}}>
               <GooglePlacesAutocomplete
                                        listViewDisplayed={false}
                                       
                                        
                                        placeholder='Locatia...'
                                        fetchDetails
                                        onPress={(data, details) => {
                                        // 'details' is provided when fetchDetails = true
                                        setLoading(true);
                                        Geocoder.geocodePosition({lat: details.geometry.location.lat, lng: details.geometry.location.lng}).then(res => {
                                            console.log('localitate:',res[0].locality)
                                            console.log('res', res)
                                            setLocality(res[0].locality)
                                            

                                        })
                                        }}
                                        query={{
                                        //TODO: secure KEY with crypto or smth
                                        key: API_KEY,
                                        language: 'ro',
                                        // default: 'geocode'
                                        }}
                                        
                                        styles = {{
                                            
                                            
                                            textInputContainer:{
                                                backgroundColor:"rgb(138,199,253)",
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                                height:MAX_HEIGHT_SEARCHBAR,
                                                paddingTop:"10%",
                                               
                                                
                                                
                                            },
                                            textInput:{
                                                height: 38,
                                                color: '#5d5d5d',
                                                fontSize: 16,


                                            },
                                            
                                            poweredContainer:{
                                                borderBottomWidth:1,
                                                
                                            },

                                            predefinedPlacesDescription: {
                                                color: 'black',
                                              },
                                          
                                        }}
                                        currentLocation={true}
                                        currentLocationLabel='Locatia curenta'
                                    />
                </Animated.View>        
                
                            
                    
                    {   
                        userCars.map((userCar,index)=>{
                        console.log('userCars: ', userCars)
                            console.log('user.car: ', userCar.photos)
                            return(
                            
                               
                                <CarInfoCard userCar = {userCar} />    
             
                            )



                        })
                        
                    }
                                        

                
                 

            </ScrollView>


            <Animated.View style = {
                    {
                        
                        position:"absolute",
                        top: MAX_HEIGHT_SEARCHBAR/1.5,
                        opacity: searchCircleOpacity,
                        left:5
                    }}>
                            <TouchableOpacity 
                            style = {{
                                height:50,
                                width:50,
                                borderRadius:50, 
                                backgroundColor:"rgb(138,199,253)",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                            onPress = {()=>{scrollRef.current.scrollTo({x:0,y:0, animated:true})}}>

                        <Icon name='search' size={25} color='white' />
                                
                            </TouchableOpacity>

                            <TouchableOpacity  
                            style = {{
                                height:50,
                                width:50,
                                borderRadius:50, 
                                backgroundColor:"rgb(138,199,253)",
                                justifyContent:"center",
                                alignItems:"center",
                                marginTop:10
                            }}
                            onPress = {()=>{}}>

                        <Icon name='filter' size={25} color='white' />
                                
                            </TouchableOpacity>

                    </Animated.View>
             

            </View>
        )

}



export default SearchListScreen


const styles = StyleSheet.create({



})