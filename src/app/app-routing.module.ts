import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth.guard';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NotesComponent} from './notes/notes.component';
import {UserResolver} from './user/user.resolver';
import {CreateNoteComponent} from './create-note/create-note.component';
import {NoteComponent} from './note/note.component';
import {NoteResolver} from './note/note.resolver';
import {EditNoteComponent} from './edit-note/edit-note.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notes',
        component: NotesComponent,
        resolve: {
            data: UserResolver
        }
    },
    {
        path: 'create-note',
        component: CreateNoteComponent,
        resolve: {
            data: UserResolver
        }
    },
    {
        path: 'note/:id',
        component: NoteComponent,
        resolve: {
            data: UserResolver,
            note: NoteResolver
        }
    },
    {
        path: 'edit-note/:id',
        component: EditNoteComponent,
        resolve: {
            data: UserResolver,
            note: NoteResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
