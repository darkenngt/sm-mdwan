import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';
import { Subscription, interval, Subject } from 'rxjs';
import * as moment from 'moment';



@Component({
    selector: 'report',
    moduleId: module.id,
    templateUrl: 'report.component.html'
})


    export class report implements OnInit, AfterViewInit{
        @Input() order: any;
        @Input() store: any;
        public dataStepBiker: any []

        constructor(public orderservices: OrderServices){
        }
        
        initComponent(){
            this.reportBiker()
        }
    
        ngOnInit(){

        }

        ngAfterViewInit() {

        }

        reportBiker(){
            this.orderservices.stepBiker(this.order,this.store).subscribe((data: any) =>{
                console.log("log motorista")
                this.dataStepBiker.push(data)
                console.log(data)

                this.openModal(this.order, this.store);
            })
        }

        openModal(order: any, store: any) {
            const modal = document.getElementById('ReporModal');
            if (modal) {
              modal.style.display = 'block';
            }
        
            // Actualiza los datos del pedido y la tienda en el componente ModalComponent
            this.order = order;
            this.store = store;
            console.log(this.dataStepBiker)
        }
    }
