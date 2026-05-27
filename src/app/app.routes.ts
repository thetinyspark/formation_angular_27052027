import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';

const routeConfig: Routes = [
  {
    path: '',
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
