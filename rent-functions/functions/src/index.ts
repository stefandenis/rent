import * as functions from 'firebase-functions';
const admin = require('firebase-admin')
admin.initializeApp()

const database = admin.database()

interface Data {
  locality: string,
  user: string
}

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


export const getCarCards = functions.https.onCall((data: Data) => { 
  
  var final_cars = {}
  
  return database.ref('/listedCars').once('value').then((snapshot: any) => {
    console.log(snapshot.val())
    const car_keys: Array<string> = Object.keys(snapshot.val())
    for(var car_key of car_keys){

      if(snapshot.val()[`${car_key}`].locality == data.locality && snapshot.val()[`${car_key}`].user != data.user ){
        (<any>final_cars)[`${car_key}`] = snapshot.val()[`${car_key}`]
      }
    }
    console.log('salutare')
    console.log('final_cars: ', final_cars)
    console.log('data.locality: ', data.locality)
    return final_cars
  })
});
