import { Component, OnInit } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {Router} from '@angular/router';

@Component({
    selector: 'detalle-status',
    moduleId: module.id,
    templateUrl: 'detalle-estados.component.html'
})

export class DetalleEstadosComponent implements OnInit{
    public BikerAvailable = [];
    public model: any;
    public idTienda: number;
    public allstore: any = [];
    public fecht_Act = new Date()
    public dia_Act = this.fecht_Act.getDate()
    public mes_Act: any  = this.fecht_Act.getMonth()
    public anio_Act = this.fecht_Act.getFullYear()
    
    constructor(public orderservices: OrderServices ){
        this.initComponent()
        
    }

    initComponent(){
        this.allstore = []
        this.getallstore()
    }

    ngOnInit(){
        console.log( this.fecht_Act );
        console.log( this.anio_Act+"."+this.mes_Act+"."+this.dia_Act+" "+ "00"+":"+"00"+":"+"01" );
        console.log( Math.floor(new Date(this.anio_Act+"."+this.mes_Act+"."+this.dia_Act+" "+ "00"+":"+"00"+":"+"01").getTime() / 1000) );
        console.log( this.anio_Act+"."+this.mes_Act+"."+this.dia_Act+" "+ "23"+":"+"59"+":"+"59" );
        console.log( Math.floor(new Date(this.anio_Act+"."+this.mes_Act+"."+this.dia_Act+" "+ "23"+":"+"59"+":"+"59").getTime() / 1000) );

    }

    

    allOrdersStarus(){
        this.orderservices.getAllOrdersStatus().subscribe((data: any) =>{
        });
    }

    getallstore(){
        this.orderservices.getAllStore().subscribe((data: any) =>{
            console.log(data)
          this.allstore = data.map((stores)=>{
            return{
              id:stores.id,
              name:stores.name
            }
          })
        })
    }

    getAvailableBiker(){
        console.log(this.idTienda)
        this.orderservices.bikerAvailableToOrder(this.idTienda).subscribe((data: any)=>{
            console.log("motoristas")
            //console.log(data)
            /*let detalle = data.user.MDW_User_Orders.map((detalle)=>{           
                return{
                    orderId:detalle.id,
                    dateEnd:detalle.initial_date,
                    status:detalle.status,
                    dataEnd:detalle.end_date,
                    parent:detalle.parent_sku,
                    sku:detalle.sku
                }                
            })


            detalle = []*/
            this.BikerAvailable = data.map((biker)=>{
                //console.log(biker)
                console.log(biker.user.MDW_User_Orders)
                return{
                    name:biker.user.first_name+" "+biker.user.last_name,
                    id:biker.user.id,
                    nDelivered:biker.user.MDW_User_Orders.length,
                    countName:biker.user.MDW_User_Orders.length>0?biker.user.first_name+" "+biker.user.last_name+" "+"("+biker.user.MDW_User_Orders.length+")":biker.user.first_name+" "+biker.user.last_name,
                    orders:biker.user.MDW_User_Orders,

                }
                
            })
            console.log(this.BikerAvailable)
        })
    }

}