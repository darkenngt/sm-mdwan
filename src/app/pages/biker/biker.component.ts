import { Component, OnInit } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { compileComponentFromMetadata } from '@angular/compiler';

@Component({
    selector: 'biker',
    moduleId: module.id,
    templateUrl: 'biker.component.html'
})

export class BikerComponent implements OnInit{
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    public geoBiker: any = {}
    public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    public userId = this.userInfo === null?0:this.userInfo.id
    public orderid = 1
    public ordersStructureBiker: any = [];
    public mEnRuta: boolean = true;
    public estadoBotones: any = [];
    public mEnSitio: boolean = false
    public mEntregado: boolean = false;
    public vistaPedido: boolean = true;
    public orderemergency: any = [];
    public from = "top"
    public align = "right"
    public warningSms = "no pudo realizar la acción"
    
    constructor(private geolocation$: GeolocationService, public orderservices: OrderServices, private route: ActivatedRoute, private toastr: ToastrService){
        this.geolocation$.subscribe(position => 
            this.geoBiker = position);

            
        /*this.route.params.subscribe(params => 
                this.orderid=params.idOrder);  */  

        /*this.ordersStructureBiker.forEach(order => {
            this.estadoBotones.push({
                mEnRuta:true,
                mEnSitio:false,
                mEntregado:false,
                vistaPedido:true
            })
        });*/
        
        //console.log(this.ordersStructureBiker);
    }
    initComponent(){
        this.ordersStructureBiker = []
        this.getOrdersBiker()
        console.log(this.ordersStructureBiker)
        
    }
    ngOnInit(){
        this.initComponent()
    }
    getOrdersBiker(){
        this.orderservices.orderByBiker(this.storeId,this.userId).subscribe((dataOrder: any) =>{
            console.log("hola data de biker")
            console.log(dataOrder)
            this.ordersStructureBiker = dataOrder.map((orderbiker=>{
                let detalle = []
                orderbiker.order.MDW_Order_Details.forEach(detail => {
                    
                    if(detail.level === 1 && detail.quantity !== -1 ){
                        let items = []
                        orderbiker.order.MDW_Order_Details.forEach(item => {
                            if (item.level === 2 && item.parent_sku === detail.sku && item.parent_id === detail.id){
                                let complemento = []
                                orderbiker.order.MDW_Order_Details.forEach(item2 => {
                                    if (item2.level === 3 && item2.parent_sku === item.sku && item2.parent_id === item.id) {
                                        complemento.push({
                                            itemcomp:item2.product.name,
                                            cantidad:item2.quantity,
                                            precio:parseInt(item2.amount).toFixed(2)
                                        })
                                    }
                                });
                                items.push({
                                    producto:item.product.name,
                                    unidad:item.quantity,
                                    precio:parseInt(item.amount).toFixed(2),
                                    complemento:complemento
                                })
                            }
                        });
                        detalle.push({
                            master:detail.product.name,
                            total:parseInt(detail.amount).toFixed(2),
                            cantidad:detail.quantity,
                            items:items
                        })
                    }
                    
                });
                return{
                    id:orderbiker.order_id,
                    estado:orderbiker.status,
                    orden:orderbiker.order.origin_store_id,
                    nombre:orderbiker.order.client.name,
                    fecha:orderbiker.order.creation_date.substring(0, 10),
                    direccion:orderbiker.order.client.address,
                    telefono:orderbiker.order.client.phone,
                    alt_tel: orderbiker.order.client.alternate_phone,
                    tipoPago:orderbiker.order.payment_authorization,
                    total:parseInt(orderbiker.order.payment_amount).toFixed(2),
                    cambio:orderbiker.order.payment_change,
                    detalle:detalle,
                }
            }))
            this.ordersStructureBiker = this.ordersStructureBiker.map( (orderstatus, index) =>{
                orderstatus.mEnRuta = orderstatus.estado === 2;
                orderstatus.mEnSitio = orderstatus.estado === 3;
                orderstatus.mEntregado = orderstatus.estado === 4;
                orderstatus.vistaPedido = true;
                orderstatus.indice = index;
                return orderstatus;
            })
            console.log(this.ordersStructureBiker)
            
        });
        
    }
    
    showRuta(idOrder, indice){
        let from = "top"
        let align = "right"
        let message = "Pedido en ruta"
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        //console.log(idOrder)
       console.log("btn en ruta")
        let jsonBiker = {orderId: 678, "geolocalization": getgeo}
        //console.log(jsonBiker)
        this.orderservices.crtInroute(jsonBiker).subscribe((data: any) =>{
            console.log("entra al subscribe")
            console.log(data)
            if (typeof data == 'object' && Object.keys(data).length === 0) {
                this.toastr.warning(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-succes alert-with-icon",
                      positionClass: "toast-" + from + "-" + align
                    }
                  )
                console.log(data)// cambiar fecha end a fecha ini en el servicio
                console.log(jsonBiker)
                console.log(indice);
                console.log(this.ordersStructureBiker[indice]);
                console.log(this.ordersStructureBiker);
                this.ordersStructureBiker[indice].mEnRuta = false;
                this.ordersStructureBiker[indice].mEnSitio = true;
                this.ordersStructureBiker[indice].mEntregado = false;
            }else{
                console.log("entre al else")
                this.toastr.warning(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+this.warningSms+'</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-warninf alert-with-icon",
                      positionClass: "toast-" + from + "-" + align
                    }
                  )
            }
            
           
         });
        
      
    }
    showSitio(idOrder, indice){
        let from = "top"
        let align = "right"
        let message = "Motosita asignado"
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        console.log(getgeo)
       
        let jsonBiker = {order_id: idOrder, "geolocalization": JSON.stringify(getgeo)}
        this.orderservices.crtInsite(jsonBiker).subscribe((data: any) =>{
            this.toastr.info(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                "",
                {
                  timeOut: 4000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-success alert-with-icon",
                  positionClass: "toast-" + from + "-" + align
                }
              )
            console.log(data)// cambiar fecha end a fecha ini en el servicio
           
         });
        console.log(jsonBiker)
        this.ordersStructureBiker[indice].mEnRuta = false;
        this.ordersStructureBiker[indice].mEnSitio = false;
        this.ordersStructureBiker[indice].mEntregado = true;

    }
    showEntrega(idOrder, indice){
        let from = "top"
        let align = "right"
        let message = "Motosita asignado"
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        console.log(getgeo)
       
        let jsonBiker = {orderId: idOrder, "geolocalization": getgeo}
        this.orderservices.crtInDelivered(jsonBiker).subscribe((data: any) =>{
            this.toastr.success(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                "",
                {
                  timeOut: 4000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-success alert-with-icon",
                  positionClass: "toast-" + from + "-" + align
                }
              )
              this.ordersStructureBiker[indice].vistaPedido = false;
            console.log(data)// cambiar fecha end a fecha ini en el servicio
           
         });
        console.log(jsonBiker)
        this.ordersStructureBiker[indice].mEnRuta = false;
        this.ordersStructureBiker[indice].mEnSitio = false;
        this.ordersStructureBiker[indice].mEntregado = false;

    }
    showPedido(showOrder, indice){
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = {'lat': geolat, 'long': geolong}
        let json =
        {
            "orderId": this.orderid,
            "geolocalization": getgeo
        }
        this.ordersStructureBiker[indice].vistaPedido = false;
        console.log("se cierra pedido");
        console.log(showOrder);
    }


    emergency(){
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = {'lat': geolat, 'long': geolong}
        let json =
        {
            "orderId": this.orderid,
            "geolocalization": getgeo
        }
       this.ordersStructureBiker.map( (order, index) =>{
            this.orderemergency.push(order.orden);
            //return order;
        })
        //console.log(this.orderemergency);
    }

    prick(){
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        //console.log(getgeo)
       
        let jsonBiker = {userId:this.userId, storeId:this.storeId, getgeo}
        this.orderservices.crtInRide(jsonBiker).subscribe((data: any) =>{
            console.log(data)// cambiar fecha end a fecha ini en el servicio
            if (typeof data == 'object' && Object.keys(data).length === 0) {
                console.log("no se hace nada")
                let message = "No hay ordenes para emergencia"
                this.toastr.info(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-info alert-with-icon",
                      positionClass: "toast-" + this.from + "-" + this.align
                    }
                  )
            }else{
                let message = "Ordenes en Emergecia"
                this.toastr.warning(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-warning alert-with-icon",
                      positionClass: "toast-" + this.from + "-" + this.align
                    }
                  )
                console.log("se refresca")
                this.getOrdersBiker()
            }
           
         });
        console.log("pinche")
    }

    singas(){
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        //console.log(getgeo)
       
        let jsonBiker = {userId:this.userId, storeId:this.storeId, getgeo}
        this.orderservices.crtGas(jsonBiker).subscribe((data: any) =>{
            console.log(data)// cambiar fecha end a fecha ini en el servicio
            if (typeof data == 'object' && Object.keys(data).length === 0) {
                console.log("no se hace nada")
                let message = "No hay ordenes para emergencia"
                this.toastr.info(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-info alert-with-icon",
                      positionClass: "toast-" + this.from + "-" + this.align
                    }
                  )
            }else{
                let message = "Ordenes en Emergecia"
                this.toastr.warning(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-warning alert-with-icon",
                      positionClass: "toast-" + this.from + "-" + this.align
                    }
                  )
                console.log("se refresca")
                this.getOrdersBiker()
            }
           
         });
        console.log("pinche")
    }


  
}
