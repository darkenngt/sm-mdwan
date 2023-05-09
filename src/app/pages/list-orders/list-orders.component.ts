import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
//import {GeolocationService} from '@ng-web-apis/geolocation';
import { Subscription, interval, Subject } from 'rxjs';
import * as moment from 'moment';



@Component({
    selector: 'ListOrders',
    moduleId: module.id,
    templateUrl: 'list-orders.component.html'
})


    export class ListOrders implements OnInit, AfterViewInit{
        public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
        public userType = this.userInfo === null?0:this.userInfo.id
        //public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
        public dateStart: string
        public dateEnd: string
        public selected: string
        public ordersViews: any []
        public enterprises: any = []
        public model: any;
        public idTienda: number;
        public allstore: any = [];
        
        constructor(public orderservices: OrderServices){
            
        }
        

    
        ngOnInit(){
            this.ordersViews = []
            this.getallstore()

        }
        
    
        initComponent(){
        }
    
    
        getPosition() {
           /* console.log("Entre a geo")
            this.geolocation$.subscribe(position => 
                console.log(position.coords.latitude+" "+position.coords.longitude))*/
        }
        
        ngAfterViewInit() {
            //this.delay(50000)
            //location.reload()
        }

        getallstore(){
            this.orderservices.getAllStore().subscribe((data: any) =>{
              this.allstore = data.map((stores)=>{
                return{
                  id:stores.id,
                  name:stores.name
                }
              })
            })
          }

        viewData(){
            this.ordersViews = []
            let initDate = moment(this.dateStart).format('YYYY-MM-DD')
            let endDate = moment(this.dateEnd).format('YYYY-MM-DD')
            console.log(initDate+"--"+endDate+"--"+this.selected)
            //console.log(this.storeId)

            this.orderservices.listViiew(this.idTienda,this.selected,initDate,endDate).subscribe((data: any) =>{
                console.log(data)
                data.forEach(complete => {
                    console.log(complete)
                    this.ordersViews.push(
                        {
                            orden:complete.origin_store_id,
                            name:complete.client.name,
                            monto:complete.payment_amount,
                            tipo_pago:complete.payment_type===1?"efectivo":complete.payment_type===13?"Cybersource":complete.payment_type===17?"Visa delivery":complete.payment_type===18?"Whatsapp":"",
                            order_id:complete.id
                        }
                    )
                });
            })
        }
        
        /*getDelivery(){
            this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
                //console.log(data)
                console.log("delivery")
                let filtDelevy = []
                let dataSotD = data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                        let currentDate = new Date(order.creation_date)
                        new Date()
                        filtDelevy.push(
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
                this.delOrdersStructure = filtDelevy.reverse()
                //console.log(filtDelevy)
            });
            //window.onload = this.getEmergencia
        }*/
    
       
    
    
    }
    