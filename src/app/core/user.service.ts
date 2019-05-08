import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth
    ){}

    getCurrentUser(){
        return new Promise<any>((resolve, reject) => {
            var user = firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    resolve(user);
                }else{
                    reject('No user logged in');
                }
            });
        });
    }
}
