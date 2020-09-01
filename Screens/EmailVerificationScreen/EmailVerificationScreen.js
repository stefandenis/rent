import React, {useState, useContext} from 'react';
import { StyleSheet,View, Text, Image, TouchableOpacity, ScrollView,SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {userContext} from '../../context/user.context'
import  database  from '@react-native-firebase/database';



/*
In cazul in care acest screen este invocat inauntrul stack-ului ProfileStack, se folosesc props-urile.
    props: 
        - name
        - email
        - onEmailVerificaiton

In cazul in care este invocat ca screen in RootStack, se foloseste route.params.... pentru afisarea numelui si email-ului.
    



*/

export default function EmailVerificationScreen({route, name, email, onEmailVerification}){
    const {user, refreshUser }= useContext(userContext);
    const [emailVerified, setEmailVerified] = useState(true)
    const navigation = useNavigation();
    
    console.log("route: ",route);
    console.log("name: ",name)
    if(route){
        console.log(route)
        displayName = route.params.firstName
        emailvar = route.params.email
    }else{
        console.log("in props")
        displayName = name
        emailvar = email
    }

   

    function sendEmailVerifiedToParent(isEmailVerified){
        const user = auth().currentUser
        if(isEmailVerified){
            
            database().ref(`/users/${user.uid}`).set({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
                



            })
            
            
        
        }
        
        if(route){
            
            route.params.onEmailVerification();
       
        }else{
        onEmailVerification(isEmailVerified);
        
        }
    }

    function showEmailVerifyError(){

        if(!emailVerified){
            return(

                <View style = {{flex:1, justifiyContent:"center", alignItems:"center", backgroundColor:"black"}}>
                <Text style = {{color:"white", fontSize: 25, textAlign:"center"}}>
                   Oops! The verification link was not accesed.
                   </Text>

                
                </View>
            )
        }
    }


    function registerUserInDatabase(){



    }

    async function confirmEmailVerified(){
        await auth().currentUser.reload();
        

        var isEmailVerified = auth().currentUser.emailVerified;
        if (isEmailVerified) {
            console.log("Email verified");
            sendEmailVerifiedToParent(isEmailVerified);
            refreshUser();
            navigation.navigate('Search')
    
        }else{
            console.log("Email not verified, please verify or click on resend to get the verification email!");
            sendEmailVerifiedToParent(isEmailVerified)
            setEmailVerified(false);
            refreshUser();
        } 
    
        
    }

    


    return(
        // , justifiyContent:"center", alignItems:"center", backgroundColor:"black", paddingTop:"10%"
        <SafeAreaView style = {{flex:1,backgroundColor:"black"}}>
            <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:"center", alignItems:"center"}}>
            <Image source={require("../../images/logoR.png")} style={styles.logoImg}/>
            <Text style = {{color:"white", fontSize: 25, textAlign:"center"}}>
                {displayName}, an email verification link has been sent to your email account: 
            </Text >
            <Text style = {{color:"white", fontSize: 25, textAlign:"center"}}>{emailvar}</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>{confirmEmailVerified()}}>
                <Text style={styles.loginText}>I have accessed the verification link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{auth().currentUser.sendEmailVerification()}}>
                <Text style={styles.loginText}>Re-send link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{navigation.navigate('LogIn')}}>
                <Text style={styles.loginText}>Log-in with another account</Text>
            </TouchableOpacity>
            {showEmailVerifyError()}
        </ScrollView>
        </SafeAreaView>

    )



}
const styles = StyleSheet.create({

    logoImg:{
        width:"50%",
        height:undefined,
        aspectRatio:1,
        marginTop:"10%"
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
      },loginText:{
        color:"white"
      }


})