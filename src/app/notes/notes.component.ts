import { Component, OnInit } from '@angular/core';

import {FirebaseService} from '../firebase.service'

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    items: Array<any>;

    constructor(
        public firebaseService: FirebaseService
    ){}

    ngOnInit(){
        this.getData();
    }

    getData(){
        this.firebaseService.getNotes().subscribe((res) => {
            this.items = res;
        });
    }
}
