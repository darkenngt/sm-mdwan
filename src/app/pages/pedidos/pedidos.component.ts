import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';


@Component({
    selector: 'PedidosMd',
    moduleId: module.id,
    templateUrl: 'pedidos.component.html'
})

export class PedidosComponent implements OnInit, AfterViewInit{
    public ordersStructure: any = [];
    public showDelivery: boolean = true;
    public showPickup: boolean = false;
    public showEmergencia: boolean = false;
    public storeId = 1 // camabiar por tienda session

    constructor(public orderservices: OrderServices, private geolocation$: GeolocationService){
        
    }
    
    
    async delay(delay: number) {
        return new Promise(r => {
            setTimeout(r, delay);
        })
    }

    ngOnInit(){
        //this.initComponent()
        //setTimeout(function(){
            this.getPosition();
            this.initComponent()
                 // },10000);
    }

    initComponent(){
        this.ordersStructure = [];
        this.orderservices.getOrders(this.storeId).subscribe((data: any) =>{
            console.log(data)
            this.ordersStructure = data.map((order)=>{
                return {
                    tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                    estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":"entregado",
                    nombre:order.client.name,
                    fecha:order.creation_date.substring(0, 10),
                    tipoPago:order.payment_type===1?"efectivo":order.payment_type===2?"Visa delivery":"Cybersource",
                    total:order.payment_amount,
                    numeroPedido:order.origin_store_id,
                    idOrder:order.id
                }
            })
          
        });
        this.getDelivery()
    }

    getPosition() {
        console.log("Entre a geo")
        this.geolocation$.subscribe(position => 
            console.log(position.coords.latitude+" "+position.coords.longitude))
    }
    
    ngAfterViewInit() {
        //this.delay(50000)
        //location.reload()
      }
    getDelivery(){
        this.showDelivery = true
        this.showPickup = false;
        this.showEmergencia = false;
        /*this.ordersStructure = [{
            tipo:"delivery",
            estado:"procesada",
            nombre:"Juan Juanero Juarez",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"123"
        },{
            tipo:"delivery",
            estado:"en ruta",
            nombre:"Bety Bertolda Berruga",
            fecha:"2022-07-22",
            tipoPago:"tarjeta",
            total:100.00,
            numeroPedido:"1234"
        },{
            tipo:"delivery",
            estado:"asignada",
            nombre:"Pablo clavo un clavito",
            fecha:"2022-07-22",
            tipoPago:"tarjera yalo",
            total:100.00,
            numeroPedido:"2345"
        },{
            tipo:"delivery",
            estado:"en el sitio",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        },{
            tipo:"pickup",
            estado:"programado",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        },{
            tipo:"delivery",
            estado:"emergencia",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        }];*/
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