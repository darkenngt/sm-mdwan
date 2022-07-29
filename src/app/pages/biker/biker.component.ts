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
        tipoPago:"efectivo",
        total:100.00,
        numeroPedido:"123",
        detalle:[
            {
                master:"pastel Fresita",
                total:100.00,
                cantidad:1,
                items:[{
                producto:"pastel grande",
                unidad:1,
                precio:100.00}
                ]
            },{
                master:"dos de tres",
                total:64.00,
                cantidad:1,
                items:[{
                producto:"sopa de papa",
                unidad:1,
                precio:0.00
                },{
                        producto:"ensalada santa fe",
                        precio:0.00,
                        },{
                            producto:"Horchara",
                            precio:0.00,
                            }
                ]
            },{
                master:"pan de muerto",
                total:25.00,
                cantidad:1,
                items:{
   
                }
            }
        ]
    },{
        estado:"asignada",
        orden:"12345",
        nombre:"Juan Juanero Juarez",
        fecha:"2022-07-22",
        direccion:"34 avenida 7-60 Tikal II , Zona 7, GUATEMALA, CIUDAD DE GUATEMALA",
        tipoPago:"efectivo",
        total:100.00,
        numeroPedido:"123",
        detalle:[
            {
                master:"pastel Chocolate",
                total:100.00,
                cantidad:1,
                items:[{
                producto:"porsion",
                unidad:1,
                precio:100.00,
                }
            ]
            },{
                master:"dos de tres",
                total:64.00,
                cantidad:1,
                items:[{
                producto:"sopa de papa",
                unidad:1,
                precio:0.00
                },{
                        producto:"ensalada santa fe",
                        precio:0.00,
                        },{
                            producto:"Horchara",
                            precio:0.00,
                            }
                ]
            },{
                master:"pan frances",
                total:18.00,
                cantidad:1,
                items:[]
            }
        ]
    }];
    public mEnRuta: boolean = true;
    public mEnSitio: boolean = false;
    public mEntregado: boolean = false;
    public vistaPedido: boolean = true;
    
    showRuta(){
        this.mEnRuta = false;
        this.mEnSitio = true;
        this.mEntregado = false;
        console.log(this.ordersStructureBiker);
    }
    showSitio(){
        this.mEnRuta = false;
        this.mEnSitio = false;
        this.mEntregado = true;
    }
    showEntrega(){
        this.mEnRuta = false;
        this.mEnSitio = false;
        this.mEntregado = false;
    }
    showPedido(){
        this.vistaPedido = false;
        console.log("se cierra pedido");
    }
    finOrden(){
        this.showEntrega();
        this.showPedido();
    }
    pinchazo(){

    }
    ngOnInit(){
        
    }
}
