import React, {useState, useEffect} from 'react'
import {

    ImageBackground, View,StyleSheet,Dimensions,Text,FlatList,TouchableOpacity


} from 'react-native'
import CarPreviewBox from './CarPreviewBox'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore'



function CarSlideShow(props){
    
    const [youMightLikeCars, setYouMightLikeCars] = useState([])

useEffect(()=>{

        var cars = [];
        var carObject = {}
        firestore().collection(`listedCars`).limit(5).get().then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
            carObject[`${doc.id}`] = doc.data() 
            cars.push(carObject)
            carObject = {}
          })
        
          setYouMightLikeCars(cars)
          })
      },[])
        


    const carsExample = [
        {key:'1',stars:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')},
        {key:'2',stars:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')},
        {key:'3',start:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')},

    ]
    
    const pressHandler = ()=>{

        console.log('tosssuch')
    }
    
    return(

        <View >
            
            <View style={{alignItems:"center"}}>
               
            <Text style={styles.textStyle}>You might like: </Text>
            </View> 
          
              <FlatList 
                contentContainerStyle={styles.slideShow}
                keyExtractor = {(item, index) => `${Object.keys(item)}`}
                horizontal = {true}
                data={youMightLikeCars}
                ItemSeparatorComponent={
                    () => <View style={{ width: "0.5%" }}/>
                }
                showsHorizontalScrollIndicator={false}
                renderItem = { ({item}) => (
                <CarPreviewBox carId={Object.keys(item)} carData = {item[Object.keys(item)]}  stars = {item[Object.keys(item)].stars} trips={item[Object.keys(item)].trips} price={item[Object.keys(item)].price} carName={`${item[Object.keys(item)].brand} ${item[Object.keys(item)].model}`} source={item[Object.keys(item)].photos[0]}/> 
                )}  
                
                
                />



        </View>



    )


            

    

}

const styles = StyleSheet.create({
        
    slideShow:{
        paddingVertical:0
    },
    textStyle:{
        
        color:"gray",
        fontSize:25,
        fontWeight:"bold",
        paddingHorizontal:5,
        
    }


})

export default CarSlideShow;
