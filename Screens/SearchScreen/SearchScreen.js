import React, { useState } from 'react';
import {Dimensions} from 'react-native';
import SearchBar from '../../CustomComponents/SearchBar';



const image = require('../../images/drive2.jpg')
const {width, height} = Dimensions.get('window');

import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView
    
  } from 'react-native';
  


function SearchScreen() {
    
  const [search, setSearch] = useState('');
  
  return (
      
      <View style={styles.container}>
        
        <View style={styles.searchContainer}>
          
              <View styles={styles.imageContainer} >
              
                  <ImageBackground source={image} style={styles.image} imageStyle={imgStyle}>
                  
                      <SearchBar
                        placeholder="Current Location/City"
                        onChangeText={(search)=>setSearch(search)}
                        value={search}
                        containerStyle={styles.searchBarContainerStyle}

                      />


                  </ImageBackground>
                  
              </View>
 
             
        </View>

        <View style={styles.adds}>
         
        </View>


      </View>
    
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:"red"
    },
    image: {
      justifyContent: "center",
      width:"100%",
      
      height:undefined,
      aspectRatio:16/9
    },
    
      searchContainer: {
        flex:1,
        backgroundColor: "red",
        alignItems:"center"
      
      },
      adds: {
        flex:1,
        justifyContent:"center"
      },

      imageContainer:{  
        
      }
    

    
  });

    imgStyle = {

      borderBottomLeftRadius: width/20,
      borderBottomRightRadius: width/20
    } 

  export default SearchScreen;