import { Component, OnInit, AfterViewInit } from '@angular/core';
//import {GeolocationService} from '@ng-web-apis/geolocation';
import { OrderServices } from 'app/services/order.services'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {Router} from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as bootstrap from 'bootstrap';
import { DatePipe } from '@angular/common';

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
    public ordersStructureSingle: any = {}
    public dataStepBiker: any []
    ordenFilter: any = {orden:''}
    
    constructor(public orderservices: OrderServices, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private datePipe: DatePipe){

    }

    ngOnInit(){
        this.ordersViews = []
        this.ordersStructureSingle = []
        this.dataStepBiker = []
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
                        order_type:complete.order_typel,
                        storeId:complete.MDW_Order_Stores[0].store_id,
                        type_order:complete.order_type === 1?"Delivery":complete.order_type== 2?"Pickup":complete.order_type== 3?"Programada":complete.order_type== 4?"Emergencia":"",
                        store:complete.MDW_Order_Stores[0].store_id
                    }
                )
            });
            this.ordersViews = ordersdata.reverse()
        })


      
    }

    reportBiker(order,store){
      const modal = document.getElementById('ReporModal')
      const modalInstance = new bootstrap.Modal(modal)
      modalInstance.show()
      this.orderservices.stepBiker(order,store).subscribe((data: any) =>{
          console.log("log motorista")
          console.log(data.mdwOrderUsers)
          this.dataStepBiker = data.mdwOrderUsers.map((step)=>{
              return{
                  nombre:step.user.first_name+' '+step.user.last_name,
                  codigo:step.user.code,
                  status:step.status===1?"procesada":step.status===2?"asignada":step.status===3?"en ruta":step.status===4?"en el sitio":step.status===6?"emergencia":step.status===7?"emergencia":step.status===8?"emergencia":"entregado",
                  fecha_inicio: this.datePipe.transform(step.initial_date, 'yyyy-MM-dd HH:mm:ss'),
                  fecha_fin:this.datePipe.transform(step.end_date, 'yyyy-MM-dd HH:mm:ss'),
                  //tiempoTotal:this.sumarTiempoTotal()
              }
              
          })
          console.log("detalle de motorista")
          console.log(this.dataStepBiker)
          let detalle = data.mdwOrder[0].MDW_Order_Details.map((detalle)=>{           
              return{
                  master:detalle.product.name,
                  total:detalle.total,
                  cantidad:detalle.quantity,
                  level:detalle.level,
                  parent:detalle.parent_sku,
                  sku:detalle.sku
              }                
          })

          detalle = []
          data.mdwOrder[0].MDW_Order_Details.forEach(item => {
              if (item.level === 1 && item.quantity !== -1 ){
                  let items = []
                  let itemsG = []
                  data.mdwOrder[0].MDW_Order_Details.forEach(item2 => {
                      //console.log(item2)
                      if (item2.level === 2 && item2.parent_sku === item.sku && item2.parent_id === item.id){
                          let complemento = []
                          data.mdwOrder[0].MDW_Order_Details.forEach(item3 =>{
                              if (item3.level === 3 && item3.parent_sku === item2.sku && item3.parent_id === item2.id){
                                  complemento.push(
                                      {
                                          itemcomp:item3.product.name,
                                          precio:item3.amount===0?"---":item3.amount,
                                          cantidad:item3.quantity,
                                          level:item3.level,
                                          parent:item3.parent_sku,
                                          sku:item3.sku,
                                      }
                                  )        
                              }
                          })
                          items.push(
                              {
                                  producto:item2.product.name,
                                  precio:item2.amount===0?"---":item2.amount,
                                  unidad:item2.quantity,
                                  level:item2.level,
                                  parent:item2.parent_sku,
                                  sku:item2.sku,
                                  complemento: complemento
                              }
                          )
                      }
                  });
                  //console.log(itemsG)
                  detalle.push(
                      {
                          master:item.product.name,
                          total:parseFloat(item.amount).toFixed(2),
                          cantidad:item.quantity,
                          level:item.level,
                          parent:item.parent_sku,
                          sku:item.sku,
                          items: items ,
                          comment: item.comment,
                          totalprd:(parseFloat(item.quantity)*parseFloat(item.amount)).toFixed(2)  
                      }
                  )
              }
          });

          this.ordersStructureSingle = {
                  estado:data.mdwOrder[0].status===1?"procesada":data.mdwOrder[0].status===2?"asignada":data.mdwOrder[0].status===3?"en ruta":data.mdwOrder[0].status===4?"en el sitio":data.mdwOrder[0].status===6?"emergencia":data.mdwOrder[0].status===7?"emergencia":data.mdwOrder[0].status===8?"emergencia":"entregado",
                  orden:data.mdwOrder[0].origin_store_id,
                  nombre:data.mdwOrder[0].client.name,
                  fecha:data.mdwOrder[0].creation_date.substring(0, 10),
                  direccion:data.mdwOrder[0].client.address,
                  telefono:data.mdwOrder[0].client.phone,
                  telalt:data.mdwOrder[0].client.alternate_phone,
                  correo:data.mdwOrder[0].client.email,
                  tipoPago:data.mdwOrder[0].payment_type===1?"efectivo":data.mdwOrder[0].payment_type===13?"Cybersource":data.mdwOrder[0].payment_type===17?"Visa delivery":data.mdwOrder[0].payment_type===18?"Whatsapp":"",
                  //tipoPago:data.payment_type ===1?"Efectivo":data.payment_type===13?"Pago con tarjeta":data.payment_type===17?"Visa delivery":"",
                  nomfac:data.mdwOrder[0].client.name,
                  nit:data.mdwOrder[0].client.nit,
                  direcfact:"ciudad",
                  indicaciones:data.mdwOrder[0].observations,
                  autorizacion:data.mdwOrder[0].payment_authorization,
                  total:parseFloat(data.mdwOrder[0].payment_amount).toFixed(2),
                  cambio:parseFloat(data.mdwOrder[0].payment_change).toFixed(2),
                  sendAloha:data.mdwOrder[0].send_aloha,
                  cpn_call_description:data.mdwOrder[0].desc_cpn_callcenter === "" || data.mdwOrder[0].desc_cpn_callcenter === null?"sin cupón call center":data.mdwOrder[0].desc_cpn_callcenter,
                  cpn_call_amount:data.mdwOrder[0].amount_cpn_callcenter == null || data.mdwOrder[0].amount_cpn_callcenter == ""?"":parseFloat(data.mdwOrder[0].amount_cpn_callcenter).toFixed(2),
                  cpn_amount:data.mdwOrder[0].amount_cpn == null || data.mdwOrder[0].amount_cpn == ""?"":parseFloat(data.mdwOrder[0].amount_cpn).toFixed(2),
                  cpn_cupon:data.mdwOrder[0].cupon === "" || data.mdwOrder[0].cupon === null?"sin cupón":data.mdwOrder[0].cupon,
                  cpn_sms:data.mdwOrder[0].sms_cpn,
                  cpn_description:data.mdwOrder[0].descrip_cpn,
                  //userbiker:data.mdwOrder[0].MDW_User_Orders.length > 0?data.mdwOrder[0].MDW_User_Orders[0].user.first_name+" "+data.mdwOrder[0].MDW_User_Orders[0].user.last_name:"sin motorista asignado",
                  detalle:detalle
          }
          
          console.log(this.ordersStructureSingle)

      })
      
  }
}