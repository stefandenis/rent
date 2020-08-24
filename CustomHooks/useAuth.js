import React, {useState} from 'react'
import auth from '@react-native-firebase/auth';
export const useAuth = () => {
    const [state, setState] = React.useState(() => { const user = auth().currentUser; return { initializing: !user, user, } })
    function onChange(user) {
      setState({ initializing: false, user })
    }
  
    React.useEffect(() => {
      // listen for auth state changes
      const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
      // unsubscribe to the listener when unmounting
      return () => unsubscribe()
    }, [])
  
    return state
  }