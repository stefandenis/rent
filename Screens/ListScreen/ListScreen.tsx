// import React, { Component,useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     StyleSheet
    
//   } from 'react-native';
  





// function ListScreen() {


//   const [people, setPeople] = useState([
//     {name: "shaun", key:'1'},
//     {name: "yoshi", key:'2'},
//     {name: "mario", key:'3'},
//     {name: "luigi", key:'4'},
//     {name: "peach", key:'5'},
//     {name: "toad", key:'6'},
//     {name: "browser", key:'7'},
    

//   ])

//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'red' }}>

//         <FlatList 
//         horizontal = {true}
//         data={people}
//         renderItem = { ({item}) => (
//           <Text style = {styles.text}> {item.name} </Text>
//         )}  
//         />





//       </View>
//     );
//   }


//   const styles = StyleSheet.create({

//     text:{
//       height: 100,
//       width:100,
//       margin:20,
//       backgroundColor:"white"
//     }



//   })





//   export default ListScreen;

// components/Hello.tsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function ListScreen(){

  return(

<View style = {{flex:1, alignItems:"center", justifyContent:"center"}}>
  <Text>Get Started Now!</Text>
</View>

  )

}

export default ListScreen;