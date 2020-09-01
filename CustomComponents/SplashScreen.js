import * as React from 'react';
import { View, StyleSheet,Image } from 'react-native';


export default function SplashScreen({navigation}){
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('../images/logoR.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "50%",
    backgroundColor: '#00001a',
    padding: 4,
  },
  logo:{
  width:"36%",
  height:"18%",
  }
});