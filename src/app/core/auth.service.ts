import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth
    ){}

    doRegister(value){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then((res) => {
                var user = firebase.auth().currentUser;
                return user.updateProfile({
                    displayName: value.name,
                    photoURL: user.photoURL
                });
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    doLogin(value){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password).then((res) =>{
                resolve(res);
            }, (error) => {
                reject(error);
            });
        });
    }

    doGoogleLogin(){
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');

            this.afAuth.auth.signInWithPopup(provider).then((res) => {
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    doFacebookLogin(){
        return new Promise<any>((resolve, reject) =>{
            let provider = new firebase.auth.FacebookAuthProvider();

            this.afAuth.auth.signInWithPopup(provider).then((res) => {
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    doTwitterLogin(){
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.TwitterAuthProvider();

            this.afAuth.auth.signInWithPopup(provider).then((res) => {
                resolve(res);
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    doLogout(){
        return new Promise((resolve, reject) => {
            if(firebase.auth().currentUser){
                this.afAuth.auth.signOut();
                resolve();
            }else{
                reject();
            }
        })
    }
}
