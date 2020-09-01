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
import { Input } from 'react-native-elements';
import {RegisterErrors} from '../config/RegisterErrors'

interface Props {
    
     importedStyle: object,
     goBackToSettings: () => (void)
    
    }

const ChangePassword: React.FC<Props> = (props) => {

    const [number, setNumber] = useState('')
    const [isSelected, setSelection] = useState(false); 
    const [passError, setPassError] = useState<string | undefined>(undefined);
    const [confPassError, setConfPassError] = useState<string | undefined>(undefined);
    const [oldPwError, setOldPwError] = useState<string | undefined>(undefined)
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

   

function reauthenticate(){
    var user = auth().currentUser
    
    var credential = auth.EmailAuthProvider.credential(user?.email, oldPassword)

    return user?.reauthenticateWithCredential(credential)

}

    function _validatePw(): boolean{
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        
        if(re.test(newPassword)) return true;
        else{
            setPassError(RegisterErrors.pwWeak);
            return false
        }
    }
    function _pwMatch(): boolean{

        if(newPassword == confirmNewPassword){
            
            return true;
        }else{
            setConfPassError(RegisterErrors.pwConfirmMatchError);
            return false;
        }
    }

    function changePassword(){
        var user = auth().currentUser
       reauthenticate()?.then(()=>{
            
            const validatePw: boolean = _validatePw()
            const pwMatch: boolean = _pwMatch()

            if(_validatePw && _pwMatch){
                user?.updatePassword(newPassword).then(()=>{
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmNewPassword('')
                    Alert.alert("Password changed",'Your password has been changed')
                    props.goBackToSettings();
                })
            }
            

       }).catch(error =>{
        
           Alert.alert("Password error","You are logged in with facebook or google. You don't have a password.To create an accout with email and password log-out and register using the sign-up method")
       })


    }
return(

    <Animated.View style = {props.importedStyle}    >
        
   
        
        <TouchableOpacity style ={{position:'absolute', left:"10%",top:"5%"}} onPress={()=>{props.goBackToSettings()}}>
              <Icon name='arrow-back' size={height/22} color='gray' />
        </TouchableOpacity>

        
        
        
      
        <Input 
            onFocus={()=>{setOldPwError(undefined)}}
            
            secureTextEntry
            containerStyle={styles.inputView}
            placeholder="Old Password..." 
            placeholderTextColor="rgb(0,0,0)" 
            errorStyle={{ color: 'red' }}
            errorMessage={oldPwError}
            onChangeText={text =>setOldPassword(text)}/>

        <Input 
            onFocus={()=>{setPassError(undefined)}}
            
            secureTextEntry
            containerStyle={styles.inputView}
            placeholder="New Password..." 
            placeholderTextColor="rgb(0,0,0)" 
            errorStyle={{ color: 'red' }}
            errorMessage={passError}
            onChangeText={text =>setNewPassword(text)}/>
      
        <Input 
            onFocus={()=>{setConfPassError(undefined)}}
            
            secureTextEntry
            containerStyle={styles.inputView}
            placeholder="Confirm new password..." 
            placeholderTextColor="rgb(0,0,0)" 
            errorStyle={{ color: 'red' }}
            errorMessage={confPassError}
            onChangeText={text =>setConfirmNewPassword(text)}/>


       <TouchableOpacity style ={styles.changePasswordButton} onPress={()=>{changePassword(); }}>
          <View>
            <Text>Change password</Text>
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
    
    
    changePasswordFormContainer:{
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
    changePasswordButton:{
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

export default ChangePassword;
