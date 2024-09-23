import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';


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
        path: 'listproducts/:parameter',
        component: ProductListComponent,
        title: 'Products'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
