import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth.guard';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NotesComponent} from './notes/notes.component';
import {UserResolver} from './user/user.resolver';
import {CreateNoteComponent} from './create-note/create-note.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
