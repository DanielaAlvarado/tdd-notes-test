import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';

import { UserComponent } from './user.component';
import {AuthService} from '../core/auth.service';
import {ActivatedRouteStub} from '../testing/activated-route-stub';
import {AuthServiceStub} from '../testing/auth-service-stub';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let element: HTMLElement;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let authService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: ActivatedRouteStub
                },
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
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        authService = TestBed.get(AuthService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // functions
    it('successful logout should redirect to /login', fakeAsync(() => {
        component.logout();
        tick();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should log error to console if logout fails', fakeAsync(() => {
        authService.successful = false;
        const logSpy = spyOn(console, 'log');

        component.logout();
        tick();

        expect(logSpy).toHaveBeenCalledWith('Logout error');
    }));

    it('drawer opens when clicking menu icon', () => {
        component.openDrawer();

        expect(component.drawer.open).toBe(true);
    });

    // binding
    it('should handle menu click with openDrawer', () => {
        const menu: HTMLElement = element.querySelector('#menu');
        const openDrawerSpy = spyOn(component, 'openDrawer');

        menu.click();

        expect(openDrawerSpy).toHaveBeenCalled();
    });

    it('should bind title property to title element', () => {
        component.title = 'Page title';
        fixture.detectChanges();
        const pageTitle: HTMLSpanElement = element.querySelector('#page-title');

        expect(pageTitle.innerHTML).toEqual(component.title);
    });

    it('should bind user image to image element', () => {
        component.user.image = 'https://www.gregorheating.co.uk/wp-content/uploads/2016/06/default-testimonial.png';
        fixture.detectChanges();
        const image: HTMLImageElement = element.querySelector('.user__picture');

        expect(image.getAttribute('src')).toEqual(component.user.image);
    });

    it('should bind user name to name element', () => {
        const name: HTMLHeadingElement = element.querySelector('#name');

        expect(name.innerHTML).toEqual(component.user.name);
    });

    it('should bind user provider property to provider element', () => {
        component.user.provider = 'facebook.com';
        fixture.detectChanges();
        const provider: HTMLHeadingElement = element.querySelector('.mdc-drawer__subtitle');

        expect(provider.innerHTML).toEqual(component.user.provider + ' user');
    });

    it('should handle logout click with logout', () => {
        const logout: HTMLElement = element.querySelector('#logout');
        const logoutSpy = spyOn(component, 'logout');

        logout.click();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
