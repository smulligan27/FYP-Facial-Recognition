import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
    
  @Injectable()
  export class AuthenticateService {
   
    constructor(){}
   
    //uses firebases authentication service to verify if email and password are correct
    loginUser(value){
     return new Promise<any>((resolve, reject) => {
       firebase.auth().signInWithEmailAndPassword(value.email, value.password)
       .then(
         res => resolve(res),
         err => reject(err))
     })
    }
   
    //terminates the session
    logoutUser(){
      return new Promise((resolve, reject) => {
        if(firebase.auth().currentUser){
          firebase.auth().signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
        }
      })
    }
   
  }
 
