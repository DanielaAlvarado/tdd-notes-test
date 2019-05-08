import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {FirebaseService} from '../firebase.service';

declare var mdc;
var textFields;

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
    createNoteForm = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required]
    });
    color: string = '#F3778F';

    constructor(
        private fb: FormBuilder,
        public firebaseService: FirebaseService,
        private router: Router
    ){}

    ngOnInit() {
        textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(textField){
            return new mdc.textField.MDCTextField(textField);
        });
    }

    onSubmit(value){
        this.firebaseService.createNote(value, this.color).then((res) => {
            this.router.navigate(['/notes']);
        })
    }
}
