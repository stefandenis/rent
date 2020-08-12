import React, {useState} from 'react'
import {

    ImageBackground, View,StyleSheet,Dimensions,Text,FlatList


} from 'react-native'
import CarPreviewBox from './CarPreviewBox'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';



function CarSlideShow(){
    
    
    const carsExample = [
        {key:1,stars:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')},
        {key:2,stars:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')},
        {key:3,start:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')},
        {key:4,stars:4.5, trips:45, price:100, carName:"Lamborghini Aventador",  source: require('../images/lambo.jpg')}

    ]
    
    
    
    return(

        <View >
              <FlatList 
                contentContainerStyle={styles.slideShow}
                horizontal = {true}
                data={carsExample}
                ItemSeparatorComponent={
                    () => <View style={{ width: "0.5%" }}/>
                }
                showsHorizontalScrollIndicator={false}
                renderItem = { ({item}) => (
                <CarPreviewBox stars = {item.stars} trips={item.trips} price={item.price} carName={item.carName} source={item.source}/> 
                )}  
                
                
                />



        </View>



    )


            

    

}

const styles = StyleSheet.create({
        
    slideShow:{
        paddingVertical:50
    }


})

export default CarSlideShow;
