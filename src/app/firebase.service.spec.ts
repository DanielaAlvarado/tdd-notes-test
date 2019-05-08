import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { FirebaseService } from './firebase.service';
import {AngularFirestoreStub} from './testing/angular-firestore-stub';
import {environment} from '../environments/environment';

describe('FirebaseService', () => {
    let service: FirebaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FirebaseService,
                {
                    provide: AngularFirestore,
                    useValue: AngularFirestoreStub
                }
            ]
        })

        service = TestBed.get(FirebaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('createNote should return a promise', fakeAsync(() => {
        expect(typeof service.createNote({
            title: 'This is a title',
            content: 'This is the content'
        }, '#F3778F').then).toBe('function');
    }));

    it('getNotes should return an observable of an array of notes', fakeAsync(() => {
        let notes;

        service.getNotes().subscribe((result) =>{
            notes = result;
        });
        tick();

        expect(notes.length).toBe(1);
        expect(Object.keys(notes[0].payload.doc.data())).toContain('title');
    }));

    it('getNote should return an observable of a note', fakeAsync(() => {
        let note;

        service.getNote('1').subscribe((result) => {
            note = result.payload.data();
        });
        tick();

        expect(Object.keys(note)).toContain('title');
    }));

    it('updateNote should return a promise', fakeAsync(() => {
        expect(typeof service.updateNote('1', {
            title: 'This is another title',
            content: 'This is another content'
        }).then).toBe('function');
    }));

    it('deleteNote should return a promise', fakeAsync(() => {
        expect(typeof service.deleteNote('1').then).toBe('function');
    }));
});
