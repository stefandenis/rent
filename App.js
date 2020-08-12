/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, { useState, Componen } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen/MessagesScreen';
import ListScreen from './Screens/ListScreen/ListScreen';
import TestScreen from './Screens/TestScreen/TestScreen'
import RentListScreen from './Screens/RentListScreen/RentListScreen'
import {Image,View,Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

import {StatusBar} from 'react-native';

StatusBar.setBackgroundColor("rgba(0,0,0,0)")
StatusBar.setBarStyle("light-content")
StatusBar.setTranslucent(true)


const Stack = createStackNavigator();

const SearchStack = () =>(

  <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen}/>
      <Stack.Screen name="Test" options = {({ route }) =>{
        return({
           
         // title: route.params.carName ,
          
            headerStyle:{
              backgroundColor:'rgb(138,199,253)'
              
            },
            headerTitle: (props) => <Logo name={route.params.carName} {...props} />,
          }
        
        
        )}} component={TestScreen} />
      <Stack.Screen name="RentList" component={RentListScreen}/>
  </Stack.Navigator>

)


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

  




  return(
      <NavigationContainer>
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
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />     
      </Tab.Navigator>

    </NavigationContainer>
  );


    
  }


const styles = {

  headerStyle:{

  }

}


export default App;
