import React, {useEffect, useState, useRef} from 'react' 

import {Animated, View, Text, Image, StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window');

const image = require('../images/logoR.png')

interface Props{

    loaded: boolean

}

const LoadingScreen: React.FC<Props> = (props)=>{

    return(

        <View style = {styles.loadingScreenContainer}> 
        
        <Image source = {image} style = {styles.logoStyle} />

        </View>


    )



}

const styles = StyleSheet.create({

    loadingScreenContainer:{
        height:height,
        width:width,
        flex:1, 
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.5)"

    },

    logoStyle:{
        aspectRatio:1/1,
        width:"20%",
        height:undefined


    }

})

export default LoadingScreen;