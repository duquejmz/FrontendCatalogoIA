import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/:id', component: ProductFormComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
    // AuthGuard se agregará aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
