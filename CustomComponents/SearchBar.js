import React, {useState,PixelRatio} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView,
    TextInput
    
  } from 'react-native';
  



function SearchBar(props){
    
    const [text, setText] = useState('');

    return(
        <View style={styles.container}>
            <View style = {{flex:3 }}>

            </View>
            <View style = {styles.searchBarStyle}>
                   <View style = {styles.iconContainer}>
                   <Icon name={"search"} size={30} color={"rgba(0,0,0,1)"} />
                    </View>
                    <View
                        style={{
                            
                            borderColor: 'rgba(0,0,0,0.4)',
                            borderWidth: 1,
                            height:"80%",
                            width:1,
                            
                        }}
/>
                    <View style = {styles.textInputContainer}>
                        <TextInput 
                            placeholder = "Current Location/City"
                            onChangeText={(text)=> setText(text)}
                            value = {text}
                            textAlign = "auto"
                            fontSize = {17}
                            color="black"
                            />
                    </View> 
            </View>
        </View>
        

    )



}

const styles = StyleSheet.create({
    container:{
        flex:1
        
    },
    searchBarStyle:{
        flex:1,
        flexDirection:"row",
        backgroundColor: "rgba(255,255,255,0.5)",
        marginBottom:"5%",
        width: "80%",
        marginHorizontal:"10%",
        borderRadius: 100,
        
        justifyContent:"center",
        alignItems:"center"
    },
    iconContainer:{
        flex:1,
        
        //backgroundColor:"red",
        alignItems: "center",
        justifyContent:"center"
        
        
    },
    textInputContainer:{
        flex:4,
        justifyContent:"center",
        
    }
            




})
    export default SearchBar;