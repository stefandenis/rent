import React, {useEffect, useState} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useLinkProps, NavigationContainer } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures'
import  swipeDirections from 'react-native-swipe-gestures'
import { initialWindowMetrics } from 'react-native-safe-area-context';
import ChangePassword from '../../CustomComponents/ChangePassword';
import CarSlideShow from '../../CustomComponents/CarSlideShow';
import {cars, models} from '../../config/cars'



let CurrentSlide = 0;
let IntervalTime = 4000;

interface Props {
    navigation: any
}


const ListCarFormScreen: React.FC<Props> = (props) =>{

    const [image, setImage] = useState<Array>([]);
    const [index, setIndex] = useState(0)
    const scrollX = React.useRef(new Animated.Value(0)).current
    var [imageKey, setImageKey] = useState(0)
    const [pastMiddle, setPastMiddle] = useState(false)
    const flatList = React.createRef()
    const [currentPic, setCurrentPic] = useState(1)
    const onItemIndexChange = React.useCallback(setIndex, [])
    const scrollRef = React.useRef()
    const [gestureName, setGestureName] = useState('none')    
    const [selectedValue, setSelectedValue] = useState('')
    const [carModel, setCarModel] = useState(models[cars[0]][0])
    const [carBrand, setCarBrand] = useState(cars[0])
    
    const [isManual, setManual] = useState(false)
    const [isAutomatic, setAutomatic] = useState(false)

    const [isBenzina, setBenzina] = useState(false)
    const [isMotorina, setMotorina] = useState(false)
    const [isGaz, setGaz] =useState(false)
    const [isElectricitate, setElectricitate] = useState(false)
    


    function chooseCarPicture(){

      console.log("scrollX:", scrollX)
        
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };
         
          ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              setImageKey(imageKey+1);
              const source =  { key: imageKey, source: {uri : response.uri} };
              console.log(source);
              console.log(source.source)
              setImage(image.concat(source));
              console.log("in image picker ")
              console.log(image)
             
             
             
            }


    })


    }


    

   

  


    function addButton(){

      return(
        <TouchableNativeFeedback
          onPress={()=>{chooseCarPicture()}}
          background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
              <View style = {styles.touchable}>
                  <Text style = {styles.textStyle}>+ Adauga o imagine pentru masina ta</Text>
              
              </View>
        </TouchableNativeFeedback>
        
        
      )
    }

    function deleteCarPicture(){

      const tmp = [...image]
      console.log("image: ",image)
      console.log('index: ', index)
      console.log("tmp: ",tmp)
      
      console.log("tmp dupa slice: ",tmp)
      tmp.splice(index,1);
      setImage([...tmp])
      console.log('image dupa setimage tmp: ', image)
      
      setImageKey(imageKey-1)
      
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true})
    }


      
    const changeIndex = ({nativeEvent}) =>{

      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if(slide!=index){
        setIndex(slide)
      }

    }

    function carPictures(){
      console.log('car pictures')
      
      console.log(image)
      
      return(
        <View> 
            <View style = {{flexDirection: "row", flexWrap: "wrap", height:200,backgroundColor:'black'}}>
            <ScrollView
              
              horizontal
              pagingEnabled
              bounces = {false}
              ref={scrollRef}
              scrollEventThrottle={16}
              onScroll={changeIndex}
              showsHorizontalScrollIndicator={false}
              
              >

                {image.map((image,index) =>{

                    return(

                      <View style = {{backgroundColor:'black'}}>
                      
                      <Image source = {{uri:image.source.uri}} style = {styles.uploadPic}/> 
                      {console.log("index: ", index)}
                      {console.log('randare flatlist')}
                      
                    </View>
                    )

                })}

               
              </ScrollView>
                
              <Text style = {styles.numberTrack}>{index+1}/{imageKey}</Text>
              
              <View style = {{position:"absolute",left:2,top:5}}>
              <TouchableOpacity style = {styles.addBtn} onPress = {()=>{chooseCarPicture()}}>
                  <Text style = {styles.addBtnTextStyle}>+</Text>
                </TouchableOpacity>        
              </View>
              
              <View style = {{position:"absolute",bottom:5,right:2}}>
              <TouchableOpacity style = {{}} onPress = {()=>{deleteCarPicture()}}>
                  <Text style = {styles.deleteBtnTextStyle}>Sterge</Text>
              </TouchableOpacity>
              </View> 
              </View>   
                
              <View  style = {{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                  
                  {image.map((image,i)=>{

                      return(<Text style = {((index) == i) ? styles.activeBullet : styles.notActiveBullet }>{'\u2B24'}</Text>)
                  })}
                </View> 

                

                


        </View>
      
       

                )}  
                
                
      

 


    

    return(



            <View style = {{flex:1, justifyContent:"center", alignItems:"center",
            }}>
                

                <ScrollView 
                  style = {{width:width}}
                  
                  
                  >
                   
                    {image.length == 0 ? (addButton()) : (carPictures())}

                   
                    <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                    <View style = {styles.delimiter}></View>
                    </View>
                 
                  {/* MARCA MASINA ************************************/}
                  <View style = {{alignItems:'center'}}>
                  <View style = {styles.pickerContainer}>
                    <Text style = {{textDecorationLine:'underline'}}>Marca masina</Text>
                    <Picker
                      selectedValue={carBrand}
                      style={styles.picker }
                      mode='dropdown'
                      onValueChange={(itemValue, itemIndex) => setCarBrand(itemValue)}
                    >

                      {cars.map((car,index)=>{
                        
                        return(
                          <Picker.Item label={car} value={car} />
                        )

                      })}
                      
                    </Picker>
                    </View> 

                    {/* MODEL MASINA ********************************** */}
                    <View style = {{...styles.pickerContainer, marginBottom:10}}>
                    <Text style = {{textDecorationLine:'underline'}}>Model masina</Text>
                    <Picker
                      selectedValue={carModel}
                      style={styles.picker }
                      mode='dropdown'
                      onValueChange={(itemValue, itemIndex) => setCarModel(itemValue)}
                    >

                        { 
                        models[carBrand].map((model,index)=>{
                          

                        return(
                          <Picker.Item label={model} value={model} />
                        )

                      })}
                      
                    </Picker>
                    </View>   
                    </View>     
                       

                    <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                    <View style = {styles.delimiter}></View>
                    </View>

                    
                <View style = {{paddingVertical:15}}>
                    
                    <Text style = {{textDecorationLine:'underline', fontSize:20, marginLeft: width*0.1/2, marginBottom:10}} >Transmisie</Text>
                    <View style = {{flexDirection:"row"}}>
                      <View style={styles.transmissionContainer}>
                        <View style={styles.checkboxContainer}>
                          <CheckBox
                            value={isManual}
                            onValueChange={()=>{setManual(!isManual); setAutomatic(false)}}
                            style={styles.checkbox}
                          />
                          <Text onPress={()=>{setManual(!isManual); setAutomatic(false)}} style={styles.label}>Manuala</Text>
                        </View>

                      </View>

                      <View style={styles.transmissionContainer}>
                        <View style={styles.checkboxContainer}>
                          <CheckBox
                            value={isAutomatic}
                            onValueChange={()=>{setAutomatic(!isAutomatic); setManual(false)}}
                            style={styles.checkbox}
                          />
                          <Text onPress={()=>{setAutomatic(!isAutomatic);setManual(false)}} style={styles.label}>Automata</Text>
                        </View>

                      </View>
                    </View>
                </View>
                      

                    <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                      <View style = {styles.delimiter}></View>
                    </View>

                  
                  
                  
                  <View style = {{paddingVertical:15}}>
                    
                    <Text style = {{textDecorationLine:'underline', fontSize:20, marginLeft: width*0.1/2, marginBottom:10}} >Combustibil</Text>
                    <View style = {{alignItems:"baseline", marginLeft:width*0.2/2}}>
                      <View style={styles.transmissionContainer}>
                        <View style={styles.checkboxContainer}>
                          <CheckBox
                            value={isBenzina}
                            onValueChange={()=>{setBenzina(!isBenzina); setGaz(false); setMotorina(false); setElectricitate(false)}}
                            style={styles.checkbox}
                          />
                          <Text onPress={()=>{setBenzina(!isBenzina); setGaz(false); setMotorina(false); setElectricitate(false)}} style={styles.label}>Benzina</Text>
                        </View>

                      </View>

                      <View style={styles.transmissionContainer}>
                        <View style={styles.checkboxContainer}>
                          <CheckBox
                            value={isMotorina}
                            onValueChange={()=>{setMotorina(!isMotorina); setBenzina(false); setGaz(false); setElectricitate(false)}}
                            style={styles.checkbox}
                          />
                          <Text onPress={()=>{setMotorina(!isMotorina); setBenzina(false); setGaz(false); setElectricitate(false)}} style={styles.label}>Motorina</Text>
                        </View>

                      </View>


                      <View style={styles.transmissionContainer}>
                        <View style={styles.checkboxContainer}>
                          <CheckBox
                            value={isGaz}
                            onValueChange={()=>{setGaz(!isGaz); setBenzina(false); setMotorina(false); setElectricitate(false)}}
                            style={styles.checkbox}
                          />
                          <Text onPress={()=>{setGaz(!isGaz); setBenzina(false); setMotorina(false); setElectricitate(false)}} style={styles.label}>Gaz</Text>
                        </View>

                      </View>


                      <View style={styles.transmissionContainer}>
                        <View style={styles.checkboxContainer}>
                          <CheckBox
                            value={isElectricitate}
                            onValueChange={()=>{setElectricitate(!isElectricitate); setBenzina(false); setGaz(false); setMotorina(false)}}
                            style={styles.checkbox}
                          />
                          <Text onPress={()=>{setElectricitate(!isElectricitate); setBenzina(false); setGaz(false); setMotorina(false)}} style={styles.label}>Electricitate</Text>
                        </View>

                      </View>
                      
                    
                    </View>
                </View>



                <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                      <View style = {styles.delimiter}></View>
                    </View>


                      
                      

                <View style ={{height:100}}>

                </View>


                </ScrollView> 




                <TouchableOpacity style ={styles.listCarButton} onPress={()=>{console.log('pressed')}}>
                    <View>
                        <Text>Listeaza masina</Text>
                    </View>
                </TouchableOpacity>
                
                
                
                
                
                
                
            </View>
        )
  
}

export default ListCarFormScreen;

const styles = StyleSheet.create({

    limiter:{
        backgroundColor:"gray",
        borderWidth:1,
        
        width:"90%",
  
      },
    
      listCarButton:{
        width:width/1.5,
        backgroundColor:"rgb(138,199,253)",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        
        position:"absolute",
        bottom:"5%"

      },
      touchable:{
        marginVertical:40,
        backgroundColor:"#D7D7D7",
        paddingHorizontal:"3%",
        borderRadius:5,
        width:width*0.9
      },
      textStyle:{
        fontSize:width/20
      },
     
      slideShow:{
        paddingVertical:0
    },
    uploadPic:{
      aspectRatio:16/9,
      width:width,
      height:undefined,
      resizeMode:'contain',
      


    },
    numberTrack:{
      backgroundColor:"rgba(0,0,0,0.8)",
      borderRadius:15,
      position:'absolute',
      color:'white',
      right:0,
      fontSize:width*0.04,
      paddingHorizontal:6,
      textAlign:'center',
      margin:15
    },
    addBtn:{
      backgroundColor:"rgba(0,0,0,0.5)",
      width: 66,
      height: 66,
      borderRadius: 33,
      justifyContent: 'center',
      alignItems:'center',
    },
    addBtnTextStyle:{
      marginBottom:6,
      borderRadius:20,
      fontSize:width*0.2,
      color:"white"
    },

    deleteBtnTextStyle:{
      backgroundColor:"rgba(0,0,0,0.5)",
      borderRadius:20,
      paddingHorizontal:20,
      fontSize:width*0.08,
      color:"white"}
    

      ,
      activeBullet:{
        color:"rgb(138,199,253)",
        fontSize:15
      }
      ,
      notActiveBullet:{
        color:"rgb(219, 219, 219)",
        fontSize:10
      },

      delimiter:{
        width:"90%",
        height:1,
        backgroundColor:"rgb(219, 219, 219)"
      },
      pickerContainer:{
        borderColor:'gray',
        borderWidth:2,
        marginTop:10
       
      },
      picker:{
        width:width*0.9
        
      },
      transmissionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 0,
      },
      checkbox: {
        alignSelf: "center",
      
      },
      label: {
        margin:0,
        fontSize:25
      },



    

})