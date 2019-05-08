import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import {FirebaseUserModel} from '../core/user.model';
import {UserService} from '../core/user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<FirebaseUserModel>{
    constructor(
        public userService: UserService,
        private router: Router
    ){}

    resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel>{
        let user = new FirebaseUserModel();

        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser().then((res) => {
                if(res.providerData[0].providerId == 'password'){
                    user.image = 'https://via.placeholder.com/400x300';

                }else{
                    user.image = res.photoURL;
                }
                user.name = res.displayName;
                user.provider = res.providerData[0].providerId;
                
                return resolve(user);
            }, (error) => {
                this.router.navigate(['/login']);
                return reject(error);
            });
        });
    }
}
