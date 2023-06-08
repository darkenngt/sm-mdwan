import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy  } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';
import { Subscription, interval, Subject } from 'rxjs';
import * as moment from 'moment';
import * as bootstrap from 'bootstrap';
import { DatePipe } from '@angular/common';



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
        public ordersStructureSingle: any = {}
        public model: any;
        public idTienda: number;
        public allstore: any = [];
        public dataStepBiker: any = []
        public tiempoTotal: string
        ordenFilter: any = {orden:''}
        
        constructor(public orderservices: OrderServices, private datePipe: DatePipe){
            
        }
        

    
        ngOnInit(){
            this.ordersStructureSingle = []
            this.ordersViews = []
            this.dataStepBiker = []
            this.tiempoTotal = ''
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
                            order_id:complete.id,
                            store:complete.MDW_Order_Stores[0].store_id
                        }
                    )
                });
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
                        tiempoTotal:this.sumarTiempoTotal()
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
                console.log(this.tiempoTotal)
            })
            
        }
        
        sumarTiempoTotal() {
            let totalSegundos = 0;
        
            for (const registro of this.dataStepBiker) {
              const horaInicio = registro.fecha_inicio.split(' ')[1];
              const horaFin = registro.fecha_fin.split(' ')[1];
              const [hhInicio, mmInicio, ssInicio] = horaInicio.split(':').map(Number);
              const [hhFin, mmFin, ssFin] = horaFin.split(':').map(Number);
        
              const segundosInicio = hhInicio * 3600 + mmInicio * 60 + ssInicio;
              const segundosFin = hhFin * 3600 + mmFin * 60 + ssFin;
        
              totalSegundos += segundosFin - segundosInicio;
              
            }
            
            const segundos = totalSegundos % 60;
            const minutos = Math.floor(totalSegundos / 60) % 60;
            const horas = Math.floor(totalSegundos / 3600);

            const horaTotal = `${this.formatoNumero(horas)}:${this.formatoNumero(minutos)}:${this.formatoNumero(segundos)}`;
            console.log(horaTotal)
            return horaTotal;
          }
        
          formatoNumero(numero: number): string {
            return numero < 10 ? `0${numero}` : `${numero}`;
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
    