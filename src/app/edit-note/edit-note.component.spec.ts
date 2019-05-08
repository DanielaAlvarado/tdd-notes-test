import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';

import { EditNoteComponent } from './edit-note.component';
import {UserComponent} from '../user/user.component';
import {FirebaseService} from '../firebase.service';
import {FirebaseServiceStub} from '../testing/firebase-service-stub';
import {AuthService} from '../core/auth.service';
import {AuthServiceStub} from '../testing/auth-service-stub';
import {ActivatedRouteStub} from '../testing/activated-route-stub';

describe('EditNoteComponent', () => {
    let component: EditNoteComponent;
    let fixture: ComponentFixture<EditNoteComponent>;
    let element: HTMLElement;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EditNoteComponent,
                UserComponent
            ],
            imports: [
                ReactiveFormsModule,
                ColorPickerModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: FirebaseServiceStub
                },
                {
                    provide: AuthService,
                    useValue: AuthServiceStub
                },
                {
                    provide: ActivatedRoute,
                    useValue: ActivatedRouteStub
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
        fixture = TestBed.createComponent(EditNoteComponent);
        component = fixture.componentInstance;
        element =  fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // functions
    it('should navigate to /note/:id after note is updated', fakeAsync(() => {
        component.editNoteForm.controls['title'].setValue('This is another title');
        component.editNoteForm.controls['content'].setValue('This is another content');

        component.onSubmit(component.editNoteForm.value);
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/note/' + component.item.id]);
    }));

    it('should log error to console if note update fails', fakeAsync(() => {
        component.editNoteForm.controls['title'].setValue('This is another title');
        component.editNoteForm.controls['content'].setValue('This is another content');
        component.item.id = '2';
        const logSpy = spyOn(console, 'log');

        component.onSubmit(component.editNoteForm.value);
        tick();

        expect(logSpy).toHaveBeenCalledWith('Error while updating note');
    }));

    //form
    it('form should be invalid when title is empty', () => {
        component.editNoteForm.controls['title'].setValue('');
        let errors = component.editNoteForm.controls['title'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    it('form should be invalid when content is empty', () => {
        component.editNoteForm.controls['content'].setValue('');
        let errors = component.editNoteForm.controls['content'].errors || {};

        expect(errors['required']).toBeTruthy();
    });

    // binding
    it('should pass page title to user component', () => {
        const pageTitle: HTMLSpanElement = element.querySelector('#page-title');

        expect(pageTitle.innerHTML).toEqual('Edit note');
    });

    it('should bind inputs to form', () => {
        const title: HTMLInputElement = element.querySelector('#title');
        const content: HTMLInputElement = element.querySelector('#content');

        title.value = 'This is a title';
        content.value = 'This is the content';

        title.dispatchEvent(new Event('input'));
        content.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(title.value).toEqual(component.editNoteForm.value.title);
        expect(content.value).toEqual(component.editNoteForm.value.content);
    });

    it('should bind color picker to color property', () => {
        const color: HTMLInputElement = element.querySelector('#color');

        expect(color.getAttribute('ng-reflect-color-picker')).toEqual(component.color);
    });

    it('should bind back button route with note id', () => {
        const back: HTMLButtonElement = element.querySelector('#back');

        expect(back.getAttribute('ng-reflect-router-link')).toEqual('/note/' + component.item.id);
    });

    it('should handle form submit with onSumbit', () => {
        component.editNoteForm.controls['title'].setValue('This is a title');
        component.editNoteForm.controls['content'].setValue('This is the content');
        fixture.detectChanges();

        const submit: HTMLButtonElement = element.querySelector('#submit');
        const onSumbitSpy = spyOn(component, 'onSubmit');

        submit.click();

        expect(onSumbitSpy).toHaveBeenCalled();
    });

    it('should disable submit button if form is not valid', () => {
        component.editNoteForm.controls['title'].setValue('');
        fixture.detectChanges();

        const submit: HTMLButtonElement = element.querySelector('#submit');

        expect(submit.hasAttribute('disabled')).toBe(true);
    });
});
