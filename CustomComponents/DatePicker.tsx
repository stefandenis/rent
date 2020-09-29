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
import CalendarPicker from 'react-native-calendar-picker';
import TextInputCustom from './textinput'
import Svg, {Circle, G, Path, Rect} from 'react-native-svg'



function DatePicker(props){

    const [startDate, setStartDate] = useState('Selecteaza o data;')
    const [endDate, setEndDate] = useState('Selecteaza o data;')
    const [startHour, setStartHour] = useState("__:__")
    const [endHour, setEndHour] = useState("__:__")
    const minDate = new Date(); // Today
    const marginTop = useState(new Animated.Value(-height))[0]
    
    useEffect(()=>{
        console.log('am intrat in use Effect pt isDroped')
        console.log('propsisdroped:' , props.dropDatePicker)
        if(props.dropDatePicker){
    
            Animated.timing(marginTop, {
                toValue: 0,
                duration:300,
                useNativeDriver:false
            }).start()
        }
    }, [props.dropDatePicker])

function onDateChange(date,type){
    console.log(date)
    if(date){
        var day = (date['_i'].day <= 9) ? `0${date['_i'].day}` : date['_i'].day
        var month = (date['_i'].month <= 9) ? `0${date['_i'].month}` : date['_i'].month ;
        var year = date['_i'].year;
        var finalDate = `${day}-${month}-${year}`;
    }
    if (type === 'END_DATE') {
        setEndDate(finalDate);
        
    } else {
        console.log('start date: ', finalDate)
        setStartDate(finalDate);
        setEndDate('Selecteaza o data;');   
    }

    
}

function removeDatePicker(){
  
    Animated.timing(marginTop, {
        toValue: -height,
        duration:300,
        useNativeDriver:false
    }).start()
    props.removeDatePicker()

}

function checkAvailability(){


}


    return(
        
        <Animated.View style = {{height:height,width:width,position:'absolute',backgroundColor:"rgba(0,0,0,0.5)", marginTop:marginTop}}>

            <View style = {{backgroundColor:"white",alignItems:"center",justifyContent:"center",borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                <Text style = {{fontSize:15, paddingTop:15}}>Alege perioada in care doresti sa inchiriezi</Text>
                <CalendarPicker
                    minDate = {minDate}
                    allowRangeSelection={true}
                    weekdays={['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa']}
                    previousTitle="<"
                    nextTitle="Próximo"
                    months={['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']}
                    previousComponent={<Icon name='arrow-back' size={25} color='black' />}
                    nextComponent={<Icon name='arrow-forward' size={25} color='black' />}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor='rgb(138,199,253)'
                    selectedDayTextColor="#FFFFFF"
                    height={height*0.6}
                    onDateChange={(date,type)=>{onDateChange(date,type)}}
                />

            <View style = {{ alignItems:"center", justifyContent:"center"}}>
                <View style = {{flexDirection:"row", alignItems:"center"}}>
                    <Text style ={{fontSize:20}}>De la: </Text>
                    <Text style ={{fontSize:20}}> {startDate} ora: </Text>
                    
                    <TextInputCustom getHour = {(v)=>{setStartHour(v)}}/>
                </View>
               
                
                <View style = {{height:0.2,width:width*0.9, backgroundColor:"black",marginVertical:5}}></View>
                
                <View style = {{flexDirection:"row", alignItems:"center"}}>
                    <Text style ={{fontSize:20}}>Pana la: </Text>
                    <Text style ={{fontSize:20}}> {endDate} ora: </Text>
                  
                    <TextInputCustom getHour = {(v)=>{setEndHour(v)}}/>

                </View>
            </View>
              

              <TouchableOpacity 
                style = {{backgroundColor:"rgb(138,199,253)", paddingHorizontal:5, marginVertical:10, borderRadius:10, elevation:10}}
                onPress = {()=>{
                    checkAvailability()
                }}
                >
                    <Text style = {{fontSize:20}}>Verifica disponibilitatea</Text>
              </TouchableOpacity>

              
            </View>

            <View style = {{alignItems:"center"}}>
                <TouchableOpacity 
                style ={{backgroundColor:"white",padding:10, borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                onPress = {()=>{
                    removeDatePicker()
                }}
                >
                    <Icon name='arrow-up' size={25} color='black' />
                </TouchableOpacity>
            </View>
            

            
      


        </Animated.View>


    )


}


const styles = StyleSheet.create({




})

export default DatePicker;
