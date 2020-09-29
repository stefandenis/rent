
import React, {useState, useEffect, Mixin} from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView,Dimensions, Image } from 'react-native';
import auth from '@react-native-firebase/auth'
import Plus from '../../CustomComponents/Plus'
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database'
const {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore'
import {SharedElement} from 'react-navigation-shared-element'
const ListScreen = ({navigation})=>{

  const user = auth().currentUser
  const [listedCars, setListedCars] = useState(null)
  const [userCars, setUserCars] = useState([])
  const [carsLoaded, setCarsLoaded ]= useState(false)


useEffect(()=>{
  
  const user = auth().currentUser
  if(user){

    firestore().collection('users').doc(`${user.uid}`).onSnapshot(doc=>{
      console.log('doc data():', doc.data().listedCars)
      if(doc.data().listedCars != undefined){
        setListedCars(doc.data().listedCars)
        console.log("listedCars:",listedCars)
      }else{
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
  var lc;
  for(const listedCar of listedCars){
    console.log('listedCar id in for',listedCar)

    await firestore().collection('listedCars').doc(`${listedCar}`).get().then(querySnapshot=>{
      tmp.push(querySnapshot.data())
    })
    
    // await firestore().collection('listedCars').doc(`${listedCar}`).get().then(querySnapshot =>{
    //   console.log('query snapshot exists' , querySnapshot.data())
      
    //     console.log("userCars in async func: ", userCars)
    //     console.log(querySnapshot)
    //     console.log("snapshot:",querySnapshot.data().brand)
    //     tmp.push(querySnapshot.data())
    //     console.log('wait')
        
  
      
    // })
    
  
    
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
        <View style = {{alignItems:"center",backgroundColor:'rgba(90,128,232,1)', borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
          <Text style = {{color:'white',fontSize: 30}}>Masinile tale</Text>
        </View>
        {
        userCars.map((userCar,index)=>{
          console.log('userCars: ', userCars)
            console.log('user.car: ', userCar.photos)
            return(
              
              <TouchableOpacity style = {{backgroundColor:"black", margin:5, borderRadius:10, overflow:'hidden'}} onPress = {()=>{navigation.navigate('CarInfoScreen', {userCar})}}>
                  <SharedElement id = {`${userCar.photos[0]}`}>
                    <Image source={{uri: userCar.photos[0]}} style = {{width:"100%",aspectRatio:16/9,height:undefined, resizeMode:"contain"}}/>
                  </SharedElement>
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