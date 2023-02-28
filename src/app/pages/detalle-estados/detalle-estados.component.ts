import { Component, OnInit } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {Router} from '@angular/router';

@Component({
    selector: 'detalle-status',
    moduleId: module.id,
    templateUrl: 'detalle-estados.component.html'
})

export class DetalleEstadosComponent implements OnInit{
   public dtOptions: any = {};


    public OrderAvailable = [];
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


    ngOnInit(): void {
        this.dtOptions = {
          // Declare the use of the extension in the dom parameter
          dom: 'Bfrtip',
          // Configure the buttons
          buttons: [
            'columnsToggle',
            'colvis',
            'copy',
            'print',
            'excel',
            {
              text: 'Some button',
              key: '1',
              action: function (e, dt, node, config) {
                alert('Button activated');
              }
            }
          ]
        };
      }
    

    getallstore(){
        this.orderservices.getAllStore().subscribe((data: any) =>{
            //console.log(data)
          this.allstore = data.map((stores)=>{
            return{
              id:stores.id,
              name:stores.name
            }
          })
        })
    }

    getallorderdetalle(){
        this.orderservices.getAllOrdersStatus(this.idTienda).subscribe((data: any) =>{
            console.log(data);
            this.OrderAvailable = data.map((orst)=>{
                //console.log(biker)
                //console.log(biker.user.MDW_User_Orders)
                return{
                    name:orst.client.name,
                    norder:orst.origin_store_id,
                    id:orst.id,
                    monto:orst.payment_amount,
                    hini:orst.creation_date,
                    status:orst.status===1?"procesada":orst.status===2?"asignada":orst.status===3?"en ruta":orst.status===4?"en el sitio":orst.status===6?"emergencia":orst.status===7?"emergencia":orst.status===8?"emergencia":orst.status===9?"emergencia":"entregado",
                    hend:orst.creation_date
                }
                
            })
        })
    }

    getAvailableBiker(){
        //console.log(this.idTienda)
        this.orderservices.bikerAvailableToOrder(this.idTienda).subscribe((data: any)=>{
            //console.log("motoristas")
            //console.log(data)
            /*let detalle = data.user.MDW_User_Orders.map((detalle)=>{           
                return{
                    orderId:detalle.id,
                    dateEnd:detalle.initial_date,
                    status:detalle.status,
                    dataEnd:detalle.end_date
                    parent:detalle.parent_sku,
                    sku:detalle.sku
                }                
            })


            detalle = []*/
            
            //console.log(this.BikerAvailable)
        })
    }

}