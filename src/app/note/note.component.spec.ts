import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {RouterTestingModule} from  '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';

import { NoteComponent } from './note.component';
import {UserComponent} from '../user/user.component';
import {FirebaseService} from '../firebase.service';
import {FirebaseServiceStub} from '../testing/firebase-service-stub';
import {AuthService} from '../core/auth.service';
import {AuthServiceStub} from '../testing/auth-service-stub';
import {ActivatedRouteStub} from '../testing/activated-route-stub';
import {hexToRgb} from '../testing/hex-to-rgb';

describe('NoteComponent', () => {
    let component: NoteComponent;
    let fixture: ComponentFixture<NoteComponent>;
    let element: HTMLElement;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NoteComponent,
                UserComponent
            ],
            imports: [
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
        fixture = TestBed.createComponent(NoteComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // functions
    it('should navigate to /notes after a note is deleted', fakeAsync(() => {
        component.delete();
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    }));

    it('should log error to console if note deletion fails', fakeAsync(() => {
        component.item.id = '2';
        const logSpy = spyOn(console, 'log');

        component.delete();
        tick();

        expect(logSpy).toHaveBeenCalledWith('Error while deleting note');
    }));

    // binding
    it('should pass page title to user component', () => {
        const pageTitle: HTMLSpanElement = element.querySelector('#page-title');

        expect(pageTitle.innerHTML).toEqual('Read note');
    });

    it('should set card background color to note color', () => {
        const card: HTMLDivElement = element.querySelector('#card');

        expect(card.style['background-color']).toEqual(hexToRgb(component.item.color));
    });

    it('should bind note title to title element', () => {
        const title: HTMLHeadingElement = element.querySelector('#title');

        expect(title.innerHTML).toEqual(component.item.title);
    });

    it('should bind note content to content element', () => {
        const content: HTMLParagraphElement  = element.querySelector('#content');

        expect(content.innerHTML).toEqual(component.item.content);
    });

    it('should bind edit button route with note id', () => {
        const edit: HTMLButtonElement = element.querySelector('#edit');

        expect(edit.getAttribute('ng-reflect-router-link')).toEqual('/edit-note/' + component.item.id);
    });

    it('should handle note deletion with delete', () => {
        const deleteButton: HTMLButtonElement = element.querySelector('#delete');
        const deleteSpy = spyOn(component, 'delete');

        deleteButton.click();

        expect(deleteSpy).toHaveBeenCalled();
    });
});
