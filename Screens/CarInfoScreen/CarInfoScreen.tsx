import React, {useEffect, useState,useRef} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView,Modal, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CalendarPicker from 'react-native-calendar-picker';
import TextInputCustom from '../../CustomComponents/textinput'
import {SharedElement} from 'react-navigation-shared-element'
import { USER_DEFAULT_VALUE } from '../../context/user.context';

navigator.geolocation = require('@react-native-community/geolocation');
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'

function CarInfoScreen( {navigation, route}){

    const [index, setIndex] = useState(0) 
    const [imageKey, setImageKey] = useState()
    const [userPhoto, setUserPhoto] = useState()
    const [userName, setUserName] = useState('user user')
    const [address, setAddress] = useState()
    const [modalVisibleDate, setModalVisibleDate] = useState(false)
    const mapRef = useRef()
    const minDate = new Date(); // Today
    const [startDate, setStartDate] = useState('Selecteaza o data');
    const [endDate, setEndDate] = useState('Selecteaza o data');
    const [startHour, setStartHour] = useState();
    const [endHour, setEndHour] = useState();
    const [modalVisibleHour, setModalVisibleHour] = useState(false);
   

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


function compareDates(date1,date2,time1,time2){

   
 
    var [day1, month1, year1] = date1.split('-');
    var [day2, month2, year2] = date2.split('-');

    var [hour1, minutes1] = time1.split(':');
    var [hour2, minutes2] = time2.split(':');

    var date1Obj = new Date(`${year1}-${month1}-${day1}T${hour1}:${minutes1}:00Z`)
    var date2Obj = new Date(`${year2}-${month2}-${day2}T${hour2}:${minutes2}:00Z`)
    console.log('date1', `${year1}-${month1}-${day1}T${hour1}:${minutes1}:00Z`)
    console.log(date1Obj.getTime())
   
    console.log('date2',`${year2}-${month2}-${day2}T${hour2}:${minutes2}:00Z` )
    console.log(date2Obj.getTime())
    console.log('date1 > date2',((date1Obj.getTime() > date2Obj.getTime()) ? true : false ))
   return (date1Obj.getTime() > date2Obj.getTime()) ? true : false 

}


function bookCar(){
    const user = auth().currentUser

    console.log('am ajuns in bookcar')
    console.log('user uid', user)
    if(route.params.rentDate == undefined && ((startDate == 'Selecteaza o data' || endDate == 'Selecteaza o data') || (startHour == undefined || endHour == undefined))){
        setModalVisibleDate(true)
    }else{
        const date = new Date()
        var requestDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        var requestHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
        var messageId = 360000*date.getFullYear() + 27616*date.getMonth() + 864*date.getDate() + 36*date.getHours() + 0.060*date.getMinutes() + 0.001*date.getSeconds()

        var requestedCarDocRef = firestore().collection('listedCars').doc(`${route.params.carId}`)
        var requestCarMessageDocRef = firestore().collection('users').doc(`${user.uid}`).collection('messages').doc(`${messageId}`)
        var confirmCarRequestMessageDocRef = firestore().collection('users').doc(`${route.params.userCar.user}`).collection('messages').doc(`${messageId}`)
        var userDocRef = firestore().collection('users').doc(`${user.uid}`)
    
        
           

        


        firestore().runTransaction( transaction => {

            return transaction.get(requestedCarDocRef).then( requestedCar =>{
                
                var scheduledTrips = requestedCar.data().scheduledTrips

                function addTrip(transaction){

                    transaction.update(requestedCarDocRef, {scheduledTrips: scheduledTrips})
                    transaction.update(userDocRef, {carRequested:true})
                    transaction.set(requestCarMessageDocRef, {
                        type: 'carRequest',
                        carId:`${route.params.carId}`,
                        
                        seen:false,
                        requestTimestamp:{
                            requestDate: requestDate, 
                            requestHour: requestHour
                        }, 
                        rentPeriod: {
                            startDate: startDate,
                            endDate: endDate,
                            startHour: startHour,
                            endHour: endHour,        
                        },
                        carOwner: route.params.userCar.user,
                        
                      
                    })
                    transaction.set(confirmCarRequestMessageDocRef, {
                        type: 'confirmCarRequest',
                      
                        carId:`${route.params.carId}`,
                        seen:false,
                        
                        senderData: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        },
                        requestTimestamp: {
                            requestDate: requestDate,
                            requestHour: requestHour
                        },
                        rentPeriod: {
                            startDate: startDate,
                            endDate: endDate,
                            startHour: startHour,
                            endHour: endHour,
                        }
                    })
                }

             

                var currentCar = {

                    rentPeriod: {
                        startDate:startDate,
                        endDate: endDate,
                        startHour:startHour,
                        endHour:endHour
                    },

                    rentUser: user.uid,
                    carOwner: route.params.userCar.user,
                    requestTimestamp:{
                        requestDate: requestDate,
                        requestHour:requestHour
                    },
                    requestStatus: 'pending'
                }

                var i = scheduledTrips.length-1


                return transaction.get(userDocRef).then((userData)=>{
                    if(false){
                        Alert.alert(
                            "Ai solicitat deja o masina",
                            "Ai solicitat deja o masina. Pentru a solicita o alta masina, anuleaza cererea pe care ai facut-o deja. Aceste cereri pot fi vizualizate in sectiunea Mesaje.",
                           
                          );
                    }else{
                        if(i == -1 ){
                            scheduledTrips = [currentCar]
                            addTrip(transaction)
                        }else{
                            
                            //insertion sort for dates 
                            while( i >= 0 && compareDates(scheduledTrips[i].rentPeriod.endDate, currentCar.rentPeriod.startDate, scheduledTrips[i].rentPeriod.endHour , currentCar.rentPeriod.startHour)){
                                console.log(scheduledTrips[i].rentPeriod.endDate)
                                scheduledTrips[i+1] = scheduledTrips[i]
                                i--;
                            }
                            // currentCar.endDate < item.startDate
                            //do this if only the endDate of the currentCar is less than the startDate of the item where i want to insert
                            
                            console.log('index',i)
                            console.log(scheduledTrips.length-1)
                            if(i==scheduledTrips.length-1){
                                scheduledTrips[i+1] = currentCar;
                                addTrip(transaction)
                            }else if(compareDates(scheduledTrips[i+1].rentPeriod.startDate,currentCar.rentPeriod.endDate, scheduledTrips[i+1].rentPeriod.startHour,currentCar.rentPeriod.endHour)){
                                scheduledTrips[i+1] = currentCar;
                                addTrip(transaction)
                            }else{
                                
                                Alert.alert(
                                    "Data indisponibila",
                                    "O alta persoana a selectat aceasta perioada inaintea ta. Pentru a putea vedea masinile disponibile intr-o perioada. Selecteaza o data si ora din calendar.",
                                   
                                  );
                            }
                            

                        }
                    }
                })
                
                
                  
                   
                    
                   

                   
                   
            
      
        })


       
    })


}
}


function onDateChange(date,type){
    console.log(date)
    if(date){
        var day = (date['_i'].day <= 9) ? `0${date['_i'].day}` : date['_i'].day
        var month = (date['_i'].month <= 8) ? `0${date['_i'].month+1}` : date['_i'].month+1 ;
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



function openModalHour(){
    setModalVisibleDate(false)
    setModalVisibleHour(true)


}

        return(

            
            
                <View>

                    
                <ScrollView>
                    
                        {console.log("route params:",route.params.userCar.photos[0])}
                    <View> 
                    <Modal
                        
                        transparent={true}
                        visible={modalVisibleDate}
                        animationType='fade'
                        statusBarTranslucent={true}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisibleDate(false);
                        }}
                    >
                        <TouchableOpacity style = {{backgroundColor:"rgba(1,1,1,0.3)",width:width,height:height,justifyContent: 'center', alignItems:'center'}} onPress={()=>{setModalVisibleDate(false)}}>
                            <TouchableWithoutFeedback
                            
                           
                            style = {{backgroundColor:"white", justifyContent:"center", alignItems:"center", borderRadius:10,elevation:10,zIndex:1}}>
                            
                            <View style = {{backgroundColor:"white", borderRadius:10, width:width*0.9,}}>                                
                                <View style = {{backgroundColor:"#171F33",borderTopLeftRadius:10,borderTopRightRadius:10, justifyContent:"center", alignItems:"center"}}>
                                    <Text style = {{fontSize:22, color:'white', marginHorizontal:10, marginVertical:7}}>Selecteaza perioada de inchiriere</Text>
                                    
                                </View> 
                                <View style = {{}}>
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
                                        height={height*0.5}
                                        
                                        onDateChange={(date,type)=>{onDateChange(date,type)}}
                                    />

                                </View>
                                <View style = {{justifyContent:"center", alignItems:"center"}}>
                                    <Text>Data ridicare: {startDate}</Text>
                                    <Text>Data returnare: {endDate}</Text>
                                </View>
                                
                                <View style = {{justifyContent:"center", alignItems:"center", marginVertical:10}}>
                                    <TouchableOpacity 
                                    style = {{width:width*0.9*0.5,justifyContent:"center", alignItems:"center",borderRadius:20, backgroundColor:"rgb(138,199,253)"}}
                                    onPress = {()=>{openModalHour()}}
                                    >
                                        <Text style = {{fontSize:16, color:"black"}}>Selecteaza ora</Text>
                                    </TouchableOpacity>
                                </View>
                                

                                </View>

                                </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>    
                
                    <Modal
                        
                        transparent={true}
                        visible={modalVisibleHour}
                        animationType='fade'
                        statusBarTranslucent={true}
                        onRequestClose={() => {
                        
                        setModalVisibleHour(false);
                        }}
                    >
                        <TouchableOpacity style = {{backgroundColor:"rgba(1,1,1,0.3)",width:width,height:height,justifyContent: 'center', alignItems:'center'}} onPress={()=>{setModalVisibleHour(false)}}>
                            <TouchableWithoutFeedback                         
                            style = {{backgroundColor:"white", justifyContent:"center", alignItems:"center", borderRadius:10,elevation:10,zIndex:1}}>
                            
                            <View style = {{backgroundColor:"white", borderRadius:10, width:width*0.9,}}>                                
                                
                                <View style = {{backgroundColor:"#171F33",borderTopLeftRadius:10,borderTopRightRadius:10, justifyContent:"center", alignItems:"center"}}>
                                    <Text style = {{fontSize:22, color:'white', marginHorizontal:10, marginVertical:7, textAlign:"center"}}>Selecteaza ora de ridicare si returnare</Text>
                                    
                                </View> 

                                                         
                                    <View style = {{flexDirection:"row", alignItems:"center",justifyContent:"center",marginTop:5}}>
                                        <Text style ={{fontSize:20}}>Ridicare la ora:    </Text>
                                        
                                        
                                        <TextInputCustom getHour = {(v)=>{setStartHour(v)}}/>
                                    </View>
                                
                                    
                                    <View style = {{height:0.2,width:width*0.9, backgroundColor:"black",marginVertical:5}}></View>
                                    
                                    <View style = {{flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
                                        <Text style ={{fontSize:20}}>Returnare la ora: </Text>
                                       
                                    
                                        <TextInputCustom getHour = {(v)=>{setEndHour(v)}}/>

                                    </View>
                                
                                    <View style = {{justifyContent:"center", alignItems:"center", marginVertical:10}}>
                                        <TouchableOpacity 
                                        style = {{width:width*0.9*0.5,justifyContent:"center", alignItems:"center",borderRadius:20, backgroundColor:"rgb(138,199,253)"}}
                                        onPress = {()=>{bookCar()}}
                                        >
                                            <Text style = {{fontSize:16, color:"black"}}>Inchiriaza</Text>
                                        </TouchableOpacity>
                                    </View>
                                
                                </View>
                            
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
                    

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

                <View style = {{alignItems:"center"}}>      
                   
                        {
                            route.params.userCar.details ? (
                                <View style = {styles.detailsBox}>
                                    <Text style = {{fontSize:25,paddingVertical:10}}>Detalii:</Text>
                                    <Text> {route.params.userCar.details}</Text>
                                </View>
                            ):
                            (
                                <View></View>
                            )
                        }
                    
                    
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
                





          
                    
                    <View style  = {{flexDirection:"row"}}>
                        <View style = {{...styles.profilePicBorder}}>
                            <Image source={{uri: userPhoto}} style={styles.profilePic}/>
                        </View>
                        
                        <View style = {{ flex:1,flexWrap:"wrap",justifyContent:"center", alignItems:"center",}}>
                            <Text style = {{fontSize:18}}>Masina oferita de: {userName.split(' ')[0]}</Text>   
                            {
                                route.params.userCar.trips ? (
                                    <Text style = {{fontSize:20}}>Aceasta masina a obtinut {route.params.userCar.stars} ⭐️ in {route.params.userCar.trips} calatorii</Text>
                                ) :
                                (
                                    <Text style = {{fontSize:20,textAlign:"center"}}>Fii primul care calatoreste cu aceasta masina</Text>
                                )

                                
                            }
                            
                            
                        </View>
                    </View>
                    <View style = {{justifyContent:"center", alignItems:'center'}}>
                        <TouchableOpacity style ={styles.bookCarButton} onPress={()=>{bookCar()}}>
                            <View>
                                <Text style = {{fontSize:50/2.5, color:"white"}}>Inchiriaza</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                      
               
                    <View>

                        
                   
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
        },
        bookCarButton:{
            width:width/1.5,
            backgroundColor:"#1b2642",
            borderRadius:25,
            height:50,
            alignItems:"center",
            justifyContent:"center",
            marginTop:20,
            marginBottom:10
        },
        detailsBox:{
            justifyContent:"center",
            
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