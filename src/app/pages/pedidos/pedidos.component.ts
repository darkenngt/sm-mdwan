import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'PedidosMd',
    moduleId: module.id,
    templateUrl: 'pedidos.component.html'
})

export class PedidosComponent implements OnInit{
    public ordersStructure: any = [];
    public showDelivery: boolean = true;
    public showPickup: boolean = false;
    public showEmergencia: boolean = false;
    ngOnInit(){
    }
    getDelivery(){
        this.showDelivery = true
        this.showPickup = false;
        this.showEmergencia = false;
        this.ordersStructure = [{
            estado:"procesada",
            nombre:"Juan Juanero Juarez",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"123"
        },{
            estado:"en ruta",
            nombre:"Bety Bertolda Berruga",
            fecha:"2022-07-22",
            tipoPago:"tarjeta",
            total:100.00,
            numeroPedido:"1234"
        },{
            estado:"asignada",
            nombre:"Pablo clavo un clavito",
            fecha:"2022-07-22",
            tipoPago:"tarjera yalo",
            total:100.00,
            numeroPedido:"2345"
        },{
            estado:"en el sitio",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        },{
            estado:"programado",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        },{
            estado:"emergencia",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        }];
        console.log(this.showPickup);
    }
    getPickup(){
        this.showDelivery = false
        this.showPickup = true;
        this.showEmergencia = false;
        this.ordersStructure = [{
            estado:"programado",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        }];
        console.log(this.showPickup);
    }
    getEmergencia(){
        this.showDelivery = false
        this.showPickup = false;
        this.showEmergencia = true;
        this.ordersStructure = [{
            estado:"emergencia",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        },{
            estado:"emergencia",
            nombre:"Petronila Petrona",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        },{
            estado:"emergencia",
            nombre:"yyyy Petrona",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        }];
        console.log(this.showPickup);
    }


}