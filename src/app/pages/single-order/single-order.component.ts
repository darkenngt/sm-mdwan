import { Component, OnInit } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';

declare var google: any;
@Component({
    selector: 'single-order',
    moduleId: module.id,
    templateUrl: 'single-order.component.html'
})

export class SingleOrderComponent implements OnInit{

    public geoPosition: any = [];
    constructor(private geolocation$: GeolocationService){
        this.geolocation$.subscribe(position => 
            this.rendermap(position));
        
        
    }
    public ordersStructureSingle: any = [{
        estado:"asignada",
        orden:"123457",
        nombre:"Juan Juanero Juarez",
        fecha:"2022-07-22",
        direccion:"34 avenida 7-60 Tikal II , Zona 7, GUATEMALA, CIUDAD DE GUATEMALA",
        telefono:"34567766",
        telalt:"34567766",
        correo:"test@test.com",
        tipoPago:"efectivo",
        nomfac:"chimuelo S.A",
        nit:"3434334-1",
        direcfact:"Ciudad",
        indicaciones:"donde no lleagn",
        tipopago:"visa delivery",
        autorizacion:"34321",
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
    }];


    ngOnInit() {
   
        this.rendermap
    }



    rendermap(position){
        console.log(position.coords.longitude)
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

}