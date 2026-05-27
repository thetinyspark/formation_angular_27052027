import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';

const routeConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    title: 'Catalog page'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart page'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page'
  },
];

export default routeConfig;
