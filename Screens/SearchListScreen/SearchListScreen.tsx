import React, {useEffect, useState, useRef} from 'react'
import {View,Image, StyleSheet,ScrollView, Animated,  Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';
import auth from '@react-native-firebase/auth'
import Loader from '../../CustomComponents/Loader'
import CarInfoCard from '../../CustomComponents/CarInfoCard';
import DatePicker from '../../CustomComponents/DatePicker'
import {getSearchCards} from '../../queryFunctions/queryFunctions'
import { firestore } from 'firebase';
import app from '@react-native-firebase/app'
navigator.geolocation = require('@react-native-community/geolocation');
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'
const {width, height} = Dimensions.get('window');
const MAX_HEIGHT_SEARCHBAR = height*0.15

function SearchListScreen( {navigation}){

    const [loading, setLoading] = useState(false)
    const [locality, setLocality] = useState('București')
    const [listedCars, setListedCars] = useState(null)
    const [userCars, setUserCars] = useState([])
    const scrollY = new Animated.Value(0)
    const [isDroped, setIsDroped] = useState(false)
    const [favorites, setFavorites] = useState([])
    const calendarTopPosition = scrollY.interpolate(
        {
            inputRange: [0, MAX_HEIGHT_SEARCHBAR, 10000000],
            outputRange: [MAX_HEIGHT_SEARCHBAR+20,30,30],
            
          }
    )
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
    if(user){
    navigator.geolocation.getCurrentPosition((geo_info: any)=>{
        Geocoder.geocodePosition({lat: geo_info.coords.latitude, lng: geo_info.coords.longitude}).then((res: any) => {
            console.log(res[0].locality)
            
            //for phone
            //setLocality(res[0].locality)
            //for emulator
            
            getSearchCards({locality: locality, user_uid: user.uid}).then(response => {
                console.log("resultat",response)
                console.log('response.data:', response.data)
                    setUserCars(Object.values(response.data))
                    setLoading(false)
            })
                  
        
        })
        .catch((err:any) => console.log(err))
        
        }
    );
    }
},[])

useEffect(()=>{
    const user = auth().currentUser
    if(user){
    getSearchCards({locality: locality, user_uid: user.uid}).then(response => { 
        console.log('response.data:', response.data)
        setUserCars(Object.values(response.data))
        setLoading(false)
    })
    }     
}, [locality])


useEffect(()=>{
    const user = auth().currentUser
    return ()=>{
        
        firestore().collection('users').doc(`${user.uid}`).update({favorites: favorites})
    }
},[])

        return(

            <View>   
                <Animated.ScrollView
                keyboardShouldPersistTaps='always'
            
                showsVerticalScrollIndicator={false}
                ref = {scrollRef}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: {
                        contentOffset: {
                          y: scrollY
                        }
                      }
                    }]
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
                        if(details){
                            Geocoder.geocodePosition({lat: details.geometry.location.lat, lng: details.geometry.location.lng}).then((res:any) => {
                                console.log('localitate:',res[0].locality)
                                console.log('res', res)
                                if(res[0].locality == "Bucharest"){
                                    console.log('set locality bucuresti')
                                    setLocality('dummy value')
                                    setLocality('București')
                                }
                                else {
                                    setLocality('dummy value')
                                    setLocality(res[0].locality)
                                }

                                })
                        }
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
                                
                                return(
                                <CarInfoCard userCar = {userCar} />    
                                )
                            })                       
                        }                       

                </Animated.ScrollView>

                {/* iconite lupa si filtru */}
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

                        {/* iconita calendar */}   
                <Animated.View style = {{position:'absolute', right:"2%", top:calendarTopPosition}}>
                    <TouchableOpacity onPress = {()=>{console.log('am apasat'); setIsDroped(true)}}>
                        <Image source = {require('../../images/pngwave.png')} style = {{height:60,width:60}}/>
                    </TouchableOpacity>
                </Animated.View>
                
                <Loader loading={loading}/>
                <DatePicker dropDatePicker={isDroped} removeDatePicker={()=>{setIsDroped(false)}}/>
            </View>
        )

}



export default SearchListScreen


const styles = StyleSheet.create({



})