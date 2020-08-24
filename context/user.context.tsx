import React from 'react'
import 'firebase'

export interface UserContext {
    user: firebase.User | null,
    refreshUser: () => void;

}

export const USER_DEFAULT_VALUE ={
    user: null,
    refreshUser: ()=>{},
}

export const userContext = React.createContext<UserContext>(USER_DEFAULT_VALUE);