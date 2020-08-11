import React, { Component } from 'react';
const image = require('../../images/logo.png')
import {
    View,
    Text,
    ImageBackground,
    StyleSheet
    
  } from 'react-native';
  


function SearchScreen() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
       
        </ImageBackground>
        <Text style={styles.text}>
          RENT
        </Text>
        <Text style={styles.logoText}>
          Inchiriaza orice, oriunde
        </Text>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      width:400,
      height: 400,
      resizeMode: "stretch",
      justifyContent: "center"
    },
    text: {
      color: "grey",
      fontSize: 30,
      fontWeight: "bold",
      paddingLeft:140,
      
      paddingBottom:20,
      justifyContent: "center"
    },
    logoText:{

        color: "grey",
        fontWeight: "bold",
        fontSize: 25,
        justifyContent:"center",
        paddingBottom: 40,
        paddingLeft: 35
        

    }
  });
  export default SearchScreen;