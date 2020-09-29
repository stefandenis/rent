import { QuerySnapshot } from '@google-cloud/firestore'
import firestore from '@react-native-firebase/firestore'


interface Data{ 
    locality: string,
    user_uid: string
}


export async function getSearchCards(data: Data){
    var final_cars = {data:{}}
   return await firestore().collection('listedCars')
        .where('locality', '==', data.locality)
        .get()
        .then( querySnapshot=>{
            querySnapshot.forEach( doc => {
                console.log(`${doc.id} => ${doc.data()}`)
                if(doc.data().user != data.user_uid)
                    final_cars.data[`${doc.id}`] = doc.data()
            })
        
            return final_cars
        })
    
}