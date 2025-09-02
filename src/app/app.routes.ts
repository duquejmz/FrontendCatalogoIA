import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  // Rutas públicas del catálogo
  {
    path: '',
    loadComponent: () => import('./catalog/pages/home/home.component').then(c => c.HomeComponent),
    data: { title: 'Catálogo IA' }
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'products',
        loadComponent: () => import('./catalog/pages/list/list.component').then(c => c.ListComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./catalog/pages/detail/detail.component').then(c => c.DetailComponent)
      }
    ],
    data: { title: 'Catálogo de Productos' }
  },
  
  // Rutas privadas del admin
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/pages/login/login.component').then(c => c.LoginComponent),
    canActivate: [NoAuthGuard],
    data: { title: 'Iniciar Sesión - Admin' }
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./admin/pages/products/products.component').then(c => c.ProductsComponent)
      },
      {
        path: 'products/new',
        loadComponent: () => import('./admin/pages/product-form/product-form.component').then(c => c.ProductFormComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./admin/pages/product-form/product-form.component').then(c => c.ProductFormComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./admin/pages/categories/categories.component').then(c => c.CategoriesComponent)
      }
    ],
    data: { title: 'Panel de Administración' }
  },
  
  // Ruta por defecto
  { path: '**', redirectTo: '' }
];
