import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../core/auth.service';

declare var mdc;
var textFields;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    alert: string = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ){}

    ngOnInit() {
        textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(textField){
            return new mdc.textField.MDCTextField(textField);
        });
    }

    tryLogin(value){
        this.authService.doLogin(value).then((res) => {
            this.router.navigate(['/notes']);
        }, (error) => {
            console.log(error);
            this.alert = error.message;
        });
    }

    tryGoogleLogin(){
        this.authService.doGoogleLogin().then((res) => {
            this.router.navigate(['/notes']);
        });
    }

    tryFacebookLogin(){
        this.authService.doFacebookLogin().then((res) => {
            this.router.navigate(['/notes']);
        });
    }

    tryTwitterLogin(){
        this.authService.doTwitterLogin().then((res) => {
            this.router.navigate(['/notes']);
        });
    }
}
