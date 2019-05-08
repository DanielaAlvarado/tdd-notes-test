import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TruncateModule} from '@yellowspot/ng-truncate';

import { NotesComponent } from './notes.component';
import {UserComponent} from '../user/user.component';
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
});
