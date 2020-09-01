import React , {useState, useEffect} from 'react';
import {Modal, View, Text, StyleSheet,Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    open: boolean,
    close: () => void
}

const PrivacyPolicy: React.FC<Props> = (props)=>{

    const [openModal, setOpenModal] = useState(true);
    
    return(

            
            <Modal 
            

            visible={props.open} 
            animationType="slide"
            statusBarTranslucent={true}
           
            >
            <View style = {styles.termsContainer}>
                <View  style = {styles.icon}>
             <TouchableOpacity onPress={()=>{props.close()}}> 
                <Icon name="close" size={35} color="black" />
             </TouchableOpacity> 
             </View>
           
            <View style = {styles.termsContainer}>
                
                <Text>Privacy Policy</Text>    
            </View>       

            </View>

            </Modal>

           







    );


}


const styles = StyleSheet.create({

    termsContainer:{
        flex:1, 
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{
        position:"absolute",
        top:"5%",
        left:"5%"
    }
    
})

export default PrivacyPolicy;