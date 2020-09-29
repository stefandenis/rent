
import React, {useEffect, useState, useRef} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert, Share } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


function TextInputCustom(props){

    const [hour, setHour] = useState('15')
    const [minutes, setMinutes] = useState('00')
    const [finalTime, setFinalTime] = useState('12:00')


    const refHour = useRef()
    const refMinutes = useRef()
    

    useEffect(()=>{
        setFinalTime(`${hour}:${minutes}`)
        props.getHour(`${hour}:${minutes}`)
       
        console.log(hour,minutes)
    },[hour,minutes])
    

    function incrementHour(){
        var incrementedHour;
        
        if(hour ==''){
            setHour('16')
         
        }
        else{
        incrementedHour = parseInt(hour)+1
        if(incrementedHour>23){
            setHour('00')
            
        } 
        else{
            if(incrementedHour<=9){
                setHour(`0${incrementedHour}`)
              
            }else{
                setHour(incrementedHour.toString())
               
            }
        }
    }

    }

    function decrementHour(){

        var decrementHour;
        if(hour==''){
            setHour('14')
           

        }else{
            decrementHour = parseInt(hour)-1
            console.log(decrementHour)
            if(decrementHour>23){
                console.log(decrementHour)
                setHour('23')
               
            }else{
            if(decrementHour<0){
                setHour('23')
              
            }else{
                if(decrementHour<=9){
                    setHour(`0${decrementHour}`)
                   

                }else{
                    setHour(decrementHour.toString())
                    

                }
            }

        }
    }

    }


    function setH(text){
        console.log(text)
        var hourValue = parseInt(text)
        if(hourValue > 23){
            console.log("1 ",hourValue)
            setHour('23')
           
        }else if(hourValue < 0){
            setHour('00')
           
            console.log("2 ",hourValue)
        }else{
            setHour(text)
           
            console.log("3 ",hourValue)
        }

    }

    function setM(text){
        console.log(text)
        var minutesValue = parseInt(text)
       
        
        if(text.length == 2){
            if( minutesValue >0 && minutesValue < 15){
                setMinutes('15')
              
            }
            else if( minutesValue > 15 && minutesValue < 30){
                setMinutes('30')
               
            }else if(minutesValue > 30 && minutesValue < 45){
                setMinutes('45')
                
            }else if(minutesValue > 45){
                console.log('dfsfs')
                setMinutes('45')
              
            }else if(minutesValue < 0 ){
            
            }

    
        }else{
            setMinutes(minutesValue)
            
        }

    }

function incrementMinutes(){

    var incrementMinutes;
        
    if(minutes ==''){
        setMinutes('00')
       
    }
    else{
    incrementMinutes = parseInt(minutes)+15
    if(incrementMinutes>59){
        setMinutes('00')
        
    } 
    else{
        if(incrementMinutes<=9){
            setMinutes(`0${incrementMinutes}`)
           
        }else{
            setMinutes(incrementMinutes.toString())
           
        }
    }
}
}

function decrementMinutes(){

    var decrementMinutes;
    if(minutes==''){
        setMinutes('00')
        

    }else{
        decrementMinutes = parseInt(minutes)-15
        console.log(decrementMinutes)
        if(decrementMinutes>59){
            console.log(decrementMinutes)
            setMinutes('59')
           
        }else{
        if(decrementMinutes<0){
            setMinutes('45')
            
        }else{
            if(decrementMinutes<=9){
                setMinutes(`0${decrementMinutes}`)
                

            }else{
                setMinutes(decrementMinutes.toString())
                

            }
        }

    }
}

}




    return(

        <View style = {{flexDirection:"row", borderWidth:1, borderColor:"black", justifyContent:"center",alignItems:"center"}}>
         
            <View style = {{justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{incrementHour()}}>
                    <Icon name='caret-up' size={25} color='rgb(138,199,253)' />
                </TouchableOpacity>    
                <TextInput
                    ref = {refHour}
                    onFocus={()=>{refHour.current.clear()}}
                    placeholder={'15'}
                    onChangeText={(text)=>{setH(text)}}
                    value={hour}
                    keyboardType="numeric"
                    maxLength = {2}
                    style = {{fontSize:20, textAlign:"right"}}
                    >
                </TextInput>
           
                <TouchableOpacity onPress = {()=>{decrementHour()}}>
                    <Icon name='caret-down' size={25} color='rgb(138,199,253)' />
                </TouchableOpacity> 
            </View>
                
                    <Text
                style = {{fontSize:20}}
                >:
                </Text>


            <View style = {{justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{incrementMinutes()}}>
                    <Icon name='caret-up' size={25} color='rgb(138,199,253)' />
                </TouchableOpacity> 

                    <TextInput
                
                        ref = {refMinutes}
                        onFocus={()=>{refMinutes.current.clear()}}
                        value = {minutes}
                        onChangeText={(text)=>{setM(text)}}
                        placeholder={'00'}
                        keyboardType="numeric"
                        
                        maxLength = {2}
                        style = {{fontSize:20, textAlign:"left"}}
                    >
                    </TextInput>
            
                <TouchableOpacity onPress={()=>{decrementMinutes()}}>
                    <Icon name='caret-down' size={25} color='rgb(138,199,253)' />
                </TouchableOpacity> 
            </View>
           
            

        </View>

    )
}

export default TextInputCustom
