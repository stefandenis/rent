import React, { useState } from 'react';
import {Dimensions} from 'react-native';
import SearchBar from '../../CustomComponents/SearchBar';
import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import CarSlideShow from '../../CustomComponents/CarSlideShow'

const image = require('../../images/drive2.jpg')
const {width, height} = Dimensions.get('window');

import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView,SafeAreaView,
    Button
    
  } from 'react-native';
  




function SearchScreen() {
    
  const [search, setSearch] = useState('');
  
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
                        

                      />


                  </ImageBackground>
                  
              </View>
 
             
        </View>

        <View style={styles.adds}>

          <View style={styles.carSlideShow}>
          
            <CarSlideShow/>
            
          </View>


        <View style={{height:200,width:width, backgroundColor:"green"}}>


        </View>
        
        <View style={styles.carSlideShow}>
          
            <CarSlideShow/>
            
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
        backgroundColor: "gray",
        alignItems:"center"
      
      },
      adds: {
       
      },

      imageContainer:{  
        
      },
      carSlideShow:{
        
        backgroundColor:"blue",
        paddingVertical:0
      }
    

    
  });

    imgStyle = {

      borderBottomLeftRadius: width/20,
      borderBottomRightRadius: width/20
    } 

  export default SearchScreen;