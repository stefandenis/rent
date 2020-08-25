import React, {useState, useEffect} from 'react';

import {
  Text, 
  View, 
  Button, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity, 
  Image, 
  requireNativeComponent,
  Dimensions,
  TouchableNativeFeedback,
  Platform,
  Animated
  } from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

function ProfileScreen( {route,navigation}) {

  const rippleOverflow = false;
  const rippleColor = 'gray'
  const user = auth().currentUser
  const [count, setCount] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const [photoSource, setPhotoSource] = useState('../../images/noPhotoURL.png');
  const leftMarginSettings = useState(new Animated.Value(0))[0]
  const leftMarginSettingsScreen = useState(new Animated.Value(1000))[0]

useEffect(()=>{

  if(user.photoURL){

    if(user.providerData[0].providerId=='facebook.com')
    setPhotoSource(`${user.photoURL}?type=large`) 
  }



}, [photoSource])

  
function slideToSettings(){

  Animated.timing(leftMarginSettings,{
    toValue:-1000,
    duration:1000,
    useNativeDriver:false
  }).start()

  Animated.timing(leftMarginSettingsScreen,{
    toValue:0,
    Duration:1000,
    useNativeDriver:false
  }).start()
}

function goBackToProfile(){
  Animated.timing(leftMarginSettingsScreen,{
    toValue:1000,
    Duration:1000,
    useNativeDriver:false
  }).start()
 
  Animated.timing(leftMarginSettings,{
    toValue:0,
    duration:1000,
    useNativeDriver:false
  }).start()

 
}

console.log(user.photoURL)

  
return (
      
    <View style = {styles.container}>
     
      <View style = {styles.infoContainer}> 
        <View style = {styles.profilePicBorder}>
          <Image source={{uri: photoSource}} style={styles.profilePic}/>
        </View>
        

      <Animated.View style = {{...styles.animatedStyle, marginLeft:leftMarginSettings }}>
      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{slideToSettings()}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Settings</Text>
          <View style = {styles.iconContainer}>
            <Icon name='settings' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>


      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{console.log('button pressed')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Listed cars</Text>
          <View style = {styles.iconContainer}>
            <Icon name='car' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{console.log('button pressed')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Trips history</Text>
          <View style = {styles.iconContainer}>
            <Icon name='earth' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{console.log('button pressed')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Terms and conditions</Text>
          <View style = {styles.iconContainer}>
            <Icon name='newspaper' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{console.log('button pressed')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Privacy policy</Text>
          <View style = {styles.iconContainer}>
            <Icon name='lock-closed' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{auth().signOut(); navigation.navigate('Search')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Sign-out</Text>
          <View style = {styles.iconContainer}>
            <Icon name='log-out' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>
      
      </Animated.View>
      

      {/* SETTINGS SCREEN SLIDE */}
      <Animated.View style = {{...styles.settingsContainer, left:leftMarginSettingsScreen}}>
      <TouchableOpacity style ={{position:'absolute', left:"10%",top:"15%"}} onPress={()=>{goBackToProfile()}}>
              <Icon name='arrow-back' size={height/22} color='gray' />
      </TouchableOpacity>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{auth().signOut(); navigation.navigate('Search')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Change name</Text>
          <View style = {styles.iconContainer}>
            <Text style = {{fontSize:10, color:"gray"}}>{user.displayName}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>
      
      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{auth().signOut(); navigation.navigate('Search')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Change email</Text>
          <View style = {styles.iconContainer}>
          <Text style = {{fontSize:10, color:"gray"}}>{user.email}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{auth().signOut(); navigation.navigate('Search')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Change password</Text>
          <View style = {styles.iconContainer}>
          <Text style = {{fontSize:10, color:"gray"}}>*****</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{auth().signOut(); navigation.navigate('Search')}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Confirm Email</Text>
          <View style = {styles.iconContainer}>
            {/* TODO: LOGIC FOR VERIFYNG IF IT IS CONFIRMED OR NOT */}
            <Icon name='checkmark-circle' size={height/22} color='green' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>
  
    
      </Animated.View>
      
      
      
      
      
      
      
      </View>



    </View>


    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"flex-end",
    backgroundColor:"white"

  },
  infoContainer:{
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.39,
  shadowRadius: 8.30,
  
  elevation: 13,
  height:"87%",
  width:"100%",
  backgroundColor:"white",
  position:'relative',
  alignItems:"center",
  
  },
  profilePic:{
  
      width:"30%",
      height:undefined,
      aspectRatio:1, 
            
  },

  profilePicBorder:{
    
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
    top:"-10%",
    },
    touchable:{
      width:"100%",
      height:height/12,
      alignItems:"center",
      paddingLeft:width/2,
      flexDirection:'row',
      position:'relative'

    },
    limiter:{
      backgroundColor:"gray",
      borderWidth:0.1,
      width:"90%",

    },
    textStyle:{
      position:"absolute",
      left:'20%',
      fontSize:20,
      color:"gray"
    },
    iconContainer:{
      position:"absolute",
      right:'10%'
    },

    animatedStyle:{
      height:"100%",
      width:"100%",
      backgroundColor:"white",
      alignItems:"center",
    },

    settingsContainer:{
      position:'absolute',
      height:"100%",
      width:"100%",
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center"
      
     
    }
  
  
})

  export default ProfileScreen;