import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, TextInput, CheckBox, TouchableOpacity,Modal,ScrollView, SafeAreaView } from 'react-native'
import TermsAndConditions from '../../CustomComponents/TermsAndConditions'
import Icon from 'react-native-vector-icons/Ionicons';
import {RegisterErrors} from '../../config/RegisterErrors'
import { Input } from 'react-native-elements';

function RegisterScreen(): JSX.Element{


    const pwInput = React.createRef();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [isSelected, setSelection] = useState(false); 
    const [openTerms, setOpenTerms] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passError, setPassError] = useState<string | null>(null);
    const [confPassError, setConfPassError] = useState<string | null>(null);
    const [isTermsChecked, setIsTermsChecked] = useState<string | null>(null); 
   

    function _validateEmail(): boolean{
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email))
            return true;
        else{
            setEmailError(RegisterErrors.emailError);
            return false;
        }
       
    }
    function _validatePw(): boolean{
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        
        if(re.test(password)) return true;
        else{
            setPassError(RegisterErrors.pwWeak);
            return false
        }
    }
    function _pwMatch(): boolean{

        if(password == confirmPassword){
            
            return true;
        }else{
            setConfPassError(RegisterErrors.pwConfirmMatchError);
            return false;
        }
    }

    function _validateAge(): boolean{
            return true;
    }

    function _validateTermsAndCond(): boolean{
            return true;
    } 

   


   function _validateFields(){

    let result: boolean = true;

    if(!_validateEmail()) result = false;
    if(!_validateAge()) result = false;
    if(!_validatePw()) result = false;
    if(!_validateTermsAndCond()) result = false;
    if(!_pwMatch()) result = false;

    return result;

    

   }

    function validateFieldsAndRegister(){

      
        if(_validateFields()){

                //trimite la firebase
                console.log("okay")

        }else{

           console.log('wrong fields')

            
        }

    }








    return(
        <SafeAreaView style={{flex:1}}>
     
        <ScrollView>
        <View style = {{flex:1, alignItems: "center", justifyContent:"center",backgroundColor:"white"}}>
        
        <TermsAndConditions open = {openTerms} close = { ()=>setOpenTerms(false) }/>
    
        <Image source={require("../../images/logoR.png")} style={styles.logoImg}/>
        

        <Text style={styles.mainText}>Register</Text>
        


        
          <Input  
            containerStyle={styles.inputView}
            inputContainerStyle={{backgroundColor:"white"}}
            placeholder="First Name..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            onChangeText={text => setFirstName(text)}/>
        
      
          <Input  
            containerStyle={styles.inputView}
            placeholder="Last Name..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            onChangeText={text => setLastName(text)}/>
        
       
        
          <Input 
            onFocus={()=>{setPassError(null)}}
            
            secureTextEntry
            containerStyle={styles.inputView}
            placeholder="Password..." 
            placeholderTextColor="rgb(0,0,0)" 
            errorStyle={{ color: 'red' }}
            errorMessage={passError}
            onChangeText={text =>setPassword(text)}/>
       

      
          <Input  
            secureTextEntry
            onFocus = {()=>{setConfPassError(null)}}
            containerStyle={styles.inputView}
            placeholder="Confirm Password..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            errorMessage={confPassError}
            
            onChangeText={text =>setConfirmPassword(text)}/>
      

       
          <Input  
            containerStyle={styles.inputView}
            onFocus={()=>{setEmailError(null)}}
            placeholder="Email..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            errorMessage={emailError}
            
            onChangeText={text => setEmail(text)}/>
       

         
        <View style={styles.checkboxContainer}>
            <CheckBox
            value={isSelected}
            onValueChange={()=>{setSelection(!isSelected)}}
            style={styles.checkbox}
          
            />
    
            <TouchableOpacity onPress = {()=> {setOpenTerms(true);}}>
            <Text style={styles.label}>Terms and Conditions</Text>
            </TouchableOpacity>

        </View>

        <TouchableOpacity  style={{...styles.inputView, ...styles.regBtnContainer}} onPress = {()=>{validateFieldsAndRegister()}}>
            <Text style = {styles.txtRegBtn}>Register</Text>
        </TouchableOpacity>
        

        </View>
        
</ScrollView>

</SafeAreaView>
    )
}


const styles = StyleSheet.create({
    mainText:{
        fontWeight:"bold",
        fontSize:40,
        color:"rgb(58,179,225)",
        marginBottom:"5%"
      },
    logoImg:{
        width:"50%",
        height:undefined,
        aspectRatio:1
      },
      inputView:{
        width:"80%",
        backgroundColor:"white",
        borderRadius:25,
        height:"7%",
        marginBottom:20,
        justifyContent:"center",
        
        
        
      },
      inputText:{
       textAlign:'center',
        color:"black",
    
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor:"white",
        borderRadius:25,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
      regBtnContainer:{
        backgroundColor:"rgb(58,179,225)",
        
        
      },
      txtRegBtn:{
        textAlign:"center",
        color:"white",
        fontSize:20
      }
})


export default RegisterScreen;