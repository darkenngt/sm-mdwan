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
    selector: 'detail-order',
    moduleId: module.id,
    templateUrl: 'detail-order.component.html'
})

export class DetailOrderComponent implements OnInit{
    public from = "top"
    public align = "right"
    public geoPosition: any = [];
    public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
    public userType = this.userInfo === null?0:this.userInfo.id
    //public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
    public BikerAvailable = [];
    public bikerSelect:number
    public orderid: number
    public ordersStructureSingle: any = {}
    public geoBiker: any = {}
    dataItem: any[]
    public ordenesBiker: any = {}
    constructor(private geolocation$: GeolocationService, public orderservices: OrderServices, private route: ActivatedRoute, private toastr: ToastrService, private router: Router){
        this.geolocation$.subscribe(position => 
            this.rendermap(position));

            this.geolocation$.subscribe(position => 
                this.geoBiker=position);

            this.route.params.subscribe(params => 
                //console.log(params.idOrder));
            this.getDetailOrder(params.idOrder));   
            
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
        //console.log(this.userInfo.id)
       
    }


    getDetailOrder(IdOrder){

        this.orderservices.informationOrder(IdOrder).subscribe((data: any) =>{
            console.log("esta es la data completa");
            console.log(data);
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
                    estado:data.status===1?"procesada":data.status===2?"asignada":data.status===3?"en ruta":data.status===4?"en el sitio":data.status===6?"emergencia":data.status===7?"emergencia":data.status===8?"emergencia":"entregado",
                    orden:data.origin_store_id,
                    nombre:data.client.name,
                    fecha:data.creation_date.substring(0, 10),
                    direccion:data.client.address,
                    telefono:data.client.phone,
                    telalt:data.client.alternate_phone,
                    correo:data.client.email,
                    tipoPago:data.payment_type===1?"efectivo":data.payment_type===13?"Cybersource":data.payment_type===17?"Visa delivery":data.payment_type===18?"Whatsapp":"",
                    //tipoPago:data.payment_type ===1?"Efectivo":data.payment_type===13?"Pago con tarjeta":data.payment_type===17?"Visa delivery":"",
                    nomfac:data.client.name,
                    nit:data.client.nit,
                    direcfact:"ciudad",
                    indicaciones:data.observations,
                    autorizacion:data.payment_authorization,
                    total:parseFloat(data.payment_amount).toFixed(2),
                    cambio:data.payment_change,
                    sendAloha:data.send_aloha,
                    cpn_call_description:data.desc_cpn_callcenter === "" || data.desc_cpn_callcenter === null?"sin cupón call center":data.desc_cpn_callcenter,
                    cpn_call_amount:data.amount_cpn_callcenter == null || data.amount_cpn_callcenter == ""?"":parseFloat(data.amount_cpn_callcenter).toFixed(2),
                    cpn_amount:data.amount_cpn == null || data.amount_cpn == ""?"":parseFloat(data.amount_cpn).toFixed(2),
                    cpn_cupon:data.cupon === "" || data.cupon === null?"sin cupón":data.cupon,
                    cpn_sms:data.sms_cpn,
                    cpn_description:data.descrip_cpn,
                    //userbiker:data.MDW_User_Orders[0].user.first_name+" "+data.MDW_User_Orders[0].user.last_name,
                    detalle:detalle
            }
            //console.log("array para orden")
            //console.log(this.ordersStructureSingle)
        })
    }

    settimer(){
        //location.reload()
        //this.router.navigate(['pedidos']);
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

    

    DeleteOrder(){
        console.log("ufff")
        let geolat = this.geoBiker.coords.latitude
        let geolong = this.geoBiker.coords.longitude
        let getgeo = `{lat: ${geolat}, long: ${geolong}}`
        //console.log(getgeo)
        let jsonBiker = {orderId: this.orderid, "geolocalization": getgeo}
        //let jsonBiker = {userId:this.userInfo.id, storeId:this.storeId, getgeo}
        console.log(jsonBiker)
        this.orderservices.removeOrder(this.orderid).subscribe((data: any) =>{
            console.log(data)// cambiar fecha end a fecha ini en el servicio
                let message = "Ordenes Eliminada"
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
                  this.router.navigate(['OrderLIst'])

           
         });

    }

}