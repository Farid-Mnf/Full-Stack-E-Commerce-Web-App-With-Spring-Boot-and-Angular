import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        title: "Register"
    },
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    }
];
