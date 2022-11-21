import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';



@Component({
    selector: 'PedidosMd',
    moduleId: module.id,
    templateUrl: 'pedidos.component.html'
})


export class PedidosComponent implements OnInit, AfterViewInit{
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.id
    public delOrdersStructure: any = [];
    public PickordersStructure: any = [];
    public proOrdersStructure: any = [];
    public emerOrdersStructure: any = [];
    public showDelivery: boolean = true;
    public showPickup: boolean = false;
    public showEmergencia: boolean = false;
    public showProgramada: boolean = false;
    public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    
    constructor(public orderservices: OrderServices, private geolocation$: GeolocationService ){
        
    }
    
    
    async delay(delay: number) {
        return new Promise(r => {
            setTimeout(r, delay);
        })
    }

    ngOnInit(){
        console.log("pag pedi")
        console.log(this.userType)
        //this.initComponent()
        //setTimeout(function(){
            this.getPosition();
            this.initComponent()
            
                 // },10000);
    }

    initComponent(){
        this.delOrdersStructure = [];
        this.PickordersStructure = [];
        this.proOrdersStructure = [];
        this.emerOrdersStructure = []
       
        this.getDelivery()
        
        
    // crea un nuevo objeto `Date`
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
        this.showProgramada = false
        let typeorder = 1
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
            let filtDelevy = []
            console.log(data)
            data.forEach(order => {
                return {
                    tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                    estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                    nombre:order.client.name,
                    fecha:order.creation_date.substring(0, 10),
                    tipoPago:order.payment_type===1?"efectivo":order.payment_type===2?"Visa delivery":"Cybersource",
                    total:order.payment_amount,
                    numeroPedido:order.origin_store_id,
                    idOrder:order.id
                }
            });
            this.delOrdersStructure = filtDelevy
            console.log(this.delOrdersStructure)
        });
    }

    getPickup(){
        this.showDelivery = false
        this.showPickup = true;
        this.showEmergencia = false;
        this.showProgramada = false
        let typeorder = 2
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
            let filtPickup = []
            console.log(data)
            data.forEach(order => {
                if (order.status !== 0 && order.status !== 5) {
                    filtPickup.push(
                        {
                            tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                            estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                            nombre:order.client.name,
                            fecha:order.creation_date.substring(0, 10),
                            tipoPago:order.payment_type===1?"efectivo":order.payment_type===2?"Visa delivery":"Cybersource",
                            total:order.payment_amount,
                            numeroPedido:order.origin_store_id,
                            idOrder:order.id
                        }
                    )
                    
                }
            });
            this.PickordersStructure = filtPickup
        });
        
        console.log(this.showPickup);
    }
    getEmergencia(){
        this.showDelivery = false
        this.showPickup = false;
        this.showProgramada = false
        this.showEmergencia = true;
        let typeorder = 4
        
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
            console.log(data)
            let filterEmerOrdersStructure = []
            data.forEach(order => {
                if (order.status !== 0 && order.status !== 5) {
                    filterEmerOrdersStructure.push(
                        {
                            tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                            estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                            nameEstado:order.status===6?"pinzachazo":order.status===7?"sin gas":order.status===8?"robo":order.status===9?"accidente":"",
                            nombre:order.client.name,
                            fecha:order.creation_date.substring(0, 10),
                            tipoPago:order.payment_type===1?"efectivo":order.payment_type===2?"Visa delivery":"Cybersource",
                            total:order.payment_amount,
                            numeroPedido:order.origin_store_id,
                            idOrder:order.id
                        }
                    )
                    
                }
            });
            this.emerOrdersStructure = filterEmerOrdersStructure
            console.log(this.emerOrdersStructure);
        });
        
    }

    getprogramadas(){
        this.showProgramada = true
        this.showDelivery = false
        this.showPickup = false;
        this.showEmergencia = false;
        let typeorder = 3
        console.log(this.showProgramada)
        this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
            let filtProga = []
            console.log(data)
            data.forEach(order => {
                return {
                    tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                    estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                    nombre:order.client.name,
                    fecha:order.creation_date.substring(0, 10),
                    tipoPago:order.payment_type===1?"efectivo":order.payment_type===2?"Visa delivery":"Cybersource",
                    total:order.payment_amount,
                    numeroPedido:order.origin_store_id,
                    idOrder:order.id,
                }
                
            });
            this.proOrdersStructure = filtProga
            console.log(this.proOrdersStructure)
          
        });
    }


}