import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useLinkProps } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

interface Props {

onPress: () => {},
style:object 
}


const Plus: React.FC<Props> = (props) =>{

    return(
        <View style = {styles.addContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress = {()=>{props.onPress()}}>
            <Text style={styles.buttonTextStyle}>+</Text>
        </TouchableOpacity>
      </View>
    )

}

export default Plus;

const styles = StyleSheet.create({

      
    addContainer:{
        backgroundColor:"#171F33",
        position:"absolute",
        bottom:20,
        right:20,
        borderRadius: 33,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        
        elevation: 17,
        
      },
  
      buttonStyle : {
        backgroundColor: 'rgba(90,128,232,0.8)',
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems:'center',
        
       
        
        
      
        
      },
      buttonTextStyle : {
        color:'white',
        fontSize: 45,
        marginBottom: 6,
        
      }


})