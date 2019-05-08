import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../firebase.service';

declare var mdc;
var textFields;

@Component({
    selector: 'app-edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
    editNoteForm: FormGroup;
    item: any;
    color: string = '#F3778F';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public firebaseService: FirebaseService,
        private router: Router
    ){}

    ngOnInit(){
        textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(textField){
            return new mdc.textField.MDCTextField(textField);
        });

        this.route.data.subscribe((routeData) => {
            let data = routeData['note'];
            if(data){
                this.item =  data.payload.data();
                this.item.id = data.payload.id;
                this.createForm();
                this.color = this.item.color;
            }
        });
    }

    createForm(){
        this.editNoteForm = this.fb.group({
            title: [this.item.title, Validators.required],
            content: [this.item.content, Validators.required]
        });
    }

    onSubmit(value){
        value.color = this.color;

        this.firebaseService.updateNote(this.item.id, value).then((res) => {
            this.router.navigate(['/note/' + this.item.id]);
        }, (error) => {
            console.log('Error while updating note');
        });
    }
}
