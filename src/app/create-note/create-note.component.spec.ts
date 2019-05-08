import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {Router, ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../testing/activated-route-stub';

import { CreateNoteComponent } from './create-note.component';
import {UserComponent} from '../user/user.component';
import {FirebaseService} from '../firebase.service';
import {AuthService} from '../core/auth.service';
import {AuthServiceStub} from '../testing/auth-service-stub';
import {FirebaseServiceStub} from '../testing/firebase-service-stub';

describe('CreateNoteComponent', () => {
    let component: CreateNoteComponent;
    let fixture: ComponentFixture<CreateNoteComponent>;
    let element: HTMLElement;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateNoteComponent,
                UserComponent
            ],
            imports: [
                ReactiveFormsModule,
                ColorPickerModule
            ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: FirebaseServiceStub
                },
                {
                    provide: Router,
                    useValue: routerSpy
                },
                {
                    provide: ActivatedRoute,
                    useValue: ActivatedRouteStub
                },
                {
                    provide: AuthService,
                    useValue: AuthServiceStub
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateNoteComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // functions
    it('should navigate to /notes after note is created', fakeAsync(() => {
        component.createNoteForm.controls['title'].setValue('This is a title');
        component.createNoteForm.controls['content'].setValue('This is the content');

        component.onSubmit(component.createNoteForm.value);
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    //form
    it('form should be invalid when title is empty', () => {
        component.createNoteForm.controls['content'].setValue('This is the content');
        let errors = component.createNoteForm.controls['title'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    it('form should be invalid when content is empty', () => {
        component.createNoteForm.controls['title'].setValue('This is a title');
        let errors = component.createNoteForm.controls['content'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    // binding
    it('should pass page title to user component', () => {
        const pageTitle: HTMLSpanElement = element.querySelector('#page-title');

        expect(pageTitle.innerHTML).toEqual('Create note');
    });

    it('should bind inputs to form', () => {
        const title: HTMLInputElement = element.querySelector('#title');
        const content: HTMLInputElement = element.querySelector('#content');

        title.value = 'This is a title';
        content.value = 'This is the content';

        title.dispatchEvent(new Event('input'));
        content.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(title.value).toEqual(component.createNoteForm.value.title);
        expect(content.value).toEqual(component.createNoteForm.value.content);
    });

    it('should bind color picker to color property', () => {
        const color: HTMLInputElement = element.querySelector('#color');

        expect(color.getAttribute('ng-reflect-color-picker')).toEqual(component.color);
    });

    it('should handle form submit with onSumbit', () => {
        component.createNoteForm.controls['title'].setValue('This is a title');
        component.createNoteForm.controls['content'].setValue('This is the content');
        fixture.detectChanges();

        const submit: HTMLButtonElement = element.querySelector('#submit');
        const onSumbitSpy = spyOn(component, 'onSubmit');

        submit.click();

        expect(onSumbitSpy).toHaveBeenCalled();
    });

    it('should disable submit button if form is not valid', () => {
        const submit: HTMLButtonElement = element.querySelector('#submit');

        expect(submit.hasAttribute('disabled')).toBe(true);
    });
});
