import React, {useEffect, useState}  from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground, Image,  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import auth from '@react-native-firebase/auth';

export default function LogInScreen({navigation}){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  function emailOrPassWrongError(){

    if(wrongPassword){
      return(
        <Text style = {{fontSize: 14, color:"red"}}>Wrong Email or Password</Text>
      )
    }


  }

  function setInvalidEmailError(){

    if(invalidEmail){
      return(
        <Text style = {{fontSize: 14, color:"red"}}>Invalid Email!</Text>
      )
    }

  }

  function authenticate(){
    

    auth().signInWithEmailAndPassword(email, password)
      .then(function(result) {
              navigation.goBack();
            })
      .catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        if (errorCode === 'auth/wrong-password') {
          console.log("wrong pass")
          setWrongPassword(true);
        }
        if(errorCode === "auth/user-not-found"){
          console.log('user not found');
          setWrongPassword(true);
        }
        if(errorCode === "auth/invalid-email"){
          console.log('invalid email');
          setInvalidEmail(true);
        }
      
    });
  
    
    
  
  
  }
  
  return (
     
      <ImageBackground source={require("../../images/authPhoto.jpg")} style={styles.container}>
       
      <TouchableOpacity style={{position:"absolute", top:"6%",left:"5%"}} onPress={()=> navigation.goBack()}>
        <Ionicons name="close" size={35} color="white" />
      </TouchableOpacity>
        
        <Image source={require("../../images/logoR.png")} style={styles.logoImg}/>
      
        
      
        <Text style={styles.mainText}>Log in</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#FFF"
            onChangeText={text => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#FFF"
            onChangeText={text =>setPassword(text)}/>
        </View>
        {emailOrPassWrongError()}
        {setInvalidEmailError()}

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={()=>{authenticate()}}>
          <Text style={styles.loginText}>Log-In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupBtn} onPress = {()=> navigation.navigate("Register")} >
          <Text style={styles.loginText}>Sign-Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fbBtn}>
        <Ionicons name="logo-facebook" size={35} color="white" style={styles.icons}/>
          <Text style={styles.fbText}>Continue With Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gBtn}>
        <Ionicons name="logo-google" size={35} color="white" style={styles.icons} />
          <Text style={styles.gText}>Continue With Google</Text>
        </TouchableOpacity>
      </ImageBackground>
   
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%"
 
  },
  mainText:{
    fontWeight:"bold",
    fontSize:40,
    color:"rgb(58,179,225)",
    marginBottom:"5%"
  },
  logoImg:{
    width:"30%",
    height:undefined,
    aspectRatio:1,
    
  },
  inputView:{
    width:"80%",
    backgroundColor:"rgba(0,0,0,0.2)",
    borderRadius:25,
    height:"7%",
    marginBottom:20,
    justifyContent:"center",
    padding:"5%"
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11,
    marginVertical:"2%"
  },
  icons:{
    marginLeft:0
  },
  fbText:{
    color:"white",
    padding:0,
    marginLeft:"5%"
  },
  gText:{
    color:"white",
    padding:0,
    marginLeft:"5%",
    textAlign: "center",
  },
  gBtn:{
    width:"80%",
    backgroundColor:"rgba(222,82,70,0.8)",
    alignItems:"center",
    
    marginTop:"2%",
    marginBottom:"2%",
    paddingHorizontal: "2%",
    flexDirection: "row",
    height:50,
    justifyContent: "center",
    borderRadius:25,
  },
  fbBtn:{
    width:"80%",
    backgroundColor:"rgba(23,120,242,0.8)",
    height:50,
    alignItems:"center",
    marginTop:"2%",
    marginBottom:"2%",
    paddingHorizontal: "2%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius:25,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"rgba(90,128,232,0.8)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:"2%",
    marginBottom:"2%"
  },
  signupBtn:{
    width:"80%",
    backgroundColor:"rgba(10,50,100,0.8)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:"2%",
    marginBottom:"2%"
  },
  loginText:{
    color:"white"
  }
});