import { Component, OnInit, AfterViewInit } from '@angular/core';
//import {GeolocationService} from '@ng-web-apis/geolocation';
import { OrderServices } from 'app/services/order.services'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {Router} from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'call-center',
    moduleId: module.id,
    templateUrl: 'call-center.component.html'
})

export class callCenterComponent implements OnInit{
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.id
    public idTienda: number;
    public allstore: any = [];
    public ordersViews: any []
    public selected: string
    ordenFilter: any = {orden:''}
    
    constructor(public orderservices: OrderServices, private route: ActivatedRoute, private toastr: ToastrService, private router: Router){

    }

    ngOnInit(){
        this.ordersViews = []
        this.getallstore()
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

      getDeliveryDate(delivery_day){
        console.log(delivery_day)
        let deliveryDate = new Date()
        let divDate = delivery_day.split('-')
        console.log(divDate)
        let divYear = divDate[2].split (' ')
        console.log(divYear)
        let divHour = divYear[1].split(':')
        console.log(divHour)
        let deliveryMonth = parseInt(divDate[0]) - 1
        let deliveryDay = parseInt(divDate[1])
        let deliveryYear = parseInt(divYear[0])
        let deliveryHour = parseInt(divHour[0])
        let deliveryMinute = parseInt(divHour[1])=== 1 ? 30: 0
        deliveryDate = new Date(deliveryYear, deliveryMonth, deliveryDay, deliveryHour, deliveryMinute)
        console.log(deliveryDate)
        return deliveryDate
    }

      viewData(){
        let ordersdata = []
        let dateR = new Date()
        let initOrder = moment(dateR).format('YYYY-MM-DD')
        let endDate = moment(dateR).format('YYYY-MM-DD')
        let statusOrder = 5
        //console.log(initDate+"--"+endDate+"--"+this.selected)
        console.log(initOrder)
        console.log(this.idTienda)

        this.orderservices.ordersList(this.idTienda).subscribe((data: any) =>{
            console.log(data)
            data.forEach(complete => {
                console.log(complete)
                ordersdata.push(
                    {
                        orden:complete.origin_store_id,
                        id_orden:complete.id,
                        estado:complete.status===1?"Orden sin asignar":complete.status===2?"asignada":complete.status===3?"en ruta":complete.status===4?"en el sitio":complete.status===6?"emergencia":complete.status===7?"emergencia":complete.status===8?"emergencia":"entregado",
                        deliveryDate:complete.order_type === 3?this.getDeliveryDate(complete.delivery_day):new Date(new Date(complete.creation_date).setHours(new Date(complete.creation_date).getHours() + 6)),
                        name:complete.client.name,
                        monto: parseFloat(complete.payment_amount).toFixed(2),
                        tipoPago:complete.payment_type===1?"efectivo":complete.payment_type===13?"Cybersource":complete.payment_type===17?"Visa delivery":complete.payment_type===18?"Whatsapp":"",
                        order_id:complete.id,
                        order_type:complete.order_type
                    }
                )
            });
            this.ordersViews = ordersdata.reverse()
        })


      
    }
}