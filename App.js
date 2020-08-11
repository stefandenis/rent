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

import SearchScreen from './Screens/SearchScreen/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen/MessagesScreen';
import ListScreen from './Screens/ListScreen/ListScreen';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

import {StatusBar} from 'react-native';

StatusBar.setBackgroundColor("rgba(0,0,0,0)")
StatusBar.setBarStyle("light-content")
StatusBar.setTranslucent(true)


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
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />     
      </Tab.Navigator>
    </NavigationContainer>
  );


    
  }





export default App;
