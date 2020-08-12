import React, {useState, useEffect} from 'react';

import {Text, View, Button, SafeAreaView, ScrollView, StyleSheet} from 'react-native';


function ProfileScreen() {

  const [count, setCount] = useState(0);
  useEffect(() => {
    // Update the document title using the browser API
    console.log("called")
  });

    return (
      <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={{backgroundColor:"red",height:500}}>
            <Text>sdfsd</Text>

            <View style = {{flex:1, backgroundColor:"gray"}}>

            </View>
            <View style = {{flex:1, backgroundColor:"blue"}}>

          </View>
          <View style = {{flex:1, backgroundColor:"green"}}>

          </View>
        
          
          
          </View>
            
          <View style={{flex:1,backgroundColor:"gray",height:500}}>
            <Text>sfds</Text>

          </View >

          <View style={{backgroundColor:"green", height:500}}>
          <Text>sdfsd</Text>
          </View>

      
      
    </ScrollView>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1

  }
})

  export default ProfileScreen;