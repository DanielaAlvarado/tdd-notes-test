import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TruncateModule} from '@yellowspot/ng-truncate';

import { NotesComponent } from './notes.component';
import {UserComponent} from '../user/user.component';
import {FirebaseService} from '../firebase.service';
import {FirebaseServiceStub} from '../testing/firebase-service-stub';
import {AuthService} from '../core/auth.service';
import {AuthServiceStub} from '../testing/auth-service-stub';
import {hexToRgb} from '../testing/hex-to-rgb';

describe('NotesComponent', () => {
    let component: NotesComponent;
    let fixture: ComponentFixture<NotesComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NotesComponent,
                UserComponent
            ],
            imports: [
                RouterTestingModule,
                TruncateModule
            ],
            providers: [
                {
                    provide: FirebaseService,
                    useValue: FirebaseServiceStub
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
        fixture = TestBed.createComponent(NotesComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // binding
    it('should pass page title to user component', () => {
        const pageTitle: HTMLSpanElement = element.querySelector('#page-title');

        expect(pageTitle.innerHTML).toEqual('Notes');
    });

    it('should bind element route with note id', () => {
        const notes: NodeListOf<HTMLLIElement> = element.querySelectorAll('.notes__note');

        notes.forEach((note, index) => {
            expect(note.getAttribute('ng-reflect-router-link')).toEqual('/note/' + component.items[index].payload.doc.id);
        });
    });

    it('should set element background color to note color', () => {
        const notes: NodeListOf<HTMLLIElement> = element.querySelectorAll('.notes__note');

        notes.forEach((note, index) => {
            expect(note.style['background-color']).toEqual(hexToRgb(component.items[index].payload.doc.data().color));
        });
    });

    it('should bind note title to title element', () => {
        const titles: NodeListOf<HTMLHeadingElement> = element.querySelectorAll('.mdc-typography--headline6');

        titles.forEach((title, index) => {
            expect(title.innerHTML).toEqual(component.items[index].payload.doc.data().title);
        });
    });

    it('should bind note content to content element', () => {
        const contents: NodeListOf<HTMLParagraphElement> = element.querySelectorAll('.mdc-typography--body2');

        contents.forEach((content, index) => {
            expect(content.innerHTML).toEqual(component.items[index].payload.doc.data().content);
        });
    });
});
