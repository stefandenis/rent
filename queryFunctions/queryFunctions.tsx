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



export async function filterCards(dataFilter: object, user_uid: string, locality: string){

    var keys = Object.keys(dataFilter)
    var values = Object.values(dataFilter)
    
    var firestore_cars = {data:{}}
    return await firestore().collection('listedCars')
        .get()
        .then( querySnapshot=>{
            querySnapshot.forEach( doc => {
                console.log(`${doc.id} => ${doc.data()}`)
                var passFlag = true;
                                            
                
                if(doc.data().user !== user_uid){
                    if(doc.data().locality === locality){
                        for(var i = 0; i<keys.length; i++){
                            console.log(doc.data(),dataFilter[`${keys[i]}`])
                            if(doc.data()[`${keys[i]}`] !== dataFilter[`${keys[i]}`])
                                passFlag = false
                        }

                        if(passFlag){
                            firestore_cars.data[`${doc.id}`] = doc.data() 
                        }
                    }
                }


               
            })
        
            return firestore_cars
        })

}