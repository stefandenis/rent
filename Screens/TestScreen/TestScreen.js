import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions
  } from 'react-native';

  import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
  const {width, height} = Dimensions.get('window');


function TestScreen({route, navigation}) {

    const {carName} = route.params

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'green' }}>
       
      <Text>{carName}</Text>
          
        
      </View>
    );
  }




  export default TestScreen;