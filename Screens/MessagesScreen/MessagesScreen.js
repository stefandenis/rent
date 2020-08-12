import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions
  } from 'react-native';

  import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
  const {width, height} = Dimensions.get('window');


function MessagesScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'green' }}>
       
        <CarPreviewBox source={require('../../images/lambo.jpg')}/>
          
        
      </View>
    );
  }




  export default MessagesScreen;