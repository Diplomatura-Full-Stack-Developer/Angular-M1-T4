import { Routes } from '@angular/router';
import { MainLayout } from './shell/main-layout/main-layout';


export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/products/pages/products-list/products-list')
      },
      {
        path: 'add-product',
        loadComponent: () => import('./features/products/pages/add-product-form/add-product-form')
      },
      {
        path: 'register',
        loadComponent: () => import('./features/users/pages/register/register')
      },
    ],
  },
];
