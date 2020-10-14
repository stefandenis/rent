import React, { Component, useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableNativeFeedback
  } from 'react-native';

import CarPreviewBox from '../../CustomComponents/CarPreviewBox'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {userContext} from '../../context/user.context'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';

function MessageBody({navigation, route}) {

    return(


    )

}

export default MessageBody;