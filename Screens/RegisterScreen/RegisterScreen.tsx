import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, TextInput, CheckBox, TouchableOpacity,Modal,ScrollView, SafeAreaView } from 'react-native'
import TermsAndConditions from '../../CustomComponents/TermsAndConditions'
import Icon from 'react-native-vector-icons/Ionicons';
import {RegisterErrors} from '../../config/RegisterErrors'
import { Input } from 'react-native-elements';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import DatePicker from '../../CustomComponents/DatePicker'


function RegisterScreen(): JSX.Element{

    
    const pwInput = React.createRef();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState<Date | undefined>(undefined);
    const [isSelected, setSelection] = useState(false); 
    const [openTerms, setOpenTerms] = useState(false);
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [passError, setPassError] = useState<string | undefined>(undefined);
    const [confPassError, setConfPassError] = useState<string | undefined>(undefined);
    const [isTermsChecked, setIsTermsChecked] = useState<string | undefined>(undefined); 
    const [acceptTerms, setAcceptTerms] = useState(true);
    const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);
    const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);

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
    
    function _validateFirstName(): boolean{

      if(firstName.length != 0){
        return true
      }else{
        setFirstNameError(RegisterErrors.nameError);
        return false;
      }

    }

    function _validateLastName(): boolean{

      if(lastName.length!=0){
        return true;
      }else{
        setLastNameError(RegisterErrors.nameError);
        return false
      }
    }

    

    function _validateTermsAndCond(): boolean{      
      setAcceptTerms(isSelected);
      return isSelected;
      } 

   function showTermsError(){

      if(!acceptTerms){
        return(
          <View style = {{marginBottom:"5%"}}>
              <Text style = {{color:'red', textAlign:'center',paddingHorizontal:"10%"}}>You must agree with the terms and conditions in order to register.</Text>
          </View>
        )
      }
  }


   function _validateFields(){

    let result: boolean = true;
    if(!_validateFirstName()) result = false;
    if(!_validateLastName()) result = false;
    if(!_validatePw()) result = false;
    if(!_validateEmail()) result = false;
    if(!_pwMatch()) result = false;
    if(!_validateAge()) result = false;
    if(!_validateTermsAndCond()) result = false;
    return result;  
   }

    function validateFieldsAndRegister(){
     
        if(_validateFields()){

          //trimite la firebase

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
           
            onFocus={()=>{setFirstNameError(undefined)}}
            containerStyle={styles.inputView}
            inputContainerStyle={{backgroundColor:"white", borderRadius:30}}
            placeholder="First Name..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            errorMessage={firstNameError}
            onChangeText={text => setFirstName(text)}/>
        
      
          <Input  
            onFocus={()=>{setLastNameError(undefined)}}
            containerStyle={styles.inputView}
            placeholder="Last Name..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            
            errorMessage={lastNameError}
            onChangeText={text => setLastName(text)}/>
        
        <Input  
            containerStyle={styles.inputView}
            onFocus={()=>{setEmailError(undefined)}}
            placeholder="Email..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            errorMessage={emailError}
            
            onChangeText={text => setEmail(text)}/>
        
          <Input 
            onFocus={()=>{setPassError(undefined)}}
            
            secureTextEntry
            containerStyle={styles.inputView}
            placeholder="Password..." 
            placeholderTextColor="rgb(0,0,0)" 
            errorStyle={{ color: 'red' }}
            errorMessage={passError}
            onChangeText={text =>setPassword(text)}/>
       

      
          <Input  
            secureTextEntry
            onFocus = {()=>{setConfPassError(undefined)}}
            containerStyle={styles.inputView}
            placeholder="Confirm Password..." 
            placeholderTextColor="rgb(0,0,0)"
            errorStyle={{ color: 'red' }}
            errorMessage={confPassError}
            
            onChangeText={text =>setConfirmPassword(text)}/>
        
        <View style={styles.checkboxContainer}>
            <CheckBox
            value={isSelected}
            onValueChange={()=>{setSelection(!isSelected)}}
            style={styles.checkbox}
          
            />
    
            <TouchableOpacity onPress = {()=> {setOpenTerms(true);}}>
            <Text style={styles.label}>I agree with Terms and Conditions</Text>
            </TouchableOpacity>
            
        </View>
        
        {showTermsError()}

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
        marginBottom: 5,
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