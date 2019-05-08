import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router'

import { RegisterComponent } from './register.component';
import {AuthService} from '../core/auth.service';
import {AuthServiceStub} from '../testing/auth-service-stub';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let element: HTMLElement;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RegisterComponent
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
                    useValue: routerSpy,
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // functions
    it('submitting correct credentials should redirect to /notes', fakeAsync(() => {
        component.registerForm.controls['email'].setValue('user@mail.com');
        component.registerForm.controls['password'].setValue('secret');

        component.tryRegister(component.registerForm.value);
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    it('submitting incorrect credentials should display an error message', fakeAsync(() => {
        component.registerForm.controls['email'].setValue('user@mail.com');
        component.registerForm.controls['password'].setValue('secret1');

        component.tryRegister(component.registerForm.value);
        tick();

        expect(component.alert).not.toBe('&nbsp;');
    }));

    // form
    it('form should be invalid when email is empty', () => {
        component.registerForm.controls['name'].setValue('Test User');
        component.registerForm.controls['password'].setValue('secret');
        let errors = component.registerForm.controls['email'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    it('form should be invalid when name is empty', () => {
        component.registerForm.controls['email'].setValue('user@mail.com');
        component.registerForm.controls['password'].setValue('secret');
        let errors = component.registerForm.controls['name'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    it('form should be invalid when password is empty', () => {
        component.registerForm.controls['email'].setValue('user@mail.com');
        component.registerForm.controls['name'].setValue('Test User');
        let errors = component.registerForm.controls['password'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    // binding
    it('should bind alert property to alert element', () => {
        const alert: HTMLHeadingElement = element.querySelector('#alert');

        expect(alert.innerHTML).toEqual(component.alert);
    });

    it('should bind inputs to form', () => {
        const email: HTMLInputElement = element.querySelector('#email');
        const name: HTMLInputElement = element.querySelector('#name');
        const password: HTMLInputElement = element.querySelector('#password');

        email.value = 'user@mail.com';
        name.value = 'Test User';
        password.value = 'secret';

        email.dispatchEvent(new Event('input'));
        name.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(email.value).toEqual(component.registerForm.value.email);
        expect(name.value).toEqual(component.registerForm.value.name);
        expect(password.value).toEqual(component.registerForm.value.password);
    });

    it('should handle form submit with tryRegister', () => {
        component.registerForm.controls['email'].setValue('user@mail.com');
        component.registerForm.controls['name'].setValue('Test User');
        component.registerForm.controls['password'].setValue('secret');
        fixture.detectChanges();

        const submit: HTMLButtonElement = element.querySelector('#submit');
        const tryRegisterSpy = spyOn(component, 'tryRegister');

        submit.click();

        expect(tryRegisterSpy).toHaveBeenCalled();
    });
});
