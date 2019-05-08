import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FirebaseUserModel} from '../core/user.model'
import {AuthService} from '../core/auth.service';

declare var mdc;
var topAppBar;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() title: string;
    user: FirebaseUserModel = new FirebaseUserModel();
    drawer;

    constructor(
        private route: ActivatedRoute,
        public authService: AuthService,
        private router: Router
    ){}

    ngOnInit(){
        topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
        this.drawer = new mdc.drawer.MDCDrawer(document.querySelector('.mdc-drawer'));

        this.route.data.subscribe((routeData) => {
            let data = routeData['data'];
            if(data){
                this.user = data;
            }
        });
    }

    logout(){
        this.authService.doLogout().then((res) => {
            this.router.navigate(['/login']);
        }, (error) => {
            console.log('Logout error');
        });
    }

    openDrawer(){
        this.drawer.open = true;
    }
}
