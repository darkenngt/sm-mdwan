import { Component, OnInit, AfterViewInit } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { OrderServices } from 'app/services/order.services'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {Router} from '@angular/router';
import * as _ from 'lodash';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

declare var google: any;
@Component({
    selector: 'single-order',
    moduleId: module.id,
    templateUrl: 'single-order.component.html'
})

export class SingleOrderComponent implements OnInit{
    public from = "top"
    public align = "right"
    public geoPosition: any = [];
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.id
    public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    public BikerAvailable = [];
    public bikerSelect:number
    public orderid: number
    public ordersStructureSingle: any = {}
    public geoBiker: any = {}
    dataItem: any[]
    constructor(private geolocation$: GeolocationService, public orderservices: OrderServices, private route: ActivatedRoute, private toastr: ToastrService, private router: Router){
        this.geolocation$.subscribe(position => 
            this.rendermap(position));

            this.geolocation$.subscribe(position => 
                this.geoBiker=position);

            this.route.params.subscribe(params => 
                //console.log(params.idOrder));
            this.getDetailOrder(params.idOrder));   
            
            this.getAvailableBiker(this.storeId)
            this.route.params.subscribe(params => 
                //console.log(params.idOrder));
                this.orderid=params.idOrder);

    }
 


    ngOnInit() {
        
        //this.dataItem = JSON.parse(this.ordersStructureSingle);
        
        /*for (const groupName in groups) {
            console.log(`${groups[groupName].length} elementos tienen el valor ${groupName}`);
          }*/
        //this.rendermap
        //console.log(this.storeId)
       
    }

    getAvailableBiker(storeId){
        this.orderservices.bikerAvailableToOrder(storeId).subscribe((data: any)=>{
            //console.log("motoristas")
            //console.log(data)

            this.BikerAvailable = data.map((biker)=>{
                //console.log("soy biker")
                //console.log(biker)
                //console.log(biker.user.MDW_User_Orders.length)
                return{
                    name:biker.user.first_name+" "+biker.user.last_name,
                    id:biker.user.id,
                    nDelivered:biker.user.MDW_User_Orders.length,
                    countName:biker.user.MDW_User_Orders.length>0?biker.user.first_name+" "+biker.user.last_name+" "+"("+biker.user.MDW_User_Orders.length+")":biker.user.first_name+" "+biker.user.last_name
                }
                
            })
            //console.log(this.BikerAvailable)
        })
        
    }

    getDetailOrder(IdOrder){

        this.orderservices.informationOrder(IdOrder).subscribe((data: any) =>{
            /*console.log("esta es la data completa");
            console.log(data);*/
           let detalle = data.MDW_Order_Details.map((detalle)=>{           
                return{
                    master:detalle.product.name,
                    total:detalle.total,
                    cantidad:detalle.quantity,
                    level:detalle.level,
                    parent:detalle.parent_sku,
                    sku:detalle.sku
                }                
            })
            // Usamos reduce para contar las repeticiones de cada objeto
            let detalleConRepeticiones = detalle.reduce((acumulado, detalle) => {
                if (!acumulado[detalle.sku]) {
                    acumulado[detalle.sku] = { ...detalle, repeticiones: 1 };
                } else {
                    acumulado[detalle.sku].repeticiones++;
                }
                return acumulado;
            }, {});

            // Convertimos el objeto resultado a un array de objetos
            let resultado = Object.values(detalleConRepeticiones);
            /*console.log("detalle unido")
            console.log(resultado)*/

            detalle = []
            data.MDW_Order_Details.forEach(item => {
                if (item.level === 1 && item.quantity !== -1 ){
                    let items = []
                    let itemsG = []
                    data.MDW_Order_Details.forEach(item2 => {
                        //console.log(item2)
                        if (item2.level === 2 && item2.parent_sku === item.sku && item2.parent_id === item.id){
                            let complemento = []
                            data.MDW_Order_Details.forEach(item3 =>{
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
                    console.log(itemsG)
                    detalle.push(
                        {
                            master:item.product.name,
                            total:parseFloat(item.amount).toFixed(2),
                            cantidad:item.quantity,
                            level:item.level,
                            parent:item.parent_sku,
                            sku:item.sku,
                            items: items ,
                            totalprd:(parseFloat(item.quantity)*parseFloat(item.amount)).toFixed(2)  
                        }
                    )
                }
            });

            this.ordersStructureSingle = {
                    estado:data.status===1?"procesada":data.status===2?"asignada":data.status===3?"en ruta":data.status===4?"en el sitio":data.status===6?"emergencia":data.status===7?"emergencia":data.status===8?"emergencia":"entregado",
                    orden:data.origin_store_id,
                    nombre:data.client.name,
                    fecha:data.creation_date.substring(0, 10),
                    direccion:data.client.address,
                    telefono:data.client.phone,
                    telalt:data.client.alternate_phone,
                    correo:data.client.email,
                    tipoPago:data.payment_type ===1?"Efectivo":data.payment_type===13?"Pago con tarjeta":data.payment_type===17?"Visa delivery":"",
                    nomfac:data.client.name,
                    nit:data.nit,
                    direcfact:"ciudad",
                    indicaciones:data.observations,
                    autorizacion:data.payment_authorization,
                    total:parseFloat(data.payment_amount).toFixed(2),
                    cambio:data.payment_change,
                    sendAloha:data.send_aloha,
                    detalle:detalle
            }
            console.log("array para orden")
            console.log(this.ordersStructureSingle.detalle)
        })
    }

    settimer(){
        //location.reload()
        //this.router.navigate(['pedidos']);
    }

    getAssingAloha(){
        let from = "top"
        let align = "right"
        let message = "Motosita asignado"
        
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        let mensaje = "Acción cancelada";
        let opcion = confirm("Deseas asignar o reasignar motorista");
        //console.log(getgeo)
        //console.log(this.bikerSelect, this.orderid)
       
        let jsonBiker = {userId: this.bikerSelect, orderId: this.orderid, "geolocalization": JSON.stringify(getgeo)}
        //console.log(jsonBiker)
        if (opcion === true) {
            this.orderservices.assingBikertoOrder(jsonBiker).subscribe((data: any) =>{
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
                //console.log(data)// cambiar fecha end a fecha ini en el servicio
                setInterval(this.settimer, 1500)
               
             });
        } else {
            this.toastr.warning(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+mensaje+'</span>',
                "",
                {
                  timeOut: 4000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-warning alert-with-icon",
                  positionClass: "toast-" + from + "-" + align
                }
              )
              setInterval(this.settimer, 1500)
        }
        
    }

    rendermap(position){
        //console.log(position.coords.longitude)
        var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          zoom: 18,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });
        

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    }

    sendToAloha(){
        let from = "top"
        let align = "right"
        let message = "Orden enviada"
        let smscancel = "se cancelo el envio"
        let errorsms = "Error comuniquese con un administrador"
        let btnAloha = document.getElementById('idAloha')
        let opcion = confirm("Deseas enviar la orden a Aloha");
        if (opcion === true) {
            this.orderservices.sendAloha(this.orderid).subscribe((data: any)=>{
                //console.log(data)
                btnAloha.setAttribute('disabled', '')
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
                setInterval(this.settimer, 1500)
            },(err)=>{
                console.log("esto es un error")
                console.log("no viene data")
                    this.toastr.error(
                        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+errorsms+'</span>',
                        "",
                        {
                        timeOut: 4500,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-error alert-with-icon",
                        positionClass: "toast-" + this.from + "-" + this.align
                        }
                    )
            }
            )
        }else{
            this.toastr.warning(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+smscancel+'</span>',
                "",
                {
                  timeOut: 4000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-warning alert-with-icon",
                  positionClass: "toast-" + from + "-" + align
                }
              )
              setInterval(this.settimer, 1500)
        }
        
    }

    testToAloha(){
        this.orderservices.testAloha(this.orderid).subscribe((data: any)=>{
            console.log(data)
        })
    }

}