import React, {useEffect, useState, useRef} from 'react'
import {View,Image, StyleSheet,ScrollView,Text, Animated,  Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';
import auth from '@react-native-firebase/auth'
import Loader from '../../CustomComponents/Loader'
import CarInfoCard from '../../CustomComponents/CarInfoCard';
import DatePicker from '../../CustomComponents/DatePicker'
import {getSearchCards, filterCards} from '../../queryFunctions/queryFunctions'
import firestore from '@react-native-firebase/firestore'
import Filter from '../../CustomComponents/Filter'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { ScreenStackHeaderRightView } from 'react-native-screens';

navigator.geolocation = require('@react-native-community/geolocation');
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'
const {width, height} = Dimensions.get('window');
const MAX_HEIGHT_SEARCHBAR = height*0.15
var favorites = []
function SearchListScreen( {navigation}){

    const [loading, setLoading] = useState(false)
    const [locality, setLocality] = useState('București')
    const [listedCars, setListedCars] = useState(null)
    const [userCars, setUserCars] = useState([])
    const scrollY = new Animated.Value(0)
    const [triggerReRender, setTriggerReRender] = useState(0)
    const [isFilterDropped, setIsFilterDropped] = useState(false)
    const [filterOptions, setFilterOptions] = useState([])
    const [filterOptionsObject, setFilterOptionsObject] = useState({})
    const [filterItemsHeight, setFilterItemsHeight] = useState(0)

    const [isDroped, setIsDroped] = useState(false)
    
    const calendarTopPosition = scrollY.interpolate(
        {
            inputRange: [0, MAX_HEIGHT_SEARCHBAR+filterItemsHeight, 10000000],
            outputRange: [MAX_HEIGHT_SEARCHBAR+50+filterItemsHeight,30,30],
            
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
    console.log('filterOptions useEffect')
    const user = auth().currentUser;
    if(user){
    
        if(filterOptions.length != 0) {    
            filterCards(filterOptionsObject,user.uid,locality).then((response)=>{
                console.log('response.data:', response.data)
                setUserCars(Object.values(response.data))
                setListedCars(Object.keys(response.data))
                setLoading(false)
            })
            
        }else{
            navigator.geolocation.getCurrentPosition((geo_info: any)=>{
                Geocoder.geocodePosition({lat: geo_info.coords.latitude, lng: geo_info.coords.longitude}).then((res: any) => {
                    //for phone
                    //setLocality(res[0].locality)
                    //for emulator
                    getSearchCards({locality: locality, user_uid: user.uid}).then(response => {
                        
                        setUserCars(Object.values(response.data))
                        setLoading(false)
                    })       
                })
                .catch((err:any) => console.log(err))
                }
            );

        }
    }

},[filterOptionsObject, filterOptions])


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
    
    
        if(filterOptions.length != 0){
            
            filterCards(filterOptionsObject,user.uid, locality).then((response)=>{
                console.log('response.data:', response.data)
                setUserCars(Object.values(response.data))
                setListedCars(Object.keys(response.data))
                setLoading(false)
            })
            
        }else{         
            
            getSearchCards({locality: locality, user_uid: user.uid}).then(response => { 
                setUserCars(Object.values(response.data))
                setListedCars(Object.keys(response.data))
                setLoading(false)
            })
        }  
    }   
}, [locality])





async function addToFavorites(index, favoriteFlag){
    const user = auth().currentUser
    var clickedCarId = listedCars[index]
    var clickedCarInfo = userCars[index]
    clickedCarInfo['carId'] = clickedCarId 
    var favoritesToSendBack = [clickedCarInfo]
    var favoriteCarObject = {}
    //var favoritesToSendBack = [clickedCarId]
    if(listedCars){
        if(favoriteFlag){        
            await firestore().collection('users').doc(`${user.uid}`).get().then((querySnapshot =>{   
                if(querySnapshot.data().favorites){
                   
                    
                    favoritesToSendBack = querySnapshot.data().favorites
                    favoritesToSendBack.push(clickedCarInfo)
                    
                }

               firestore().collection('users').doc(`${user.uid}`).update({favorites: favoritesToSendBack}) 
                
            }))

        


        }else{

           
            await firestore().collection('users').doc(`${user.uid}`).get().then((querySnapshot =>{   
                if(querySnapshot.data().favorites){
                    
                    favoritesToSendBack = querySnapshot.data().favorites
                    favoritesToSendBack = favoritesToSendBack.filter( (value,i,arr) => { 
                   
                        return value.carId != clickedCarId
                    })
                }

               firestore().collection('users').doc(`${user.uid}`).update({favorites: favoritesToSendBack}) 
                
            }))

        }
    
        
    
    }


}


function removeFilter(filterOption,index){
    
    const removedFilterOption = {data:{}}
    var newFilterOptions = []
    newFilterOptions = [...filterOptions] 
    removedFilterOption['data'] = filterOptionsObject
    delete removedFilterOption.data[Object.keys(filterOption)[0]];

    newFilterOptions.splice(index,1)

    console.log(newFilterOptions)
    console.log(removedFilterOption.data)
    
    setFilterOptions(newFilterOptions)
    setFilterOptionsObject({...removedFilterOption.data})


}




        return(

            <View style = {{height:height}}>   
                
                
                <Animated.ScrollView
                keyboardShouldPersistTaps='always'
            
                showsVerticalScrollIndicator={false}
                ref = {scrollRef}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: {
                        contentOffset: {
                          y: scrollY
                        },
                      }
                    }],{useNativeDriver: false}
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
                            backgroundColor:"#1b2642",
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
                        
                        <ScrollView
                        style = {{marginHorizontal:"1.5%", marginTop:"1.5%"}}
                        horizontal = {true}
                        >   
                            {
                                filterOptions.map((filterOption,index)=>{

                                    return(
                                        
                                            <TouchableOpacity 
                                                style = {{flexDirection:'row',alignItems:"center", backgroundColor:"#1f1d36", borderRadius:10, paddingHorizontal:5, marginHorizontal:5, marginVertical:2}}
                                                onPress = {()=>{removeFilter(filterOption,index)}}
                                                >
                                            
                                                    <Text style = {{fontSize:20 ,color:'white'}}>{Object.values(filterOption)}</Text>
                                                
                                                    <View style = {{backgroundColor:'rgba(191, 191, 191, 0.3)', borderRadius:40, marginLeft:4}}>
                                                        <Icon name={'close'} color={'white'} size={15} />
                                                    </View>


                                            </TouchableOpacity>
                                    
                                    )

                                })
                            }
                            
                        </ScrollView>
                    


                        {/* <View
                        onLayout={(event) => {
                            var {x, y, width, height} = event.nativeEvent.layout;
                            setFilterItemsHeight(height)
                          }}
                        style ={{flexDirection:'row', flexWrap:"wrap"}}
                        >
                    
                            {
                                filterOptions.map((filterOption,index)=>{

                                    return(
                                        
                                            <TouchableOpacity 
                                                style = {{flexDirection:'row',alignItems:"center", backgroundColor:"#1f1d36", borderRadius:10, paddingHorizontal:5, marginHorizontal:5, marginVertical:2}}
                                                onPress = {()=>{removeFilter(filterOption,index)}}
                                                >
                                            
                                                    <Text style = {{fontSize:20 ,color:'white'}}>{Object.values(filterOption)}</Text>
                                                
                                                    <View style = {{backgroundColor:'rgba(191, 191, 191, 0.3)', borderRadius:40, marginLeft:4}}>
                                                        <Icon name={'close'} color={'white'} size={15} />
                                                    </View>


                                            </TouchableOpacity>
                                    
                                    )

                                })
                            }
                        </View> */}
                        <View>    
                     
                                            
                        {
                          userCars.length!=0 ? (           
                                    userCars.map((userCar,index)=>{
                                
                                    
                                        return(
                                        
                                        <CarInfoCard triggerReRender = {triggerReRender} userCar = {userCar} index = {index} carId = {listedCars ? listedCars[index] : ''} receiveFavorites={(index, favoriteFlag)=>{addToFavorites(index,favoriteFlag)}}/>    
                                        )
                                    })
                          ) :
                          (
                            <View style = {{height:height*0.5,justifyContent:"center", alignItems:"center"}}>
                                <Text style = {{fontSize:30}}>Niciun Rezultat!</Text>
                                <Text style = {{marginHorizontal:10, textAlign:"center", fontSize:20}}>Nu am gasit nicio masina care sa corespunda criteriilor de cautare!</Text>
                            </View>
                          )
                        
                        }                       
                    </View>
                </Animated.ScrollView>


                <TouchableOpacity  
                    style = {{
                        position:"absolute",
                        top: MAX_HEIGHT_SEARCHBAR/1.5+55+filterItemsHeight,
                        opacity: searchCircleOpacity,
                        left:5,
                        height:50,
                        width:50,
                        borderRadius:50, 
                        backgroundColor:"#1b2642",
                        justifyContent:"center",
                        alignItems:"center",
                        
                    
                    }}
                    onPress = {()=>{setIsFilterDropped(true)}}>

                    <Icon name='filter' size={25} color='white' />
                        
                </TouchableOpacity> 


                                {/* iconite lupa si filtru */}
                <Animated.View style = {
                    {
                        
                        position:"absolute",
                        top: MAX_HEIGHT_SEARCHBAR/1.5+filterItemsHeight,
                        opacity: searchCircleOpacity,
                        left:5
                    }}>
                        <TouchableOpacity 
                            style = {{
                                height:50,
                                width:50,
                                borderRadius:50, 
                                backgroundColor:"#1b2642",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                            onPress = {()=>{scrollRef.current.scrollTo({x:0,y:0, animated:true})}}>

                            <Icon name='search' size={25} color='white' />
                                
                        </TouchableOpacity>


                </Animated.View>


                            
               

                   

                {/* iconita calendar */}   
                <Animated.View style = {{position:'absolute', right:"2%", top:calendarTopPosition}}>
                <TouchableOpacity onPress = {()=>{console.log('am apasat'); setIsDroped(true)}}>
                    <Image source = {require('../../images/calendar2.png')} style = {{height:60,width:60}}/>
                </TouchableOpacity>
                </Animated.View>


                <Loader loading={loading}/>
                <DatePicker dropDatePicker={isDroped} removeDatePicker={()=>{setIsDroped(false)}}/>
                <Filter filterOptionsObject = {filterOptionsObject} dropFilter = {isFilterDropped} removeFilter = {()=>{setIsFilterDropped(false)}} returnFilterOptions = {(values, valuesObject)=>{setFilterOptions(values); setFilterOptionsObject(valuesObject); console.log("filterOptions:",values)}}/>                
                <TouchableOpacity 
                                style = {{
                                    
                                    borderRadius:50, 
                                    backgroundColor:"#1b2642",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    position:"absolute",
                                    bottom:"5%",
                                    left:"5%",
                                    elevation:5,
                                 
                                    height:50,
                                    width:50,
                                    paddingTop:"3%"
                                    
                              
                                    
                                }}
                                onPress = {()=>{navigation.navigate('FavoriteCarsScreen', {reRenderSearchList: (triggerNumber)=>{setTriggerReRender(triggerNumber)}})}}>

                                    <Icon name='heart' size={35} color='white' />
                                    
                            </TouchableOpacity>       
            </View>
        )

}



export default SearchListScreen


const styles = StyleSheet.create({



})







     