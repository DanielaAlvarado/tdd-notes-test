import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(public db: AngularFirestore){}

    createNote(value, color){
        return this.db.collection('notes').add({
            title: value.title,
            titleToSearch: value.title.toLowerCase(),
            content: value.content,
            color
        });
    }

    getNotes(){
        return this.db.collection('notes').snapshotChanges();
    }

    getNote(noteKey){
        return this.db.collection('notes').doc(noteKey).snapshotChanges();
    }

    updateNote(noteKey, value){
        value.titleToSearch = value.title.toLowerCase();

        return this.db.collection('notes').doc(noteKey).set(value);
    }

    deleteNote(noteKey){
        return this.db.collection('notes').doc(noteKey).delete();
    }
}
