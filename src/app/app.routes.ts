import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { isConnectedGuard } from './guards/is-connected.guard';
import { isNotConnectedGuard } from './guards/is-not-connected.guard';
import { catalogResolver } from './resolvers/catalog.resolver';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'catalog',
    // component: CatalogComponent,
    loadComponent: ():any=>import("./components/catalog/catalog.component").then(
      (module)=>{
        return module.CatalogComponent;
      }
    ),
    title: 'Catalog page', 
    resolve: { 
      catalog: catalogResolver 
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart page',
    // canActivate: [isConnectedGuard, isCartNotEmptyGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
    canActivate: [isNotConnectedGuard], 
    canDeactivate: [isConnectedGuard]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'Product'
  },
];

export default routeConfig;
