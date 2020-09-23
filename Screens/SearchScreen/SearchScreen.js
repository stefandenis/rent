import React, { useState } from 'react';
import {Dimensions} from 'react-native';
import SearchBar from '../../CustomComponents/SearchBar';
import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import CarSlideShow from '../../CustomComponents/CarSlideShow'
import {createStackNavigator} from '@react-navigation/stack'
const image = require('../../images/drive2.jpg')
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SharedElement } from 'react-navigation-shared-element';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import functions from '@react-native-firebase/functions';
import database from '@react-native-firebase/database'
const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView,SafeAreaView,
    Button
    
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchListScreen from '../SearchListScreen/SearchListScreen';
const idSearch = 1;

function SearchScreen({navigation}) {
    

 
 
  const [search, setSearch] = useState('');
  
function pressHandler(){

  navigation.navigate("List")

}




  return (
    
    <SafeAreaView style={styles.container}>
     
      <ScrollView>
        <View style={styles.searchContainer}>
          
              <View styles={styles.imageContainer} >
              
                  <ImageBackground source={image} style={styles.image} imageStyle={imgStyle}>
                     
                 
                     

                        <SearchBar
                          placeholder="Current Location/City"
                          onChangeText={(search)=>setSearch(search)}
                          value={search}
                          onFocus = {()=>{console.log('buttonpressed');navigation.navigate('SearchListScreen')}} 

                        />
                        
                        
                     
                      


                  </ImageBackground>
                  
              </View>
 
             
        </View>

        <View style={styles.adds}>

          <View style={styles.carSlideShow}>
          
            <CarSlideShow/>
            
          </View>


        <View style={{alignItems:"center",paddingVertical:"5%" }}>
            <TouchableOpacity
              onPress={() => pressHandler()
              }
            >
              <View style={styles.listImageContainer}>
                <ImageBackground source={require('../../images/handshake.jpg')} style={styles.rentImage} imageStyle={rentImgStyle}>
                  <Text style={styles.rentTextAdd}>List your car</Text>
                </ImageBackground>
                <Text style = {styles.sitBackStyle}>Sit back and earn money</Text>
            
              </View>
            </TouchableOpacity>
        </View>
        
        
        
        </View>
              


</ScrollView>

        </SafeAreaView>
       
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex:1,  
      },

    image: {
      justifyContent: "center",
      width:"100%",
      height:undefined,
      aspectRatio:16/9
    },
    
    searchContainer: {
      height:height/3,
      //backgroundColor: "gray",
      alignItems:"center"
    },
    
    rentImage:{
      width:width/1.1,
      height:undefined,
      aspectRatio:16/9
    },

    listImageContainer:{
      
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 10, 
  
      borderBottomLeftRadius:width/15,
      borderBottomRightRadius:width/15,
      borderTopLeftRadius:width/15,
      borderTopRightRadius:width/15,
      marginBottom:20,
      backgroundColor:"rgba(255,255,255,1)",
      paddingBottom:"2%",
      marginHorizontal:"4%"
    },
    
    sitBackStyle:{
      color:"rgba(0,0,0,1)",
      fontSize:width/15,
      fontWeight:"bold",
      textAlign:"center"
    },
    rentTextAdd:{
      backgroundColor:"rgba(255,255,255,0.8)",
      position:"absolute",
      color:"rgba(0,0,0,1)",
      fontSize:25,
      fontWeight:"bold",
      top:"3%",
      left:"3%",
      paddingHorizontal:5,
      borderRadius:13
    }
    
      

    
  });

  const imgStyle = {

      borderBottomLeftRadius: width/20,
      borderBottomRightRadius: width/20
    } 

   const rentImgStyle = {

      borderTopLeftRadius:width/15,
      borderTopRightRadius:width/15
    
    } 

  export default SearchScreen;