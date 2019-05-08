import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FirebaseService} from '../firebase.service'

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
    item: any;

    constructor(
        private route: ActivatedRoute,
        public firebaseService: FirebaseService,
        private router: Router
    ){}

    ngOnInit(){
        this.route.data.subscribe((routeData) => {
            let data = routeData['note'];
            if(data){
                this.item = data.payload.data();
                this.item.id = data.payload.id;
            }
        });
    }

    delete(){
        this.firebaseService.deleteNote(this.item.id).then((res) => {
            this.router.navigate(['/notes']);
        }, (error) => {
            console.log('Error while deleting note');
        });
    }
}
