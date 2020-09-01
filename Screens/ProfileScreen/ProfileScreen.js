import React, {useState, useEffect} from 'react';
import TermsAndConditions from '../../CustomComponents/TermsAndConditions'
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
  Animated,
  TextInput,
  ProgressBarAndroid,
  Alert
  } from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Hoshi } from 'react-native-textinput-effects';
import { Input } from 'react-native-elements';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
import database from '@react-native-firebase/database'
import * as Progress from 'react-native-progress';
import PhoneNumber from '../../CustomComponents/PhoneNumber'
import ChangePassword from '../../CustomComponents/ChangePassword'
import PrivacyPolicy from '../../CustomComponents/PrivacyPolicy'


function ProfileScreen( {route,navigation}) {
  const noProfileURL = require('../../images/noPhotoURL.png')
  const rippleOverflow = false;
  const rippleColor = 'gray'
  const user = auth().currentUser
  const [count, setCount] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const [photoSource, setPhotoSource] = useState();
  const leftMarginSettings = useState(new Animated.Value(0))[0]
  const leftMarginSettingsScreen = useState(new Animated.Value(1000))[0]
  const leftMarginChangeNameScreen = useState(new Animated.Value(1000))[0]
  const leftMarginChangeProfilePictureScreen = useState(new Animated.Value(1000))[0]
  const leftMarginPhoneNumberScreen = useState(new Animated.Value(1000))[0]
  const leftMarginChangePasswordScreen = useState(new Animated.Value(1000))[0]
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [disabledUpload, setDisableUpload] = useState(true)
  const [buttonColor, setButonColor] = useState('gray')
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)


useEffect(()=>{

  const uid = auth().currentUser.uid
  console.log(user.photoURL)
  

  database()
        .ref(`/users/${uid}/`)
        .on('value', snapshot=>{
          console.log('am intrat in on value')
          console.log('User data: ', snapshot.val());
          const displayName_firstName = snapshot.val().displayName.split(' ')[0]
          const displayName_lastName = snapshot.val().displayName.split(' ')[1]
          const photoURL = snapshot.val().photoURL
          const phoneNumber = snapshot.val().phoneNumber
          if(photoURL){
            if(photoURL.includes('facebook')){
              setPhotoSource({uri:`${photoURL}?type=large`})
            }else{
              setPhotoSource({uri:`${photoURL}`})
            }
          }else{
            setPhotoSource(noProfileURL)
          }
          
          displayName_lastName ? setLastName(displayName_lastName) : setLastName('')
          displayName_firstName ? setFirstName(displayName_firstName) : setFirstName('')
          
          phoneNumber ? setPhoneNumber(phoneNumber) : setPhoneNumber('no phone number') 
        
        })
        



}, [])



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

function displayPhoneNumber(){
  
  return(<Text style = {{fontSize:10, color:"gray"}}>{phoneNumber}</Text>)
  
  
}


function changeNameForm(){
  Animated.timing(leftMarginSettingsScreen,{
    toValue:-1000,
    Duration:1000,
    useNativeDriver:false
  }).start()

  Animated.timing(leftMarginChangeNameScreen,{
    
    toValue:0,
    Duration:1000,
    useNativeDriver:false,


  }).start()

}

function changePasswordForm(){

  Animated.timing(leftMarginSettingsScreen,{
    toValue:-1000,
    Duration:1000,
    useNativeDriver:false
  }).start()

  Animated.timing(leftMarginChangePasswordScreen,{
    
    toValue:0,
    Duration:1000,
    useNativeDriver:false,


  }).start()

}

function changeEmailForm(){

}

function changeProfilePictureForm(){
  
  Animated.timing(leftMarginSettingsScreen,{
    toValue:-1000,
    Duration:1000,
    useNativeDriver:false
  }).start()

  Animated.timing(leftMarginChangeProfilePictureScreen,{
    
    toValue:0,
    Duration:1000,
    useNativeDriver:false,


  }).start()

}

function changePhoneNumberForm(){

  Animated.timing(leftMarginSettingsScreen,{
    toValue:-1000,
    Duration:1000,
    useNativeDriver:false
  }).start()

  Animated.timing(leftMarginPhoneNumberScreen,{
    
    toValue:0,
    Duration:1000,
    useNativeDriver:false,


  }).start()



}

function deleteAccount(){

}

function goBackToSettings(){

  Animated.timing(leftMarginChangeNameScreen,{
    
    toValue:1000,
    Duration:1000,
    useNativeDriver:false,


  }).start()

  Animated.timing(leftMarginChangeProfilePictureScreen,{
    
    toValue:1000,
    Duration:1000,
    useNativeDriver:false,


  }).start()
  
  Animated.timing(leftMarginPhoneNumberScreen,{
    toValue:1000,
    Duration:1000,
    useNativeDriver:false
  }).start()

  Animated.timing(leftMarginChangePasswordScreen,{
    toValue:1000,
    Duration:1000,
    useNativeDriver:false
  }).start()



  Animated.timing(leftMarginSettingsScreen,{
    toValue:0,
    Duration:1000,
    useNativeDriver:false
  }).start()

  
  

}


 function changeName(){

  
  const update = {}
  
   auth().currentUser.updateProfile({
    displayName: firstName
  })
    .then(()=>{
      console.log('in update  profile')
        auth().currentUser.reload().then(()=>{
          console.log('in reload  profiel')
          console.log(user.displayName)
          update[`/users/${user.uid}/displayName`] = `${firstName} ${lastName}`
         
          
          database().ref().update(update).then(()=>{console.log('done')})
        })
        
    }).catch(()=>{console.log('the name could not be updated')})


    


}


function changeProfilePicture(){

  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      console.log(source);
      setImage(source);
      setButonColor("rgba(90,128,232,0.8)")
      setDisableUpload(false)
    }
  });


  

}

async function uploadImage(){
  const update = {}
  const { uri } = image;
  const filePath = `${user.uid}/profilePicture`
  
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    
  setUploading(true);
  setTransferred(0);
  
  const task = storage()
  .ref(filePath)
  .putFile(uploadUri);
// set progress state
  task.on('state_changed', snapshot => {
  setTransferred(
    Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  );
  })

  try {
    await task;
  } catch (e) {
    console.error(e);
  }

  setUploading(false);
  Alert.alert(
    'Photo uploaded!',
    
  );
  setImage(null);
  setButonColor("gray")
  setDisableUpload(true)

  update[`/users/${user.uid}/photoURL`] = await storage()
    .ref(filePath)
    .getDownloadURL();   
  database().ref().update(update)
  auth().currentUser.updateProfile({
    photoURL: update[`/users/${user.uid}/photoURL`] 
  }).then(()=>{ setPhotoSource({uri:update[`/users/${user.uid}/photoURL`]})})
 
  

}



  
return (
      
    <View style = {styles.container}>
     
      <View style = {styles.infoContainer}> 
        <View style = {styles.profilePicBorder}>
          <Image source={photoSource} style={styles.profilePic}/>
        </View>
        
        <TermsAndConditions open = {openTerms} close = { ()=>setOpenTerms(false) }/>
        <PrivacyPolicy open = {openPrivacyPolicy} close = { ()=>setOpenPrivacyPolicy(false) }/>

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
        onPress={()=>{setOpenTerms(true)}}
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
        onPress={()=>{setOpenPrivacyPolicy(true)}}
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
      <TouchableOpacity style ={{position:'absolute', left:"10%",top:"5%"}} onPress={()=>{goBackToProfile()}}>
              <Icon name='arrow-back' size={height/22} color='gray' />
      </TouchableOpacity>
      
      <View style = {styles.limiter}></View>
      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{changeNameForm()}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Change name</Text>
          <View style = {styles.iconContainer}>
            <Text style = {{fontSize:10, color:"gray"}}>{`${firstName} ${lastName}`}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>
      
      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{changeEmailForm()}}
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
        onPress={()=>{changePasswordForm()}}
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
        onPress={()=>{changeProfilePictureForm()}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Change Profile Picture</Text>
          <View style = {styles.iconContainer}>
            {/* TODO: LOGIC FOR VERIFYNG IF IT IS CONFIRMED OR NOT */}
            <Icon name='image' size={height/22} color='gray' />
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{changePhoneNumberForm()}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Phone Number</Text>
          <View style = {styles.iconContainer}>
            
            {displayPhoneNumber()}
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>

      <View style = {styles.limiter}></View>
      <TouchableNativeFeedback
        onPress={()=>{deleteAccount()}}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
        <View style = {styles.touchable}>
          <Text style = {styles.textStyle}>Delete Account</Text>
        </View>
      </TouchableNativeFeedback>
      <View style = {styles.limiter}></View>
      <View style = {styles.limiter}></View>
    
      </Animated.View>
      
      

      {/* CHANGE NAME SCREEN *********************************** */}
      <Animated.View style = {{...styles.settingsContainer, left:leftMarginChangeNameScreen}} >
      <TouchableOpacity style ={{position:'absolute', left:"10%",top:"5%"}} onPress={()=>{goBackToSettings()}}>
              <Icon name='arrow-back' size={height/22} color='gray' />
      </TouchableOpacity>

        
        
        
        <View style = {styles.changeNameFormContainer}>
            <TextInput  
           
          
           containerStyle={styles.inputView}
           inputContainerStyle={{backgroundColor:"white"}}
           placeholder="First Name..." 
           placeholderTextColor="rgb(0,0,0)"
          
           
           onChangeText={text => setFirstName(text)}/>
       
           
          
        </View>

        <View style = {styles.changeNameFormContainer}>
            <TextInput  
           
           containerStyle={styles.inputView}
           inputContainerStyle={{backgroundColor:"white"}}
           placeholder="Last Name..." 
           placeholderTextColor="rgb(0,0,0)"
          
           
           onChangeText={text => setLastName(text)}/>
              
        </View>
        <TouchableOpacity style ={styles.changeNameButton} onPress={()=>{changeName();goBackToSettings()}}>
          <View>
            <Text>Change name</Text>
          </View>
          </TouchableOpacity>
      </Animated.View>




       


      {/* CHANGE PROFILE PICTURE SCREEN ************************************************** */}
      <Animated.View style = {{...styles.settingsContainer, left:leftMarginChangeProfilePictureScreen}} >
      <TouchableOpacity style ={{position:'absolute', left:"10%",top:"5%"}} onPress={()=>{goBackToSettings()}}>
              <Icon name='arrow-back' size={height/22} color='gray' />
      </TouchableOpacity>

      <TouchableOpacity style ={styles.changeNameButton} onPress={()=>{changeProfilePicture()}}>
          <View>
            <Text>Choose photo</Text>
          </View>
        </TouchableOpacity>

        {image !== null ?

        (<View style = {styles.uploadPhoto}>
          <Image source={image} style={styles.uploadPic}/>
        </View>) : 

        (null)
        }

        {uploading ? (
          <View style = {{paddingBottom:5}}>
         <Progress.Bar progress = {transferred} width={width/1.5}/>
         </View>
        ) :
        (<TouchableOpacity  disabled={disabledUpload} style ={{...styles.changeNameButton, backgroundColor:buttonColor }} onPress={()=>{uploadImage()}}>
          <View>
            <Text>Upload image</Text>
          </View>
        </TouchableOpacity>) 
        }


      </Animated.View>





      <PhoneNumber importedStyle = {{...styles.settingsContainer, left: leftMarginPhoneNumberScreen}} goBackToSettings = {()=>{goBackToSettings()}} />
      <ChangePassword importedStyle ={{...styles.settingsContainer, left: leftMarginChangePasswordScreen}} goBackToSettings = {()=>goBackToSettings()}/>
      
      
      
      
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
      
     
    }, 
    changeNameFormContainer:{
      alignItems:"center",
      justifyContent:"center",
      
      shadowColor: "#000",
      shadowOffset: {
	      width: 0,
	      height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderRadius:50,
      width:width/1.5
      
    },
    inputView:{
      width:width/1.5,
      backgroundColor:"white",
      borderRadius:25,
      height:"7%",
      marginBottom:20,
      justifyContent:"center",
      
      
      
    },
  
    changeNameButton:{
      width:width/1.5,
    backgroundColor:"rgba(90,128,232,0.8)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:"2%",
    marginBottom:"2%"
    },

    uploadPhoto:{
    
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
      uploadPic:{
  
        width:"50%",
        height:undefined,
        aspectRatio:1, 
              
    },
  
})

  export default ProfileScreen;