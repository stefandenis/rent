import React from 'react'
import {Text, View, Image} from 'react-native'


export default function HeaderPreview(props){
  
    return(
    
      <View style={{flex:1, flexDirection:"row",alignItems:"center"}}>
        <Text style={{fontSize:20, marginRight:"auto"}}>{props.name}</Text>
      <View style={{position:"absolute",right:0}}>
      <Image  source={require('../images/logoR.png')} style = {{height:50, width:50}} />
      </View>
      </View>
    )
  }
  