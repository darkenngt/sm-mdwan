import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';
import { Subscription, interval, Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'completedOrders',
    moduleId: module.id,
    templateUrl: 'complete-orders.component.html'
})

export class completedOrders implements OnInit, AfterViewInit{
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.id
    public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    public ordenComplete : any = []
    
    constructor(public orderservices: OrderServices, private geolocation$: GeolocationService ){
        
    }

    ngOnInit(){
        this.orderComplete()
    }
    

    initComponent(){
        
    }

    ngAfterViewInit() {

    }

    orderComplete(){
        this.orderservices.ListComplete(this.storeId).subscribe((data: any)=>{
            console.log(data)
            data.forEach(complete => {
                this.ordenComplete.push(
                    {
                        orden:complete.origin_store_id,
                        name:complete.client.name,
                        monto:complete.payment_amount,
                        tipo_pago:complete.payment_authorization,
                        order_id:complete.id
                    }
                )
            });
        })
    }

}