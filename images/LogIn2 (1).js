import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  state={
    email:"",
    password:""
  }
  render(){
    return (
      <ImageBackground source={require("authPhoto.jpg")} style={styles.container}>
        <Image source={require("logo.png")} style={styles.logoImg}/>
        <Text style={styles.mainText}>Log in</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#FFF"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#FFF"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.loginText}>Signup</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText:{
    fontWeight:"bold",
    fontSize:40,
    color:"rgb(58,179,225)",
    marginBottom:20
  },
  logoImg:{
    width:"26%",
    height:"12%"
  },
  inputView:{
    width:"80%",
    backgroundColor:"rgba(0,0,0,0.2)",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11,
    marginVertical:10
  },
  icons:{
    marginLeft:0
  },
  fbText:{
    color:"white",
    padding:0,
    marginLeft:20
  },
  gText:{
    color:"white",
    padding:0,
    marginLeft:20,
    textAlign: "center",
  },
  gBtn:{
    width:"80%",
    backgroundColor:"rgba(222,82,70,0.8)",
    alignItems:"center",
    
    marginTop:10,
    marginBottom:10,
    paddingHorizontal: 10,
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
    marginTop:10,
    marginBottom:10,
    paddingHorizontal: 10,
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
    marginTop:10,
    marginBottom:30
  },
  signupBtn:{
    width:"80%",
    backgroundColor:"rgba(10,50,100,0.8)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});