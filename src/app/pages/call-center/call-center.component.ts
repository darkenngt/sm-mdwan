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

      viewData(){
        this.ordersViews = []
        let dateR = new Date()
        let initOrder = moment(dateR).format('YYYY-MM-DD')
        let endDate = moment(dateR).format('YYYY-MM-DD')
        let statusOrder = 5
        //console.log(initDate+"--"+endDate+"--"+this.selected)
        console.log(initOrder)
        console.log(this.idTienda)

        this.orderservices.getDetalleListaReport(this.idTienda,initOrder).subscribe((data: any) =>{
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
}