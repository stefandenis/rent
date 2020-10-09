import React, {useEffect,useState} from 'react'
import {Text, View,Image, StyleSheet, Picker, Dimensions } from 'react-native'
import {carsFilter, modelsFilter} from '../config/cars'
const {width, height} = Dimensions.get('window')



function PickBrandModel(props) {

    const [carBrand, setCarBrand] = useState(carsFilter[0])
    const [carModel, setCarModel] = useState(modelsFilter[carsFilter[0]])

  


    return(
        <View style = {{alignItems:'center'}}>
            <View style = {styles.pickerContainer}>
                <Text style = {{textDecorationLine:'underline'}}>Marca masina</Text>
                <Picker
                    selectedValue={carBrand}
                    style={styles.picker }
                    mode='dropdown'
                    onValueChange={(itemValue, itemIndex) => setCarBrand(itemValue)}
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
export default PickBrandModel

