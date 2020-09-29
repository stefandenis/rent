import React, {useState, useEffect} from 'react'
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
    Alert,
    CheckBox
    } from 'react-native';

const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'


interface Props {
    
     importedStyle: object,
     goBackToSettings: () => (void)
    
    }

const PhoneNumber: React.FC<Props> = (props) => {

    const [number, setNumber] = useState('')
    const [isSelected, setSelection] = useState(false); 


    function changePhone(){
            
       
        const user = auth().currentUser
        if(user){
            user.updateProfile({
                phoneNumber: number
            })
    
            firestore().collection('users').doc(`${user.uid}`).update({
                phoneNumber: number,
                phoneNumberDisplay: isSelected
            })
        }
        


    }

return(

    <Animated.View style = {props.importedStyle}    >
        
   
        
        <TouchableOpacity style ={{position:'absolute', left:"10%",top:"5%"}} onPress={()=>{props.goBackToSettings()}}>
              <Icon name='arrow-back' size={height/22} color='gray' />
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
            <CheckBox
            value={isSelected}
            onValueChange={()=>{setSelection(!isSelected)}}
            style={styles.checkbox}
          
            />
    
            
            <Text style={styles.label}>Make my phone number visible to others</Text>
   
            
        </View>
        
        <View style = {styles.changePhoneFormContainer}>
            <TextInput          
          
           placeholder="Phone Number..." 
           placeholderTextColor="rgb(0,0,0)"   
           keyboardType = 'numeric'   
           onChangeText={text => setNumber(text)}/>
       </View>

       <TouchableOpacity style ={styles.changePhoneButton} onPress={()=>{changePhone();props.goBackToSettings()}}>
          <View>
            <Text>Change phone number</Text>
          </View>
        </TouchableOpacity> 

    </Animated.View>

    

)



}

const styles = StyleSheet.create({
    checkboxContainer:{
        flexDirection: "row",
        marginBottom: 5,
        backgroundColor:"white",
        borderRadius:25,
    },
    checkbox:{
        alignSelf:"center"
    },

    label:{
        margin:8
    },
    
    
    changePhoneFormContainer:{
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
    changePhoneButton:{
        width:width/1.5,
        backgroundColor:"rgba(90,128,232,0.8)",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:"2%",
        marginBottom:"2%"

    }


})

export default PhoneNumber;
