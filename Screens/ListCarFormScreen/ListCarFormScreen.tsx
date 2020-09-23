import React, {useEffect, useState} from 'react'
import {Text, View,Image, StyleSheet, FlatList,ScrollView, CheckBox, TextInput, Animated, TouchableNativeFeedback, Dimensions, TouchableOpacity, InteractionManager, Picker, Alert } from 'react-native'
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
import Loader from '../../CustomComponents/Loader'
navigator.geolocation = require('@react-native-community/geolocation');

const API_KEY = 'AIzaSyBejq7d1vneBB4Qh_Hcb6INto_3Y9FJWrQ'
let CurrentSlide = 0;
let IntervalTime = 4000;

interface Props {
    navigation: any
}

interface Image { 
    key: number,
    source: object,
}


const ListCarFormScreen: React.FC<Props> = (props) =>{

    const [images, setImages] = useState<Array<Image>>([]);
    const [index, setIndex] = useState(0)
    const scrollX = React.useRef(new Animated.Value(0)).current
    var [imageKey, setImageKey] = useState(0)
    const [pastMiddle, setPastMiddle] = useState(false)
    const flatList = React.createRef()
    const [currentPic, setCurrentPic] = useState(1)
    const onItemIndexChange = React.useCallback(setIndex, [])
    const scrollRef = React.useRef()
    const scrollRefParent = React.useRef()
    const [gestureName, setGestureName] = useState('none')    
    const [selectedValue, setSelectedValue] = useState('')
    const [invalidFields, setInvalidFields] = useState(true)
    const [loading, setLoading] = useState(false)
    const [carModel, setCarModel] = useState(models[cars[0]][0])
    const [carBrand, setCarBrand] = useState(cars[0])
    const leftMargin = useState(new Animated.Value(10))[0]

    const [isManual, setManual] = useState(false)
    const [isAutomatic, setAutomatic] = useState(false)

    const [isBenzina, setBenzina] = useState(false)
    const [isMotorina, setMotorina] = useState(false)
    const [isGaz, setGaz] =useState(false)
    const [isElectricitate, setElectricitate] = useState(false)
    
    const [nrSeats, setNrSeats] = useState(4)
    
    const seats = [1,2,3,4,5,6,7,8,9,10]

    const [km, setKm] = useState('')

    const [details, setDetails] = useState('')
  
    const [lat, setLat] = useState<number>(45.9852129)
    const [long, setLong] = useState<number>(24.6859225)
    const [locality, setLocality] = useState('')
    
    const [regionSearched, setRegionSearched] = useState({
      latitude: 45.9852129,
      longitude: 24.6859225,
      latitudeDelta: 5,
      longitudeDelta: 5,
    })
    const [region, setRegion] = useState({
      latitude: 45.9852129,
      longitude: 24.6859225,
      latitudeDelta: 5,
      longitudeDelta: 5,
    })

    const mapRef = React.useRef()
    const [currentAddress, setCurrentAddress] = useState('Romania')

 
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
              setImages(images.concat(source));
              console.log("in image picker ")
              console.log(images)
             
             
             
            }


    })


    }


    

   

  


    function addButton(){

      return(
        <View style = {{alignItems:"center"}}>
        <TouchableNativeFeedback
          
          onPress={()=>{chooseCarPicture()}}
          background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)')}>
              <View style = {styles.touchable}>
                  <Text style = {styles.textStyle}>+ Adauga o imagine pentru masina ta</Text>
              
              </View>
        </TouchableNativeFeedback>
        </View>
        
        
      )
    }

    function deleteCarPicture(){

      const tmp = [...images]
      console.log("image: ",images)
      console.log('index: ', index)
      console.log("tmp: ",tmp)
      
      console.log("tmp dupa slice: ",tmp)
      tmp.splice(index,1);
      setImages([...tmp])
      console.log('image dupa setimage tmp: ', images)
      
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
      
      console.log(images)
      
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

                {images.map((image,index: number) =>{

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
                  
                  {images.map((image: string,i: number)=>{

                      return(<Text style = {((index) == i) ? styles.activeBullet : styles.notActiveBullet }>{'\u2B24'}</Text>)
                  })}
                </View> 

                

                


        </View>
      
       

                )}  
                
                
      

 

    const onRegionChangeComplete = (newRegion)=>{

      console.log(newRegion); 
      setRegion(newRegion);
      Geocoder.geocodePosition({lat: newRegion.latitude, lng: newRegion.longitude}).then(res => {
        console.log(res[0].locality)
        setLocality(res[0].locality)
        setCurrentAddress(res[0].formattedAddress)
    })
    .catch(err => console.log(err))
    
    }


    function checkFields(){
      setInvalidFields(false)
      if(images.length==0){
        Alert.alert('Poza masinii', 'Alege cel putin o poza cu masina ta')
        if(scrollRefParent.current != undefined) scrollRefParent.current.scrollTo({x:0,y:0,animated:true})
        setInvalidFields(true)
      }
      
      if(!(isManual || isAutomatic)){
        
        Alert.alert('Manuala sau automata?','Trebuie sa alegeti modul de transmisie')
        if(scrollRefParent.current != undefined) scrollRefParent.current.scrollTo({x:0,y:0,animated:true})
        setInvalidFields(true)
      }
      if(!(isBenzina || isGaz || isElectricitate || isMotorina)){

        Alert.alert('Ce combustibil foloseste masina?','Alege tipul de combustibil al masinii folosit la alimentare')
        if(scrollRefParent.current != undefined) scrollRefParent.current.scrollTo({x:0,y:0,animated:true})
        setInvalidFields(true)
      }

      if(km == ''){
        Alert.alert('Kilometrajul masinii', 'Cati kilometri au fost parcursi cu aceasta masina?')
        if(scrollRefParent.current != undefined) scrollRefParent.current.scrollTo({x:0,y:0,animated:true})
        setInvalidFields(true)
      }

      
    }
    
    async function listCar(){
      var photosDownloadURL = []
      var usersListedCarsField = []
      checkFields();
      if(!invalidFields){

      

        // ********INSERT IMAGES IN STORAGE************

        const uid = auth().currentUser.uid
        
        var pictureNumber=0;
        console.log('mda')
        const myRef = database().ref().push();
        const car_key = myRef.key;
        var filePath
        
        for(const image of images) {
        
          
          filePath = `${uid}/ListedCarsPictures/${car_key}/${pictureNumber}`
          const {uri} = image.source  
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          console.log(uri)
          console.log(uid)
          const task = storage()
            .ref(filePath)
            .putFile(uploadUri);

            task.on('state_changed', taskSnapshot => {
              console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });
        
            task.then(() => {
              console.log('Image uploaded to the bucket!');
            }); 
            try {
              await task;

            } catch(e){
              console.error(e)
            }

            

            photosDownloadURL.push(await storage()
              .ref(filePath)
              .getDownloadURL());
            
              
            pictureNumber++;

        }

        database().ref(`/listedCars/${car_key}`).set({
          user: uid,
          photos: photosDownloadURL,
          brand: carBrand,
          model: carModel,
          transmission: getTransmissionString(),
          fuel: getFuelString(),
          available:true,
          kilometers: km,
          seats: nrSeats,
          latitude:region.latitude,

          longitude:region.longitude,
          locality:locality,
          address: currentAddress
          
        })

        
        database().ref(`/users/${uid}/listedCars`)
        .once('value', snapshot => {
          if(snapshot.val()) {
            console.log("snapshot val: ", snapshot.val())
            usersListedCarsField = snapshot.val()
          }
          usersListedCarsField.push(car_key)
         
          database().ref(`/users/${uid}`).update({
             listedCars: usersListedCarsField
           })

          });
    






       

      }  
        



    }


    function getTransmissionString(){
      isManual ? ('manuala') : ('automata') 
    }

    function getFuelString(){ 
      const fuel = ['motorina', 'benzina', 'gaz', 'electrica']
      if(isMotorina) return fuel[0]
      if(isBenzina) return fuel[1]
      if(isGaz) return fuel[2] 
      if(isElectricitate) return fuel[3]
      
    } 


    function removeMapHint(){

      Animated.timing(leftMargin, {
        toValue: -1000,
        duration:500,
        useNativeDriver:false
      }).start()
    }


    return(



            <View style = {{flex:1, justifyContent:"center", alignItems:"center",
            }}>
                <Loader loading={loading}/> 
                

                <ScrollView 
                  style = {{width:width}}
                  keyboardShouldPersistTaps={'handled'}
                  ref = {scrollRefParent}
                  
                  
                  >
                   
                    {images.length == 0 ? (addButton()) : (carPictures())}

                   
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
                        models[carBrand].map((model: string,index: number)=>{
                          

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


                      
                    <View style = {{paddingVertical:15}}>
                      <Text style = {{textDecorationLine:'underline', fontSize:20, marginLeft: width*0.1/2, marginBottom:10}} >Locuri</Text>
                      <View style = {{alignItems:'center'}}>
                      
                        <View style = {styles.pickerContainer}>
                        
                          <Picker
                            selectedValue={nrSeats}
                            style={styles.picker }
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) => setNrSeats(itemValue)}
                          >

                            {seats.map((seat,index)=>{
                              
                              return(
                                <Picker.Item label={seat.toString()} value={seat} />
                              )

                            })}
                            
                          </Picker>
                        </View>
                      </View> 
                  </View>
                          

                  <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                      <View style = {styles.delimiter}></View>
                    </View>


                    <View style = {{paddingVertical:15}}>
                      <Text style = {{textDecorationLine:'underline', fontSize:20, marginLeft: width*0.1/2, marginBottom:10}} >Kilometrii</Text>
                      <View style = {{alignItems:'center'}}>
                            
                          <TextInput 
                          style = {{...styles.pickerContainer, width:width*0.9}}
                          placeholder = 'Kilometrii...'
                          value = {km}
                          keyboardType = 'numeric'
                          onChangeText={text => setKm(text)}/>
                          
                                                  
                      </View> 
                  </View>


                  <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                      <View style = {styles.delimiter}></View>
                  </View>


                  <View style = {{paddingVertical:15}}>
                      <Text style = {{textDecorationLine:'underline', fontSize:20, marginLeft: width*0.1/2, marginBottom:10}} >Adauga detalii despre masina ta</Text>
                      <View style = {{alignItems:'center'}}>
                            
                          <TextInput 
                          style = {{...styles.pickerContainer, width:width*0.9, height:100,textAlignVertical: "top"}}
                          placeholder = 'Detalii...'
                          value = {details}
                          multiline={true}
                          onChangeText={text => setDetails(text)}/>
                          
                                                  
                      </View> 
                  </View>


                  <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>  
                      <View style = {styles.delimiter}></View>
                  </View>


                  <View style = {{paddingVertical:15}}>
                      <Text style = {{textDecorationLine:'underline', fontSize:20, marginLeft: width*0.1/2, marginBottom:10}} >Unde se afla masina ta?</Text>
                      <GooglePlacesAutocomplete
                        placeholder='Locatia...'
                        fetchDetails
                        onPress={(data, details = null) => {
                          // 'details' is provided when fetchDetails = true
                          console.log(data,details);
                          
                          if(details){
                            setLat(details.geometry.location.lat)
                            setLong(details.geometry.location.lng)
                            
                            setCurrentAddress(details.name)
                            mapRef.current.animateToRegion({
                              latitude: details.geometry.location.lat,
                              longitude: details.geometry.location.lng,
                              latitudeDelta: 0.000922,
                              longitudeDelta: 0.000421
                            })
                            
                          }
                        }}
                        query={{
                          //TODO: secure KEY with crypto or smth
                          key: API_KEY,
                          language: 'en',
                        }}
                        currentLocation={true}
                        currentLocationLabel='Locatia curenta'
                      />
                      <View>
                        <MapView
                          style={styles.map}
                          ref={mapRef}
                          showsUserLocation
                          userLocationUpdateInterval = {100}
                          onPress={e => console.log(e.nativeEvent)}
                          initialRegion={{
                            latitude: 45.9852129,
                            longitude: 24.6859225,
                            latitudeDelta: 5,
                            longitudeDelta: 5,
                          }}
                          
                          
                          onRegionChangeComplete={onRegionChangeComplete}
                          />

                          <View style = {{position:"absolute",top:0,bottom:0,left:0,right:0,justifyContent:"center",alignItems:"center"}}>
                              <View style = {{backgroundColor:"black", width:7, height:7, borderRadius:20}}>

                              </View>

                          </View>
                          <View style = {{position:"absolute",bottom:10,left:0,right:0,alignItems:"center"}}>
                            <View style = {{paddingHorizontal:5, borderRadius:15,backgroundColor:'rgba(218, 223, 225, 0.7)'}}>
                                  <Text style = {{textAlign:"center", fontSize:15}}>{currentAddress}</Text>
                              </View>
                          </View>

                          <Animated.View style = {{...styles.hintStyle, left:leftMargin}}>
                            <View style = {{flexDirection:'row',paddingHorizontal:5, borderRadius:15,backgroundColor:'white', ...styles.shadowStyle}}>
                                  <Text style = {{textAlign:"center", fontSize:20}}>Pozitioneaza punctul negru acolo unde se afla masina ta</Text>
                                  <View style = {{borderWidth:0.5, borderColor:"black", marginVertical:5}}></View>
                                  <TouchableOpacity onPress = {()=>{removeMapHint()}}  style = {{justifyContent:"center"}}>
                              
                                    <Icon name="close" size={35} color="black"/>
                                  
                                  </TouchableOpacity>
                              </View>
                          </Animated.View>

                          

                          
                        </View>

                        


                      
                  </View>




                <View style ={{height:100}}></View>



                </ScrollView> 




                <TouchableOpacity style ={styles.listCarButton} onPress={()=>{listCar()}}>
                    <View>
                        <Text>Inregistreaza masina</Text>
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
        width:width*0.9,
       
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
        borderWidth:1,
        marginTop:10,
        borderRadius:5
       
      },
      picker:{
        width:width*0.9,
        
        
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
      map: {
        width:width,
        height:300,
      
      },
      hintStyle:{
        position:"absolute",
        top:"20%",
        width:width*0.8,
        alignItems:"center",
      

      
      },

      shadowStyle:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        
      }



    

})