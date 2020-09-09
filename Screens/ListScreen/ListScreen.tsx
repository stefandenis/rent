
import React, {useState, useEffect, Mixin} from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView,Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth'
import Plus from '../../CustomComponents/Plus'
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database'
const {width, height} = Dimensions.get('window');

const ListScreen = ({navigation})=>{

  const user = auth().currentUser
  const [listedCars, setListedCars] = useState(null)


useEffect(()=>{
  const user = auth().currentUser
  if(user){
  database().ref(`/users/${user.uid}/listedCars`)
  .on('value',snapshot=>{
    if(snapshot.val()){
      console.log('cars listed:')
      setListedCars(snapshot.val())

    }else{
      console.log('no cars listed')
      setListedCars(null);
    }
    
  })
}


},[])

 function returnListedCars(){
  console.log('aici')
  return listedCars ? (carsListed(listedCars)) : (noCarsListed()) 

}

function carsListed(listedCars: object | null){
  
  

}


function noCarsListed(): JSX.Element{
 
  return(

    <View style = {{backgroundColor:"white",height:(height-0.1*height),justifyContent:"center"}}>

      <Text style={{color:"gray",fontSize:height/20, textAlign:"center",paddingHorizontal:5}}>You don't have any car listed right now. You can list your first car for others to rent by clicking on the plus sign</Text>

    </View> 
  )

}





return(
    <View style={{...styles.container, backgroundColor:"white"}}>
      
      <ScrollView>
      
          {returnListedCars()}
          

      </ScrollView>
      

      <Plus onPress= {()=>{navigation.navigate('ListCarForm')}}/>
      
      
    
    
    
    </View>


   
  )

}


const styles = StyleSheet.create({

  container: {
    flex:1, 
 
  
    },
  



})

export default ListScreen;