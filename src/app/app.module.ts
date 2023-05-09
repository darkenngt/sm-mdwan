import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';

import { PedidosComponent } from './pages/pedidos/pedidos.component';

import { DeliveryComponent } from "./pages/delivery/delivery.component";
import { SingleOrderComponent } from "./pages/single-order/single-order.component";
import { BikerComponent  } from "./pages/biker/biker.component";
import { ItemsModalComponent } from "./pages/itemsmodal/itemsmodal.component";
import { StoredAssigmentsComponent } from "./pages/storedAssigments/storedAssigments.component";
import { NavSm } from "./pages/navsm/navsm.component";
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon'
import { CountdownTimerSm} from './lib/countdown.component'
import { CountDownComponent } from "./pages/count-down/count-down.component";
import { BrowserModule } from '@angular/platform-browser';
import { CoordinadoresComponent } from './pages/coordinadores/coordinadores.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { UpdatePasswordComponent } from './pages/updatePasword/updatePassword.component';
import { DetalleEstadosComponent } from './pages/detalle-estados/detalle-estados.component';
import { ListOrders } from './pages/list-orders/list-orders.component';
import { OrderlistComponent} from './pages/orderlist/orderlist.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ProgramadaComponent } from "./pages/programadas/programadas.component";
import { completedOrders } from "./pages/complete-orders/complete-orders.component";
import { DetailOrderComponent } from "./pages/detail-order/detail-order.component";
import { callCenterComponent } from "./pages/call-center/call-center.component";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    PedidosComponent,
    DeliveryComponent,
    SingleOrderComponent,
    BikerComponent,
    ItemsModalComponent,
    StoredAssigmentsComponent,
    NavSm,
    CountdownTimerSm,
    CountDownComponent,
    CoordinadoresComponent,
    EnterpriseComponent,
    UpdatePasswordComponent,
    DetalleEstadosComponent,
    ListOrders,
    OrderlistComponent,
    ProgramadaComponent,
    completedOrders,
    DetailOrderComponent,
    callCenterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgbModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
