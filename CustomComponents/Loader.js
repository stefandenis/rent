/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, {useState, useEffect} from 'react';

//Import all required component
import { StyleSheet, View, Modal, ActivityIndicator,Dimensions,Animated,Easing} from 'react-native';
import AnimatedCircularProgress from 'react-native-circular-progress'

import Svg, {Circle, Image, G, Path} from 'react-native-svg'
const image = require('../images/logoR.png') 
const {width, height} = Dimensions.get('window')


const radius = 250
const circumference = radius * 2 * Math.PI

const Loader = props => {
  
  const { loading } = props;
  const fillAnimation = new Animated.Value(circumference)
  const [forceRender, setForceRender] = useState(true)
  const zero = new Animated.Value(0)
  const rotation = new Animated.Value(0)
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const [strokeOpacity, setStrokeOpacity] = useState(0)

  useEffect(()=>{
    console.log('console log din use effect loader2')
    animate()

  },[loading])
  
function  animate(easing) {
    
      
      Animated.timing(fillAnimation, {
        toValue: 0,
        duration:1000,
        useNativeDriver:true,
        easing
      }).start(() => {
        
        Animated.timing(fillAnimation, {
          toValue: -circumference,
          duration:1000,
          useNativeDriver:true,
          easing
        }).start(()=>{
          fillAnimation.setValue(circumference)
          animate()

        })
        


    
    
    

  });




  }
 
  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      animationType={'none'}
      visible={loading}
      presentationStyle='overFullScreen'
      onRequestClose={() => {
        //
        
      }}>
      <View style={styles.modalBackground}>
        <View style = {{}}>
        <Svg
            width={width*0.3}
            height={width*0.3}
            fill="blue"
            stroke="red"
            color="green"
            viewBox="0 0 544 544"


          >
            <G rotation='90' origin="272, 272">
            <AnimatedCircle cx="272" cy="272" r={radius} fill="none" stroke="#26BDFD" strokeWidth = {30} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={fillAnimation}/>
            
            
            
            </G>
            <Image
              x="11%"
              y="11%"
              width="80%"
              height="80%"
              preserveAspectRatio="xMidYMid slice"
              opacity="1"
              href={require('../images/logoR.png')}
              clipPath="url(#clip)"
            />
          </Svg>

        
       
        </View>
      </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  
  


 
});