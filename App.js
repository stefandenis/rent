/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, { useState, Component, useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen/MessagesScreen';
import ListScreen from './Screens/ListScreen/ListScreen';
import TestScreen from './Screens/TestScreen/TestScreen'
import RentListScreen from './Screens/RentListScreen/RentListScreen'
import {Image,View,Text,Button, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import LogInScreen from './Screens/LogInScreen/LogInScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import {useNavigation} from '@react-navigation/native';

import {StatusBar, Modal} from 'react-native';

import auth from '@react-native-firebase/auth';

StatusBar.setBackgroundColor("rgba(0,0,0,0)")
StatusBar.setBarStyle("light-content")
StatusBar.setTranslucent(true)

const Stack = createStackNavigator();
const TabNavStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticationNeedStack = createStackNavigator();
const RootStack = createStackNavigator();

function TabNavStackScreen(){

    return(
        <TabNavStack.Navigator >  
            <TabNavStack.Screen name="TabNav" options={{headerShown: false}} component={TabNavScreen}/>
        </TabNavStack.Navigator>


    )
}



function AuthenticationNeedStackScreen(){

  return(
      <AuthenticationNeedStack.Navigator >  
          <AuthenticationNeedStack.Screen options={{headerShown: false}} name="LogIn" component={LogInScreen}/>
      </AuthenticationNeedStack.Navigator>


  )
}



const SearchStack = () =>(
  <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen}/>  
     
      <Stack.Screen name="RentList" component={RentListScreen}/>
      <Stack.Screen name="LogIn" component = {LogInScreen}/>
  
  </Stack.Navigator>

)


const MessagesStack = ()=>{




const navigation = useNavigation();
  var LoggedIn = false;
  
  return(
    
    LoggedIn ? (
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Messages" component={MessagesScreen}/>  
      </Stack.Navigator>
 
    ):(
      
      <View style = {{flex:1, alignItems: "center", justifyContent:"center",backgroundColor:"black"}}>
        
        <Image source={require("./images/logoR.png")} style={styles.logoImg}/>
        <Text style = {{textAlign:"center",color:"white"}}>You must log-in or sign-up first. You can use your facebook or google account.</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={()=>navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
  
      </View>
      

    ))
    }

const ListStack = ()=>(

  <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="List" component={ListScreen}/>  
  </Stack.Navigator>
)

const ProfileStack = ({route})=>{

  const navigation = useNavigation();
  const user = auth().currentUser


  
  return(
    
    user ? (
  
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} initialParams = {user} name="Profile" component={ProfileScreen}/>  
  </Stack.Navigator>
    ):(
      
      <View style = {{flex:1, alignItems: "center", justifyContent:"center",backgroundColor:"black"}}>
        
        <Image source={require("./images/logoR.png")} style={styles.logoImg}/>
        <Text style = {{textAlign:"center",color:"white"}}>You must log-in or sign-up first. You can use your facebook or google account.</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={()=>navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
  
      </View>
      

    ))
  
    }


function TabNavScreen(){

return(
  <Tab.Navigator
      
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Search') {
        iconName = 'search';
      } else if (route.name === 'Messages') {
        iconName ='chatbox';
      } else if (route.name === 'List') {
        iconName ='car';
      } else if (route.name === 'Profile') {
        iconName ='person';
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={40} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: '#567FE5',
    inactiveTintColor: '#e1e3ea',
    labelStyle: {
      fontSize: 12
    },
    tabStyle: {
      width: 250
    },
    style: {
      backgroundColor: '#171F33', // TabBar background
      height: '10%'
    }
  }}
  >
    <Tab.Screen name="Search" component={SearchStack} />
    <Tab.Screen name="Messages" component={MessagesStack} />
    <Tab.Screen name="List" component={ListStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />     
  </Tab.Navigator>

)

}


function Logo(props){
  
  return(
  
    <View style={{flex:1, flexDirection:"row",alignItems:"center"}}>
      <Text style={{fontSize:20, marginRight:"auto"}}>{props.name}</Text>
    <View style={{position:"absolute",right:0}}>
    <Image  source={require('./images/logoR.png')} style = {{height:50, width:50}} />
    </View>
    </View>
  )
}


function App(){

  const user = auth().currentUser
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  

  

  

  // auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     if (user.emailVerified === false) {
  //       console.log('Email not verified')
  //     } else {

  //       // successful login 

  //     }
  //   } else {
  //     //  Toast.show({ text: 'Something Wrong!', position: 'bottom', buttonText: 'No user is signed in.' }); 
  //   }
  // });


  return(
      <NavigationContainer>
          <RootStack.Navigator mode="modal" >
              <RootStack.Screen options={{headerShown: false}} name="TabNav"  component={TabNavStackScreen} />
              <RootStack.Screen options={{headerShown: false}} name="LogIn" component={LogInScreen}/> 
              <RootStack.Screen name="Test" options = {({ route }) =>{
                return({           
      
              headerStyle:{
              backgroundColor:'rgb(138,199,253)'
              
            },
            headerTitle: (props) => <Logo name={route.params.carName} {...props} />,
          }
        
        
        )}} component={TestScreen} />
          <RootStack.Screen options={{headerShown: false}} name = "Register" component = {RegisterScreen}/>
          </RootStack.Navigator>

    </NavigationContainer>

  );


    
  }


const styles = {

  headerStyle:{

  },
   logoImg:{
    width:"70%",
    height:undefined,
    aspectRatio:1
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"rgba(90,128,232,0.8)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginVertical:"4%"
  },
  signupBtn:{
    width:"80%",
    backgroundColor:"rgba(10,50,100,0.8)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:"2%",
    marginBottom:10
  },
  loginText:{
    color:"white"
  }

}


export default App;

