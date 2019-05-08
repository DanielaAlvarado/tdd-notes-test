import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {FirebaseService} from '../firebase.service';

@Injectable({
    providedIn: 'root'
})
export class NoteResolver implements Resolve<any>{
    constructor(
        public firebaseService: FirebaseService
    ){}

    resolve(route: ActivatedRouteSnapshot){
        return new Promise((resolve, reject) => {
            let noteId = route.paramMap.get('id');
            this.firebaseService.getNote(noteId).subscribe((data) => {
                resolve(data);
            });
        });
    }
}
