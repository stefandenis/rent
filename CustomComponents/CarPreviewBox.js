import React, {useState} from 'react'
import {

    ImageBackground, View,StyleSheet,Dimensions,Text


} from 'react-native'

const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

function CarPreviewBox(props){


    return(

        <View  style = {styles.container}>
            
            <View style={styles.imageContainer}>
            <ImageBackground source={props.source} style = {styles.imageStyle} imageStyle={{borderRadius: 20}}>
               <View style={styles.infoContainer}> 
                    
                    <View style = {styles.starsContainer}>
                        <Text style = {styles.starsTextStyle}>{props.stars}</Text>
                        
                        <View style = {styles.iconContainer}>
                        <Icon name={"star"} size={23} color={"rgba(250, 153, 0,1)"} />
                        
                        </View>
                        <Text style = {styles.tripsStyle}>{`(in ${props.trips} trips)`}</Text>
                    </View>
                    
                    
                    <Text style = {styles.textStyle}>{`${props.price}$/day`}</Text>
                </View>

            </ImageBackground>
            </View>
            <View style = {styles. infoUserContainer}>
                <Text style={styles.carName}> {`${props.carName}`}</Text>
               
                       
            </View>


            
        </View>



    )


}


const styles = StyleSheet.create({
        container: {   
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 10, 
        
          borderBottomLeftRadius:20,
          borderBottomRightRadius:20,
          borderTopLeftRadius:100,
          borderTopRightRadius:100,
          marginBottom:20,
          backgroundColor:"rgba(255,255,255,1)",
          height: height/3.5
        },
        
        imageStyle:{
            
            width:width/1.3,
            height:undefined,
            aspectRatio: 16/9
        

        },
        imageContainer:{
          
        },

        infoContainer:{
            flex:1,
            
           
        },  

        textStyle:{
            backgroundColor:"rgba(255,255,255,0.8)",
            position:"absolute",
            color:"rgba(0,0,0,1)",
            fontSize:25,
            fontWeight:"bold",
            bottom:"5%",
            right:"3%",
            paddingHorizontal:5,
            borderRadius:13
               
        },
        tripsStyle:{
            
            color:"rgba(0,0,0,1)",
            fontSize:15,
            paddingHorizontal:5,
            
        },
        
        
        starsContainer:{
            flex:1,
            flexDirection:"row",
            position:"absolute",
            justifyContent:"center",
            alignItems:"center",
            top:"2%",
            left:"2%",
            backgroundColor:"rgba(255,255,255,0.7)",
            borderRadius:13,
            paddingHorizontal:5,
        },

        starsTextStyle:{    
            
            color:"black",
            fontSize:25,
            
        },
        iconContainer:{
            paddingTop:"2%",
            paddingLeft:"2%"
        },

        infoUserContainer:{
            
        },
        carName:{
                      
            color:"rgba(0,0,0,1)",
            fontSize:width/20,
            fontWeight:"bold",
            textAlign:"center"
            
        }
        


})


export default CarPreviewBox;