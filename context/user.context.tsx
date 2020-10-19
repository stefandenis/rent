import React from 'react'
import 'firebase'

export interface UserContext {
    user: firebase.User | null,
    refreshUser: () => void;
    unseenMessagesCount: number;
    messages: Array<object>;
}

export const USER_DEFAULT_VALUE ={
    user: null,
    refreshUser: ()=>{},
    unseenMessagesCount: 0,
    messages: []
}

export const userContext = React.createContext<UserContext>(USER_DEFAULT_VALUE);