import React, {useState, useEffect} from 'react';

import {Text, View, Button} from 'react-native';


function ProfileScreen() {

  const [count, setCount] = useState(0);
  useEffect(() => {
    // Update the document title using the browser API
    console.log("called")
  });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'blue' }}>
        <Text>You clicked {count} times</Text>
        <Button onPress = {()=>setCount(count+1)} title = "Click me!"/>

      </View>
    );
  }

  export default ProfileScreen;