import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginComponent } from './login.component';
import {AuthService} from '../core/auth.service';
import {AuthServiceStub} from '../testing/auth-service-stub';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let element: HTMLElement;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: AuthServiceStub
                },
                {
                    provide: Router,
                    useValue: routerSpy
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // functions
    it('submitting correct credentials should redirect to /notes', fakeAsync(() => {
        component.loginForm.controls['email'].setValue('user@mail.com');
        component.loginForm.controls['password'].setValue('secret');

        component.tryLogin(component.loginForm.value);
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    it('submitting incorrect credentials should display an error message', fakeAsync(() => {
        component.loginForm.controls['email'].setValue('user@mail.com');
        component.loginForm.controls['password'].setValue('secret1');

        component.tryLogin(component.loginForm.value);
        tick();

        expect(component.alert).not.toBe('&nbsp;');
    }));

    it('successful goolge login should redirect to /notes', fakeAsync(() => {
        component.tryGoogleLogin();
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    it('successful facebook login should redirect to /notes', fakeAsync(() => {
        component.tryFacebookLogin();
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    it('successful twitter login should redirect to /notes', fakeAsync(() => {
        component.tryTwitterLogin();
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    // form
    it('form should be invalid when email is empty', () => {
        component.loginForm.controls['password'].setValue('secret');
        let errors = component.loginForm.controls['email'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    it('form should be invalid when password is empty', () => {
        component.loginForm.controls['email'].setValue('user@mail.com');
        let errors = component.loginForm.controls['password'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    // binding
    it('should bind alert property to alert element', () => {
        const alert: HTMLHeadingElement = element.querySelector('#alert');

        expect(alert.innerHTML).toEqual(component.alert);
    });

    it('should bind inputs to form', () => {
        const email: HTMLInputElement = element.querySelector('#email');
        const password: HTMLInputElement = element.querySelector('#password');

        email.value = 'user@mail.com';
        password.value = 'secret';

        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(email.value).toEqual(component.loginForm.value.email);
        expect(password.value).toEqual(component.loginForm.value.password);
    });

    it('should handle form submit with tryLogin', () => {
        component.loginForm.controls['email'].setValue('user@mail.com');
        component.loginForm.controls['password'].setValue('secret');
        fixture.detectChanges();

        const submit: HTMLButtonElement = element.querySelector('#submit');
        const tryLoginSpy = spyOn(component, 'tryLogin');

        submit.click();

        expect(tryLoginSpy).toHaveBeenCalled();
    });

    it('should handle google login with tryGoogleLogin', () => {
        const googleLogin: HTMLButtonElement = element.querySelector('#google-login');
        const tryGoogleLoginSpy = spyOn(component, 'tryGoogleLogin');

        googleLogin.click();

        expect(tryGoogleLoginSpy).toHaveBeenCalled();
    });

    it('should handle facebook login with tryFacebookLogin', () => {
        const facebookLogin: HTMLButtonElement = element.querySelector('#facebook-login');
        const tryFacebookLoginSpy = spyOn(component, 'tryFacebookLogin');

        facebookLogin.click();

        expect(tryFacebookLoginSpy).toHaveBeenCalled();
    });

    it('should handle twitter login with tryTwitterLogin', () => {
        const twitterLogin: HTMLButtonElement = element.querySelector('#twitter-login');
        const tryTwitterLoginSpy = spyOn(component, 'tryTwitterLogin');

        twitterLogin.click();

        expect(tryTwitterLoginSpy).toHaveBeenCalled();
    });

    it('should disable submit button if form is not valid', () => {
        const submit: HTMLButtonElement = element.querySelector('#submit');

        expect(submit.hasAttribute('disabled')).toBe(true);
    });
});
