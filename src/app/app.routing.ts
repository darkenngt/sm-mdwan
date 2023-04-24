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
import { CoordinadoresComponent } from './pages/coordinadores/coordinadores.component';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { UpdatePasswordComponent } from './pages/updatePasword/updatePassword.component';
import { DetalleEstadosComponent } from './pages/detalle-estados/detalle-estados.component';
import { ListOrders } from './pages/list-orders/list-orders.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';
import { ProgramadaComponent } from './pages/programadas/programadas.component';
import { completedOrders } from './pages/complete-orders/complete-orders.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },/* {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},*/
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
       title:"Detalle de ordenes"
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
    path: 'single-order/:idOrder',
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
    path: 'coordinacion',
    component:CoordinadoresComponent,
    data:{
      title: "Coordinadores"
    }
  },{
    path: 'navsm',
    component:NavSm,
    data:{
      title:"navsm"
    }
  },
  {
    path: 'enterprise',
    component:EnterpriseComponent,
    data:{
      title:"Enterprise"
    }
  },{
    path: 'updatepassword',
    component:UpdatePasswordComponent,
    data:{
      title:"Update Password"
    }
  },{
    path: 'detalleestatus',
    component:DetalleEstadosComponent,
    data:{
      title:"Detalle de pedidos"
    }
  },{
    path: 'ListaOrdenes',
    component:ListOrders,
    data:{
      title:"Detalle de pedidos fechas"
    }
  },{
    path: 'OrderLIst',
    component:OrderlistComponent,
    data:{
      title:"vista pedidos dif"
    }
  },{
    path: 'Programadas',
    component:ProgramadaComponent,
    data:{
      title:"Programadas"
    }
  },{
    path: 'complete',
    component:completedOrders,
    data:{
      title:"completas"
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  },
]
