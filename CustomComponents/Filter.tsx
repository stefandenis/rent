import React, {useEffect, useState, useRef} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert, Share } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

import {carsFilter, modelsFilter} from '../config/cars'
import auth from '@react-native-firebase/auth'
import { filterCards } from '../queryFunctions/queryFunctions';
import { Transaction } from '@google-cloud/firestore';



interface Props {
    dropFilter: boolean,
    removeFilter(void): void
}

const fuelOptions = ['...','benzina', 'motorina', 'gaz', 'electricitate']
const kmOptions = ['...', '0-1.000 km', '1.000-10.000 km', '10.000-50.000 km', '50.000-100.000 km','100.000-150.000 km','150.000-200.000 km','200.000-300.000 km','300.000-500.000 km']
const transmissionOptions = ['...','manuala', 'automata']


function Filter(props: Props){

    const [carBrand, setCarBrand] = useState(carsFilter[0])
    const [carModel, setCarModel] = useState(modelsFilter[carsFilter[0]])
    const [fuel, setFuel] = useState(fuelOptions[0])
    const [km, setKm] = useState(kmOptions[0])
    const [seats,setSeats] = useState(0)
    const [transmission, setTransmission] = useState(transmissionOptions[0])
    const marginTop = useState(new Animated.Value(-height))[0]
    

    useEffect(()=>{
        
        if(props.dropFilter){
    
            Animated.timing(marginTop, {
                toValue: 0,
                duration:300,
                useNativeDriver:false
            }).start()
        }
    }, [props.dropFilter])


function removeFilter(){
  
    Animated.timing(marginTop, {
        toValue: -height,
        duration:300,
        useNativeDriver:false
    }).start()
    props.removeFilter()

}


useEffect(()=>{
    console.log('aici')
    const {brand, model, kilometers, seats, transmission, fuel} = props.filterOptionsObject
    console.log('brand', brand)
    brand ? setCarBrand(brand) : setCarBrand("...")
    model ? setCarModel(model) : setCarModel('...')
    kilometers ? setKm(kilometers) : setKm('...')
    seats ? setSeats(seats) : setSeats(0)
    transmission ? setTransmission(transmission) : setTransmission('...')
    fuel ? setFuel(fuel) : setFuel('...') 

}, [props.filterOptionsObject])


function applyFilter(){
  
    var filterOptions = []
    var filterOptionsObject = {}

    if(carBrand!='...'){
        filterOptions.push({brand: carBrand})
        filterOptionsObject['brand'] = carBrand
    }
    
    if(carModel!='...'){
        filterOptions.push({model: carModel})
        filterOptionsObject['model'] = carModel
    }
    
    if(seats){ 
        filterOptions.push({seats: `${seats} locuri`})
        filterOptionsObject['seats'] = seats
    }
    
    if(km!='...'){
        filterOptions.push({kilometers:km})
        filterOptionsObject['kilometers'] = km
    }
    
    if(transmission!='...'){
        filterOptions.push({transmission: transmission})
        filterOptionsObject['transmission'] = transmission
    }
        
    if(fuel!='...'){
        filterOptions.push({fuel: fuel})
        filterOptionsObject['fuel'] = fuel
    }
    removeFilter()
    props.returnFilterOptions(filterOptions, filterOptionsObject);
    



}
    return(
        
        <Animated.View style = {{height:height,width:width,position:'absolute',backgroundColor:"rgba(0,0,0,0.5)", marginTop:marginTop}}>

            <View style = {{height:height*0.8,backgroundColor:"white",alignItems:"center",justifyContent:"center",borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                <Text style = {{fontSize:20, paddingTop:15}}>Gaseste masina ideala pentru tine!</Text>
                <ScrollView 
                
                showsVerticalScrollIndicator = {false}
                style = {{}}>
                    
                    
{/***************** PICKER MODEL SI MARCA MASINII***********************/}
                    <View style = {{alignItems:'center'}}>
                        <View style = {styles.pickerContainer}>
                            <Text style = {{textDecorationLine:'underline'}}>Marca masina</Text>
                            <Picker
                                selectedValue={carBrand}
                                style={styles.picker }
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => {if(itemValue=='...'){ setCarModel(itemValue); console.log('itemvalue:', itemValue)}; setCarBrand(itemValue)}}
                            >

                            {carsFilter.map((car,index)=>{
                                        
                            return(
                                <Picker.Item label={car} value={car} />
                            )

                            })}
                                    
                            </Picker>
                        </View> 
                    
                        <View style = {{...styles.pickerContainer, marginBottom:10}}>
                                <Text style = {{textDecorationLine:'underline'}}>Model masina</Text>
                                <Picker
                                selectedValue={carModel}
                                style={styles.picker }
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => setCarModel(itemValue)}
                                >

                                    { 
                                    modelsFilter[carBrand].map((model: string,index: number)=>{
                                    

                                    return(
                                    
                                    <Picker.Item label={model} value={model} />
                                    )

                                })}
                                
                                </Picker>
                        </View> 
                    
                    
                    
                    
                    </View>
{/*********************PICKER TRANSMISSION ***********************/}
                    <View style = {{alignItems:'center'}}>
                        <View style = {styles.pickerContainer}>
                            <Text style = {{textDecorationLine:'underline'}}>Transmisie</Text>
                            <Picker
                                selectedValue={transmission}
                                style={styles.picker }
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => setTransmission(itemValue)}
                            >

                            {transmissionOptions.map((transmission,index)=>{
                                        
                            return(
                                <Picker.Item label={transmission} value={transmission} />
                            )

                            })}
                                    
                            </Picker>
                        </View> 
                    </View>


{/*********************PICKER COMBUSTIBIL ***********************/}
                    <View style = {{alignItems:'center'}}>
                        <View style = {styles.pickerContainer}>
                            <Text style = {{textDecorationLine:'underline'}}>Combustibil</Text>
                            <Picker
                                selectedValue={fuel}
                                style={styles.picker }
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => setFuel(itemValue)}
                            >

                            {fuelOptions.map((fuel,index)=>{
                                        
                            return(
                                <Picker.Item label={fuel} value={fuel} />
                            )

                            })}
                                    
                            </Picker>
                        </View> 
                    </View>



{/*********************PICKER KILOMETRII ***********************/}
                    <View style = {{alignItems:'center'}}>
                        <View style = {styles.pickerContainer}>
                            <Text style = {{textDecorationLine:'underline'}}>Kilometrii</Text>
                            <Picker
                                selectedValue={km}
                                style={styles.picker }
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) => setKm(itemValue)}
                            >

                            {kmOptions.map((fuel,index)=>{
                                        
                            return(
                                <Picker.Item label={fuel} value={fuel} />
                            )

                            })}
                                    
                            </Picker>
                        </View> 
                    </View>

{/*********************PICKER LOCURI ***********************/}

                    <View style = {{borderColor:'gray',borderWidth:1,marginTop:10,borderRadius:5}}>
                        <View>
                            <Text style = {{textDecorationLine:'underline'}}>Locuri:</Text>        
                        </View>
                            
                        <TextInput
                        style = {{textAlign:'center'}}
                        keyboardType='numeric'
                        placeholder = 'Locuri...'
                        
                        maxLength = {2}
                        value = {seats}
                        onChangeText = {text => {setSeats(text)}}

                        />
                    </View>


                <View style = {{ height:100}}>


                </View>


                            

                </ScrollView>
           
                <TouchableOpacity 
                                style = {{
                                    
                                    borderRadius:50, 
                                    backgroundColor:"rgb(138,199,253)",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    
                                    elevation:5,
                                    paddingHorizontal:10,
                                    position:'absolute',
                                    bottom:"3%"
                                }}
                                onPress = {()=>{applyFilter()}}>

                                <Text style = {{fontSize:25, color:"white"}}>Aplica filtrarea</Text> 
                                    
                            </TouchableOpacity> 


              
            </View>
            

            <View style = {{alignItems:"center"}}>
                <TouchableOpacity 
                style ={{backgroundColor:"white",padding:10, borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                onPress = {()=>{
                    removeFilter()
                }}
                >
                    <Icon name='arrow-up' size={25} color='black' />
                </TouchableOpacity>
            </View>
            

            
      


        </Animated.View>


    )


}


const styles = StyleSheet.create({

    pickerContainer:{
        borderColor:'gray',
        borderWidth:1,
        marginTop:10,
        borderRadius:5
       
      },
      picker:{
        width:width*0.9,
        
        
      },


})

export default Filter;
