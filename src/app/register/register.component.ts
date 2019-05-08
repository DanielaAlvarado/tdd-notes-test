import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router, Params} from '@angular/router';

import {AuthService} from '../core/auth.service';

declare var mdc;
var textFields;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm = this.fb.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required]
    });
    alert: string = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private router: Router
    ){}

    ngOnInit(){
        textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(textField){
            return new mdc.textField.MDCTextField(textField);
        });
    }

    tryRegister(value){
        this.authService.doRegister(value).then((res) => {
            console.log(res);
            this.alert = '&nbsp;';
            this.router.navigate(['/notes']);
        }, (error) => {
            console.log(error);
            this.alert = error.message;
        });
    }
}
