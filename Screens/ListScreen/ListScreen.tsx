
import React, {useState, useEffect, Mixin} from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView,Dimensions, Image } from 'react-native';
import auth from '@react-native-firebase/auth'
import Plus from '../../CustomComponents/Plus'
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database'
const {width, height} = Dimensions.get('window');
import {SharedElement} from 'react-navigation-shared-element'
const ListScreen = ({navigation})=>{

  const user = auth().currentUser
  const [listedCars, setListedCars] = useState(null)
  const [userCars, setUserCars] = useState([])
  const [carsLoaded, setCarsLoaded ]= useState(false)


useEffect(()=>{
  
  const user = auth().currentUser
  if(user){
  database().ref(`/users/${user.uid}/listedCars`)
  .on('value',snapshot=>{
    if(snapshot.val()){
      console.log('cars listed:')
      console.log(snapshot.val())
      setListedCars(snapshot.val())
      console.log("listedCars:",listedCars)
     
      
  

    }else{
      console.log('no cars listed')
      setListedCars(null);
    }
    
  })
}


},[])

useEffect(()=>{

  getUserCars()

},[listedCars])



async function getUserCars(){
  const tmp = []
  for(const listedCar of listedCars){
    await database().ref(`/listedCars/${listedCar}`).once('value', snapshot => {
      console.log("userCars in async func: ", userCars)
      console.log("snapshot:",snapshot.val().brand)
      tmp.push(snapshot.val())
      console.log('wait')
    })

}
  setUserCars(tmp)

}




function carsListed(){
   
  const uid = auth().currentUser.uid


 
  return (
    <View>

      <ScrollView
      pagingEnabled
      showsVerticalScrollIndicator={false}
      >

        {
        userCars.map((userCar,index)=>{
          console.log('userCars: ', userCars)
            console.log('user.car: ', userCar.photos)
            return(
              
              <TouchableOpacity style = {{backgroundColor:"black", margin:5, borderRadius:10, overflow:'hidden'}} onPress = {()=>{navigation.navigate('CarInfoScreen', {userCar})}}>
               
                  <Image source={{uri: userCar.photos[0]}} style = {{width:"100%",aspectRatio:16/9,height:undefined, resizeMode:"contain"}}/>
            
              </TouchableOpacity>

            )



        })
      
        }
        

      </ScrollView>

    </View>
  )  

  


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
          
          {listedCars ? (carsListed()) : (noCarsListed())}
          

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