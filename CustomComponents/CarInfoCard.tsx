import React, {useEffect, useState,useRef} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert, ImageBackground } from 'react-native'
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
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


navigator.geolocation = require('@react-native-community/geolocation');
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'

const imageSource = require("../images/background.png")


function CarInfoCard(props){

    const navigation = useNavigation()
    

    useEffect(()=>{
        if(!props.loadingData){
            console.log(props.userCar)
            console.log(props.loadingData)
            console.log(props.string)
        console.log("props22:")
        }
    }, [])
    return(
            
            <TouchableOpacity onPress={()=>{navigation.navigate('CarInfoScreen', {userCar: props.userCar})}} style = {{backgroundColor:"black", justifyContent:"center", alignItems:"center", borderRadius:10,overflow:"hidden",marginVertical:5, marginHorizontal:3}}>
            <SharedElement id = {`${props.userCar.photos[0]}`}>
                <Image source = {{uri:props.userCar.photos[0]}} style = {{width:"100%", aspectRatio:16/9, height:undefined, resizeMode:"contain"}}  />
            </SharedElement>
    
            <View style = {{position:"absolute", bottom:"5%",right:"5%", backgroundColor:"rgba(255,255,255,0.7)",borderRadius:10}}>
                <Text style = {{fontSize:width*0.07,paddingHorizontal:5,color:"rgba(0,0,0,1)", fontWeight:"bold"}}>30 RON/zi</Text>                
            </View>

            <View style = {{position:"absolute", backgroundColor:"rgba(255,255,255,0.7)", top:"2%",left:"2%", borderRadius:10}}>
                <Text style = {{fontSize:width*0.05,paddingHorizontal:5,color:"rgba(0,0,0,1)", fontWeight:"bold"}}>{props.userCar.brand} {props.userCar.model}</Text>
            </View>
            </TouchableOpacity>


        


    )

}

export default CarInfoCard

const styles = StyleSheet.create({




})