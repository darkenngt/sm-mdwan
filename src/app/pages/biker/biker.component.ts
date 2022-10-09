import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'biker',
    moduleId: module.id,
    templateUrl: 'biker.component.html'
})

export class BikerComponent implements OnInit{
    
    public ordersStructureBiker: any = [{
        estado:"asignada",
        orden:"123457",
        nombre:"Juan Juanero Juarez",
        fecha:"2022-07-22",
        direccion:"34 avenida 7-60 Tikal II , Zona 7, GUATEMALA, CIUDAD DE GUATEMALA",
        telefono:"34566765",
        tipoPago:"efectivo",
        total:100.00,
        cambio:0,
        detalle:[
            {
                master:"pastel Fresita",
                total:100.00,
                cantidad:1,
                items:[
                    {
                    producto:"pastel grande",
                    unidad:1,
                    precio:100.00}
                ]
            },{
                master:"dos de tres",
                total:64.00,
                cantidad:1,
                items:[
                    {
                    producto:"sopa de papa",
                    unidad:1,
                    precio:0.00,
                    complemento:[]
                    },
                    {
                    producto:"ensalada santa fe",
                    precio:0.00,
                    unidad:1,
                    complemento:[
                        {
                            itemcomp:"aderezo chipotle",
                           cantidad:1,
                           precio:0 
                        }
                    ]
                    },
                    {
                        producto:"Horchara",
                        precio:0.00,
                        unidad:1,
                        complemento:[]
                        }
                ]
            },{
                master:"pan de muerto",
                total:25.00,
                cantidad:1,
                items:[
                    
                ]
            }
        ]
    },{
        estado:"asignada",
        orden:"89754",
        nombre:"Maria Marlene Marzaro",
        fecha:"2022-07-22",
        direccion:"34 avenida 7-60  , Zona 1, GUATEMALA, CIUDAD DE GUATEMALA",
        telefono:"34566765",
        tipoPago:"efectivo",
        total:100.00,
        cambio:200,
        detalle:[
            {
                master:"pastel Chocolate",
                total:100.00,
                cantidad:1,
                items:[
                    {
                    producto:"Mini Cake",
                    unidad:1,
                    precio:100.00}
                ]
            },{
                master:"dos de tres",
                total:64.00,
                cantidad:1,
                items:[
                    {
                    producto:"sopa de papa",
                    unidad:1,
                    precio:0.00,
                    complemento:[]
                    },
                    {
                    producto:"ensalada pepitoria",
                    precio:0.00,
                    unidad:1,
                    complemento:[
                        {
                           itemcomp:"aderezo limon",
                           cantidad:1,
                           precio:0 
                        }
                    ]
                    },
                    {
                        producto:"Limonada",
                        precio:0.00,
                        unidad:1,
                        complemento:[]
                        }
                ]
            },{
                master:"pan frances",
                total:18.00,
                cantidad:1,
                items:[
                    
                ]
            }
        ]
    }];
    public mEnRuta: boolean = true;
    public estadoBotones: any = [];
    public mEnSitio: boolean = false;
    public mEntregado: boolean = false;
    public vistaPedido: boolean = true;
    public orderemergency: any = [];
    
    constructor(){
        /*this.ordersStructureBiker.forEach(order => {
            this.estadoBotones.push({
                mEnRuta:true,
                mEnSitio:false,
                mEntregado:false,
                vistaPedido:true
            })
        });*/
        this.ordersStructureBiker = this.ordersStructureBiker.map( (order, index) =>{
            order.mEnRuta = true;
            order.mEnSitio = false;
            order.mEntregado = false;
            order.vistaPedido = true;
            order.indice = index;
            return order;
        })
        //console.log(this.ordersStructureBiker);
    }
    showRuta(rutaOrder, indice){
        console.log(indice);
        console.log(this.ordersStructureBiker[indice]);
        console.log(this.ordersStructureBiker);
        this.ordersStructureBiker[indice].mEnRuta = false;
        this.ordersStructureBiker[indice].mEnSitio = true;
        this.ordersStructureBiker[indice].mEntregado = false;
      
    }
    showSitio(sitioOrder, indice){
        this.ordersStructureBiker[indice].mEnRuta = false;
        this.ordersStructureBiker[indice].mEnSitio = false;
        this.ordersStructureBiker[indice].mEntregado = true;
        console.log(sitioOrder);
    }
    showEntrega(entregaOrder, indice){
        this.ordersStructureBiker[indice].mEnRuta = false;
        this.ordersStructureBiker[indice].mEnSitio = false;
        this.ordersStructureBiker[indice].mEntregado = false;
        console.log(entregaOrder);
    }
    showPedido(showOrder, indice){
        this.ordersStructureBiker[indice].vistaPedido = false;
        console.log("se cierra pedido");
        console.log(showOrder);
    }
    finOrden(entregaOrder, indice){
        this.showEntrega(entregaOrder, indice);
        this.showPedido(entregaOrder, indice);
    }

    emergency(){
       this.ordersStructureBiker.map( (order, index) =>{
            this.orderemergency.push(order.orden);
            //return order;
        })
        console.log(this.orderemergency);
    }
    ngOnInit(){
        
    }
}
