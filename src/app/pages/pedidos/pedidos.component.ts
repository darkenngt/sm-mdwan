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
        let typeorder = 1
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
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
        console.log(this.showPickup);
    }

    getPickup(){
        this.showDelivery = false
        this.showPickup = true;
        this.showEmergencia = false;
        let typeorder = 2
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
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
        /*this.ordersStructure = [{
            estado:"programado",
            nombre:"Cuchufleto Fregonio",
            fecha:"2022-07-22",
            tipoPago:"efectivo",
            total:100.00,
            numeroPedido:"4444"
        }];*/
        console.log(this.showPickup);
    }
    getEmergencia(){
        this.showDelivery = false
        this.showPickup = false;
        this.showEmergencia = true;
        let typeorder = 3
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
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
        /*this.ordersStructure = [{
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
        }];*/
        console.log(this.showPickup);
    }


}