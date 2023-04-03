import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';
import { Subscription, interval, Subject } from 'rxjs';



@Component({
    selector: 'Programadas',
    moduleId: module.id,
    templateUrl: 'programadas.component.html'
})


export class ProgramadaComponent implements OnInit, AfterViewInit{
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.id
    public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    public delOrdersStructure: any = [];
    public ordernesProgramadas: any = [];
    /*public PickordersStructure: any = [];
    public proOrdersStructure: any = [];
    public emerOrdersStructure: any = [];
    public showDelivery: boolean = true;
    public showPickup: boolean = false;
    public showEmergencia: boolean = false;
    public showProgramada: boolean = false;
    private subscription: Subscription;
    private firstCall: boolean = false;*/
    
    constructor(public orderservices: OrderServices, private geolocation$: GeolocationService ){
        
    }
    
    
    /*async delay(delay: number) {
        return new Promise(r => {
            setTimeout(r, delay);
        })
    }*/

    ngOnInit(): void{
        interval(10000).subscribe(()=>{
            this.obtenerOrdenes();
        })
         
    }
    

    initComponent(){
        /*this.delOrdersStructure = [];
        this.PickordersStructure = [];
        this.proOrdersStructure = [];
        this.emerOrdersStructure = []
        this.getDelivery()*/
        
        
    // crea un nuevo objeto `Date`
    }

    getPosition() {
        //console.log("Entre a geo")
        /*this.geolocation$.subscribe(position => 
            console.log(position.coords.latitude+" "+position.coords.longitude))*/
    }
    
    ngAfterViewInit() {
        //this.delay(50000)
        //location.reload()
    }
    
    obtenerOrdenes(){
        console.log("entre al observable")
        this.orderservices.getOrders(this.storeId,3).subscribe((data: any) =>{
            console.log("programada")
            let filtDelevyP = []
            //console.log(data.sort((a, b) => a.id < b.id))
            let dataSotD = data.sort((a, b) => a.id - b.id)
            //console.log(data)
            dataSotD.forEach(order => {
                if (order.status !== 0 && order.status !== 5) {
                    //console.log(order.id)
                    let currentDate = new Date(order.creation_date)
                    new Date()
                    filtDelevyP.push(
                        {
                            tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                            estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                            nombre:order.client.name,
                            fecha:order.creation_date.substring(0, 10),
                            tipoPago:order.payment_type===1?"efectivo":order.payment_type===2?"Visa delivery":"Cybersource",
                            total:order.payment_amount,
                            numeroPedido:order.origin_store_id,
                            idOrder:order.id,
                            //deliveryDate: new Date(order.creation_date),
                            deliveryDate: new Date(new Date(order.creation_date).setHours(new Date(order.creation_date).getHours() + 6)),
                            creationDate: order.creation_date
                        }
                    )
                }
                
            });
            this.ordernesProgramadas = filtDelevyP.reverse()
            console.log(filtDelevyP)
        });
        //window.onload = this.getEmergencia
    }


}