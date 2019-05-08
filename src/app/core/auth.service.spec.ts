import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import {AngularFireAuthStub} from '../testing/angular-fire-auth-stub';
import {firebaseAuthStub, AuthProviderStub} from '../testing/firebase-stub';
import {environment} from '../../environments/environment';

firebase.initializeApp(environment.firebase);

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                {
                    provide: AngularFireAuth,
                    useValue: AngularFireAuthStub
                }
            ]
        })

        service = TestBed.get(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // functions
    it('doRegister should resolve the promise if credentials are valid', fakeAsync(() => {
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let resolved = false;
        service.doRegister({
            email: 'user@mail.com',
            password: 'secret'
        }).then(() => {
            resolved = true;
        }).catch(() => {
            resolved = false;
        });
        tick();

        expect(resolved).toBe(true);
    }));

    it('doRegister should reject the promise if credentials are invalid', fakeAsync(() => {
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let rejected = false;
        service.doRegister({
            email: 'user@mail.com',
            password: 'secret1'
        }).then(() => {
            rejected = false;
        }).catch(() => {
            rejected = true;
        });
        tick();

        expect(rejected).toBe(true);
    }));

    it('doLogin should resolve the promise if credentials are valid', fakeAsync(() => {
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let resolved = false;
        service.doLogin({
            email: 'user@mail.com',
            password: 'secret'
        }).then(() => {
            resolved = true;
        }).catch(() => {
            resolved = false;
        });
        tick();

        expect(resolved).toBe(true);
    }));

    it('doLogin should reject the promise if credentials are invalid', fakeAsync(() => {
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let rejected = false;
        service.doLogin({
            email: 'user@mail.com',
            password: 'secret1'
        }).then(() => {
            rejected = false;
        }).catch(() => {
            rejected = true;
        });
        tick();

        expect(rejected).toBe(true);
    }));

    it('doGoogleLogin should resolve the promise if login is successful', fakeAsync(() => {
        AuthProviderStub.successful = true;
        spyOn(firebase.auth, 'GoogleAuthProvider').and.returnValue(AuthProviderStub);

        let resolved;
        service.doGoogleLogin().then(() => {
            resolved = true;
        }).catch((error) => {
            resolved = false;
        });
        tick();

        expect(resolved).toBe(true);
    }));

    it('doGoogleLogin should reject the promise if login is not successful', fakeAsync(() => {
        AuthProviderStub.successful = false;
        spyOn(firebase.auth, 'GoogleAuthProvider').and.returnValue(AuthProviderStub);

        let rejected;
        service.doGoogleLogin().then(() => {
            rejected = false;
        }).catch((error) => {
            rejected = true;
        });
        tick();

        expect(rejected).toBe(true);
    }));

    it('doFacebookLogin should resolve the promise if login is successful', fakeAsync(() => {
        AuthProviderStub.successful = true;
        spyOn(firebase.auth, 'FacebookAuthProvider').and.returnValue(AuthProviderStub);

        let resolved;
        service.doFacebookLogin().then(() => {
            resolved = true;
        }).catch((error) => {
            resolved = false;
        });
        tick();

        expect(resolved).toBe(true);
    }));

    it('doFacebookLogin should reject the promise if login is not successful', fakeAsync(() => {
        AuthProviderStub.successful = false;
        spyOn(firebase.auth, 'FacebookAuthProvider').and.returnValue(AuthProviderStub);

        let rejected;
        service.doFacebookLogin().then(() => {
            rejected = false;
        }).catch((error) => {
            rejected = true;
        });
        tick();

        expect(rejected).toBe(true);
    }));

    it('doTwitterLogin should resolve the promise if login is successful', fakeAsync(() => {
        AuthProviderStub.successful = true;
        spyOn(firebase.auth, 'TwitterAuthProvider').and.returnValue(AuthProviderStub);

        let resolved;
        service.doTwitterLogin().then(() => {
            resolved = true;
        }).catch((error) => {
            resolved = false;
        });
        tick();

        expect(resolved).toBe(true);
    }));

    it('doTwitterLogin should reject the promise if login is not successful', fakeAsync(() => {
        AuthProviderStub.successful = false;
        spyOn(firebase.auth, 'TwitterAuthProvider').and.returnValue(AuthProviderStub);

        let rejected;
        service.doTwitterLogin().then(() => {
            rejected = false;
        }).catch((error) => {
            rejected = true;
        });
        tick();

        expect(rejected).toBe(true);
    }));

    it('doLogout should resolve the promise if a user is authenticated', fakeAsync(() => {
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let resolved = false;
        service.doLogout().then(() => {
            resolved = true;
        }).catch(() => {
            resolved = false;
        })
        tick();

        expect(resolved).toBe(true);
    }));

    it('doLogout should reject the promise if no user is authenticated', fakeAsync(() => {
        firebaseAuthStub.currentUser = undefined;
        spyOn(firebase, 'auth').and.returnValue(firebaseAuthStub);

        let rejected = false;
        service.doLogout().then(() => {
            rejected = false;
        }).catch(() => {
            rejected = true;
        })
        tick();

        expect(rejected).toBe(true);
    }));
});
