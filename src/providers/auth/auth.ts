import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/database';
import 'rxjs/add/operator/map';
import firebase, { User } from 'firebase/app';
import 'firebase/database'

@Injectable()
export class AuthProvider {

  userProfile:firebase.database.Reference;
  currentUser:User;
  constructor() {
 
  }

  
  getUserProfile():firebase.database.Reference{
    return this.userProfile
  }

  signIn(email:string,password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  signOut():Promise<any>{
    return firebase.auth().signOut();
  }
  // signOut():Promise<any>{
  //   const userId:string = firebase.auth().currentUser.uid;
  //   firebase.database().ref(`/userProfile/${userId}`).off();
  //   return firebase.auth().signOut();
  // }
  passwordreset(email:string) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
}
signUp(email:string,password:string):Promise<any> {
  return firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(newUserCred=>{
    firebase.database().ref(`/userProfile/${newUserCred.user.uid}/email`).set(email);
  }).catch(error=>{
    throw new Error(error);
  })
}


}

