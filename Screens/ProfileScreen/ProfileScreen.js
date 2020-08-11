import React, {useState} from 'react';

import {Text, View, Button} from 'react-native';


function ProfileScreen() {

  const [count, setCount] = useState(0);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You clicked {count} times</Text>
        <Button onPress = {()=>setCount(count+1)} title = "Click me!"/>

      </View>
    );
  }

  export default ProfileScreen;