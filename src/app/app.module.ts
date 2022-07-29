import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

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

import { FormsModule } from '@angular/forms';
import { DeliveryComponent } from "./pages/delivery/delivery.component";
import { SingleOrderComponent } from "./pages/single-order/single-order.component";
import { BikerComponent  } from "./pages/biker/biker.component";
import { ItemsModalComponent } from "./pages/itemsmodal/itemsmodal.component";

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
    ItemsModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
