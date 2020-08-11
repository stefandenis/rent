/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchScreen from './Screens/SearchScreen/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen/MessagesScreen';
import ListScreen from './Screens/ListScreen/ListScreen';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
// const Tab = createBottomTabNavigator({

//   Search: {
//     screen: SearchScreen,
//     navigationOptions: () => ({
//         tabBarIcon: ({tintColor}) => (
//             <Icon
//                 name="bookmark"
//                 color={tintColor}
//                 size={24}
//             />
//         )
//     })
//   },
//     Messages: {
//       screen: MessagesScreen,
//       navigationOptions: () => ({
//         tabBarIcon: ({tintColor}) => (
//           <Icon
//               name="bookmark"
//               color={tintColor}
//               size={24}
//           />
//         )
//       })
//     },

//     List:{
//       screen: ListScreen,
//       navigationOptions: () => ({
//         tabBarIcon: ({tintColor}) => (
//           <Icon
//               name="bookmark"
//               color={tintColor}
//               size={24}
//           />
//         ) 
//       })
//     },
//     Profile:{
//       screen: ProfileScreen,
//       navigationOptions: () => ({
//         tabBarIcon: ({tintColor}) => (
//           <Icon
//               name="bookmark"
//               color={tintColor}
//               size={24}
//           />
//         )
//       })
//     }
//   }
  
// ,{
//   tabBarOptions: {
//       showLabel: false, // hide labels
//       activeTintColor: '#567FE5', // active icon color
//       inactiveTintColor: '#586589',  // inactive icon color
//       style: {
//           backgroundColor: '#171F33' // TabBar background
//       }
//   }
// });

class App extends Component {
  constructor(props){

    super(props);
    
    this.state = {} 
    
  }


  render(){

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


}


export default App;
