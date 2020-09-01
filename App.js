/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, { useState, Component, useEffect, useContext } from 'react';
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
import HeaderPreview from './CustomComponents/HeaderPreview'
import {StatusBar, Modal} from 'react-native';
import {useSession} from './CustomHooks/useSession'
import auth from '@react-native-firebase/auth';
import {useAuth} from './CustomHooks/useAuth'
import EmailVerificationScreen from './Screens/EmailVerificationScreen/EmailVerificationScreen'
import {userContext} from './context/user.context'
import SplashScreen from './CustomComponents/SplashScreen'


StatusBar.setBackgroundColor("rgba(0,0,0,0)")
StatusBar.setBarStyle("light-content")
StatusBar.setTranslucent(true)

const Stack = createStackNavigator();
const TabNavStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticationNeedStack = createStackNavigator();
const RootStack = createStackNavigator();

const UserProvider = userContext.Provider;
const UserConsumer = userContext.Consumer;


function onAuthStateChange(callback) {
  

  /*
  Cand se inregistreaza user-ul este si logat si atunci se intra in functia asta. 
  Si cu toate ca a verificat email-ul.. o sa ii apara view-ul cu notificarea cum ca 
  i-a fost trimis un link de verificare. onAuthStateChange este invocata doar atunci cand
  userul da sign in sau sign out. Ca sa updateze campurile user-ului (inclusiv emailVerified ) trebuie sa fie apelata 
  functia reload()


  */
  

  return auth().onAuthStateChanged(user => {
    
    if (user) {
       auth().currentUser.reload().then(()=>{    
        console.log("The user is logged after reload: ", auth().currentUser);
        callback(auth().currentUser);
      })
      
    

      
   
    } else {
      console.log("The user is not logged in");
      callback(user)
  
    }
  });

  

}



function TabNavStackScreen(){

    return(
        <TabNavStack.Navigator >  
            <TabNavStack.Screen name="TabNav" options={{headerShown: false}} component={TabNavScreen}/>
        </TabNavStack.Navigator>


    )
}







const SearchStack = () =>(
  <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen}/>  
  </Stack.Navigator>

)


const MessagesStack = ()=>{


  const {user, refreshUser} = useContext(userContext);
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false)


  async function re_render(isEmailVerified){
    console.log('isEmaiVerified in re_render function: ', isEmailVerified)
    setEmailVerified(isEmailVerified);
    await auth().currentUser.reload();
    
  } 
  console.log(user)

  if(user){
  console.log("user email verified in profile stack:", user.emailVerified)}
  if(user){

      if(user.emailVerified || emailVerified || user.providerData[0].providerId == 'facebook.com'){
        return(
          <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Messages" component={MessagesScreen}/>  
          </Stack.Navigator>
        )
  
        }    
      
      else{
        return(<EmailVerificationScreen name = {user.displayName} email = {user.email} onEmailVerification={(isEmailVerified)=>{re_render(isEmailVerified)}}/>)
      }

  }
  else{
    return(
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
    )
  }
  
    }

    

const ListStack = ()=>(

  <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="List" component={ListScreen}/>  
  </Stack.Navigator>
)

const ProfileStack = ({route})=>{

  const {user, refreshUser} = useContext(userContext);
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false)


  async function re_render(isEmailVerified){
    console.log('isEmaiVerified in re_render function: ', isEmailVerified)
    setEmailVerified(isEmailVerified);
    await auth().currentUser.reload();
    
  } 
  console.log(user)

  if(user){
  console.log("user email verified in profile stack:", user.emailVerified)}
  if(user){

      if(user.emailVerified || emailVerified || user.providerData[0].providerId == 'facebook.com'){
        return(
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} initialParams = {user} name="Profile" component={ProfileScreen}/>  
      </Stack.Navigator>
        )
  
        }    
      
      else{
        return(<EmailVerificationScreen name = {user.displayName} email = {user.email} onEmailVerification={(isEmailVerified)=>{re_render(isEmailVerified)}}/>)
      }

  }
  else{
    return(
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
    )
  }
  
  
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






function App(){
 
 
  const [user, setUser] = useState()
  const [initializing, setInitializing] = useState(false)

  useEffect(()=>{
    const subscribe = onAuthStateChange(setUser)
    
    return ()=>{

     
      subscribe();
    }
  },[])
  

  console.log(user)



  function refreshUser(){
      setUser(auth().currentUser)
      console.log("utilizatorul a fost refreshuit")
  }

  if(initializing) {return(<SplashScreen/>)}
  else{
  return(
    <UserProvider value={{user, refreshUser}}>
      <NavigationContainer>
          <RootStack.Navigator mode="modal" >
              <RootStack.Screen options={{headerShown: false}} name="TabNav"  component={TabNavStackScreen} />
              <RootStack.Screen options={{headerShown: false}} name="LogIn" component={LogInScreen}/> 
              <RootStack.Screen name="Test" options = {({ route }) =>{

                return({           
      
                  headerStyle:{
                  backgroundColor:'rgb(138,199,253)'
              
            },
            headerTitle: (props) => <HeaderPreview name={route.params.carName} {...props} />,
          }
        
        
        )}} component={TestScreen} />
          <RootStack.Screen options={{headerShown: false}} name = "Register" component = {RegisterScreen}/>
          <RootStack.Screen options = {{headerShown: false }} name = "EmailVerification" component = {EmailVerificationScreen}/>
          </RootStack.Navigator>

    </NavigationContainer>
    </UserProvider>

  );
}

    
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

