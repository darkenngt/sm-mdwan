import { Routes } from '@angular/router';
import { data } from 'jquery';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
 /* {
    path: '**',
    redirectTo: 'dashboard'
  },*/
  {
    path: 'login',
    component:LoginComponent,
    data:{
      title:"Login Usuarios"
    }
  },
  {
    path: 'register',
    component:RegisterComponent,
    data:{
       title:"Registro de usuarios"
    }
  }
]
