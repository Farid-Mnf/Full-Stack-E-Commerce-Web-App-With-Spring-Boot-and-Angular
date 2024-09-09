import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        title: "Register"
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'profile',
        component: UserComponent,
        title: 'Account'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
