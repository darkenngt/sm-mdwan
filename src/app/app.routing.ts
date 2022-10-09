import { Routes } from '@angular/router';
import { data } from 'jquery';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginComponent } from './pages/login/login.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { RegisterComponent } from './pages/register/register.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { SingleOrderComponent } from './pages/single-order/single-order.component'
import { BikerComponent } from './pages/biker/biker.component';
import { ItemsModalComponent } from './pages/itemsmodal/itemsmodal.component';
import { StoredAssigmentsComponent } from './pages/storedAssigments/storedAssigments.component';
import { NavSm } from './pages/navsm/navsm.component';

export const AppRoutes: Routes = [
  /*{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*//* {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},+/
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
  },
  {
    path: 'pedidos',
    component:PedidosComponent,
    data:{
       title:"Pedisos Middleware"
    }
  },
  {
    path: 'delivery',
    component:DeliveryComponent,
    data:{
      title:"Pedidos delivery"
    }
  },{
    path: 'single-order',
    component:SingleOrderComponent,
    data:{
      title:"Datos pedido"
    }
  },{
    path: 'biker',
    component:BikerComponent,
    data:{
      title:"Ordenes biker"
    }
  },{
    path: 'itemmodal',
    component:ItemsModalComponent,
    data:{
      title:" items modal"
    }
  },{
    path: 'asignacion',
    component:StoredAssigmentsComponent,
    data:{
      title:" asignacion motoristas"
    }
  },{
    path: 'navsm',
    component:NavSm,
    data:{
      title:"navsm"
    }
  }
]
