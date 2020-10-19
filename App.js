/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, { useState, Component, useEffect, useContext } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator,  CardStyleInterpolators,} from '@react-navigation/stack'
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen/MessagesScreen';
import ListScreen from './Screens/ListScreen/ListScreen';
import TestScreen from './Screens/TestScreen/TestScreen'
import RentListScreen from './Screens/RentListScreen/RentListScreen'
import {Image,View,Text,Button, TouchableOpacity, Dimensions} from 'react-native'
import Loader from './CustomComponents/Loader'
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
import LoadingScreen from './CustomComponents/LoadingScreen'
import ListCarFormScreen from './Screens/ListCarFormScreen/ListCarFormScreen'
import SearchListScreen from './Screens/SearchListScreen/SearchListScreen'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import CarInfoScreen from './Screens/CarInfoScreen/CarInfoScreen'
import FavoriteCarsScreen from './Screens/FavoriteCarsScreen/FavoriteCarsScreen'
import firestore from '@react-native-firebase/firestore'
import MessageBody from './Screens/MessagesScreen/MessageBody'

const {width, height} = Dimensions.get('window')

StatusBar.setBackgroundColor("rgba(0,0,0,0)")
StatusBar.setBarStyle("light-content")
StatusBar.setTranslucent(true)




const Stack = createSharedElementStackNavigator();
const TabNavStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticationNeedStack = createStackNavigator();
const RootStack = createSharedElementStackNavigator();

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


  const {user, refreshUser, unseenMessagesCount} = useContext(userContext);
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false)

useEffect(()=>{
  console.log(unseenMessagesCount)
},[])


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
          <Stack.Navigator
          
          screenOptions={{  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
          >
            <Stack.Screen options={{headerShown: false, gestureDirection: 'horizontal',}} name="Messages" component={MessagesScreen}/> 
            <Stack.Screen options = {{headerShown:false, gestureDirection: 'horizontal' }} name = 'MessageBody' component = {MessageBody}/> 
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

    

const ListStack = ()=>{

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
                <Stack.Screen options={{headerShown: false}} name="List" component={ListScreen}/> 
            

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
  const {user, refreshUser, unseenMessagesCount} = useContext(userContext);



return(
  <Tab.Navigator
      
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      let display;
      if (route.name === 'Search') {
        return(
          <Icon name={'search'} size={40} color={color} />
        )
      } else if (route.name === 'Messages' && unseenMessagesCount != 0) {
         return(
          <View style = {{}}>
            <View style = {{position:'absolute',zIndex:1,right:0,top:0}}>
              <View style = {{justifyContent:"center", alignItems:"center",backgroundColor:"orange", borderRadius:50,paddingHorizontal:5}}>
                <Text style = {{fontWeight:"bold" ,fontSize:15,color:'white', textDecorationStyle:'solid'}}>{unseenMessagesCount}</Text>
              </View>
            </View>
            <Icon name={'chatbox'} size={40} color={color} />
          </View>
          )
      
      } else if(route.name === 'Messages' && unseenMessagesCount == 0){
        return(
          <Icon name={'chatbox'} size={40} color={color} />
        )
      } else if (route.name === 'List') {
        return(
          <Icon name={'car'} size={40} color={color} />
        )
      } else if (route.name === 'Profile') {
        return(
          <Icon name={'person'} size={40} color={color} />
        )
      }

      
     
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
  const [loading, setLoading] = useState(true)
  const [youMightLikeCars,setYouMightLikeCars] = useState([])
  const [unseenMessagesCount , setUnseenMessagesCount] = useState(0)
  const [messagesObject, setMessagesObject] = useState([])
  useEffect(()=>{
    
    const user = auth().currentUser
    var messageCount = 0;
    var mesObj = {}
    var mesArray=[]
    SplashScreen.hide();
    const unsubscribe = onAuthStateChange(setUser)
   
      console.log('am intrat in mesaj')
      const unsubscribe_messages = firestore().collection('users').doc(`${user.uid}`).collection('messages').onSnapshot(querySnapshot => {
        messageCount = 0;
        mesArray = []
        mesObj = {}
        querySnapshot.forEach(doc => {
          mesArray.unshift({messageId:doc.id, messageBody: doc.data()})
          if(doc.data().seen == false){
            messageCount += 1;
          }
      });
    
    setUnseenMessagesCount(messageCount)
    setMessagesObject(mesArray)
    })
  

    setLoading(false)
   
    
    return ()=>{ 
      unsubscribe();
      unsubscribe_messages();
    }
  },[])

 






  function refreshUser(){
      setUser(auth().currentUser)
      console.log("utilizatorul a fost refreshuit")
  }

  
  return(
    
    <UserProvider value={{user, refreshUser, unseenMessagesCount, messagesObject}}>
      <Loader loading={loading}/>
      <NavigationContainer>
          <RootStack.Navigator 
           screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
          >
          
              <RootStack.Screen options={{headerShown: false}} name="TabNav"  component={TabNavStackScreen} />
              <RootStack.Screen options={{headerShown: false}} name="LogIn" component={LogInScreen}/> 
              <RootStack.Screen options={{headerShown: false}} name="Loader"  component={Loader} />
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
          <RootStack.Screen options = {{headerStyle:{ backgroundColor:'rgb(138,199,253)'},headerTitle: "Inregistreaza masina"}} name="ListCarForm" component={ListCarFormScreen}/>
          <RootStack.Screen 
            options = {{headerShown: false }} 
            name="SearchListScreen" 
            component={SearchListScreen}
            
          />
          <RootStack.Screen 
            options = {{headerShown: false }} 
            name="CarInfoScreen" 
            component={CarInfoScreen}
            options = {()=>({
              headerShown:false,
              gestureEnabled:false,
              transitionSpec:{
                open:{animation:'timing', config: {duration :500}},
                close: {animation:'timing', config: {duration:500}}
              }
            })}
            sharedElementsConfig={(route, otherRoute, showing) => {
              const { userCar } = route.params;
              return [`${userCar.photos[0]}`];
            }}
          />
          <RootStack.Screen options = {{headerShown: false }} name = "FavoriteCarsScreen" component = {FavoriteCarsScreen}/> 
        </RootStack.Navigator>

    </NavigationContainer>
    </UserProvider>
    
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

