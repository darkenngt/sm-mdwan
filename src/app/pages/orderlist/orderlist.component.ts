import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { OrderServices } from 'app/services/order.services'
import {GeolocationService} from '@ng-web-apis/geolocation';
import { Subscription, interval, tap,  Subject } from 'rxjs';

@Component({
    selector: 'Orderlist',
    moduleId: module.id,
    templateUrl: 'orderlist.component.html'
})


    export class OrderlistComponent implements OnInit, AfterViewInit {
        public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
        public userType = this.userInfo === null?0:this.userInfo.id
        public delOrdersStructure: any = [];
        public PickordersStructure: any = [];
        public proOrdersStructure: any = [];
        public emerOrdersStructure: any = [];
        public showDelivery: boolean = true;
        public showPickup: boolean = false;
        public showEmergencia: boolean = false;
        public showProgramada: boolean = false;
        public storeId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
        private subscriptionDeliver: Subscription;
        private subscriptionDeliverbtn: Subscription;
        private subscriptionProgramer: Subscription;
        private firstCall: boolean = false;
        private previousLength: number = 0;
        public alertDelOrdersStructure: any = [];
        public alertPickordersStructure: any = [];
        public alertProOrdersStructure: any = [];
        public alertEmerOrdersStructure: any = [];
        private audioContext = new AudioContext();
        showAlert = false;
        showAlertPick = false;
        showAlertD = false;
        showAlertE = false;
        showAlertPr = false;
        isPrimaryD = false;
        isPrimaryPick = false;
        isPrimaryPr = false;
        isPrimaryE = false;
        height = 100;
        ordenFilter: any = {numeroPedido:''}
      
        intervaloColorDe;
        intervaloColorPick;
        intervaloColorEm;
        intervaloColorPr;
        
        constructor(public orderservices: OrderServices, private geolocation$: GeolocationService ){
            
        }
        
        
        async delay(delay: number) {
            return new Promise(r => {
                setTimeout(r, delay);
            })
        }
    
        ngOnInit(){
            this.getDelivery()
            this.WebSocketDelivery()
            this.WebSocketDeliverybtn()
        }
        
        detenerDe() {
            clearInterval(this.intervaloColorDe);
            this.isPrimaryD = false
        }
        detenerPic() {
            clearInterval(this.intervaloColorPick);
            this.isPrimaryPick = false
        }
        detenerPr() {
            clearInterval(this.intervaloColorPr);
            this.isPrimaryPr = false
        }
        detenerEm() {
            clearInterval(this.intervaloColorEm);
            this.isPrimaryE = false
        }

        initComponent(){
            this.delOrdersStructure = [];
            this.PickordersStructure = [];
            this.proOrdersStructure = [];
            this.emerOrdersStructure = [];
            
            
            
            
        // crea un nuevo objeto `Date`
        }
    
       WebSocketDeliverybtn(){
            console.log(this.isPrimaryD)
            if (!this.firstCall){
                this.alertNewOrder()
                this.firstCall = true
                this.subscriptionDeliverbtn = interval(15000)
                .subscribe(x =>{
                    this.alertNewOrder()
                })
            }
            else{
                this.firstCall = true
                this.subscriptionDeliverbtn = interval(15000)
                .subscribe(x =>{
                    this.alertNewOrder()
                })
            }
        }

    
        /*ngOnDestroy(): void {
            this.subscriptionDeliver.unsubscribe();
          }*/

          WebSocketDelivery(): void {
            if (!this.firstCall){
                console.log("entre if")
                this.getDelivery()
                this.firstCall = true
                this.subscriptionDeliver = interval(15000)
                .subscribe(x =>{
                    this.getDelivery()
                    //console.log(this.delOrdersStructure+"1")
                    //console.log(this.firstCall)
                })
                //console.log(this.delOrdersStructure+"2")
                //console.log(this.firstCall)
                
            }
            else{
                console.log("entre else")
                this.firstCall = true
                this.subscriptionDeliver = interval(15000)
                .subscribe(x =>{
                    this.getDelivery()
                    //console.log(this.delOrdersStructure)
                    //console.log(this.firstCall)
                })
            }
        }
    
        ngOnDestroy(): void {
            this.subscriptionDeliver.unsubscribe();
            this.subscriptionDeliverbtn.unsubscribe();
          }
    
        getPosition() {
           /* console.log("Entre a geo")
            this.geolocation$.subscribe(position => 
                console.log(position.coords.latitude+" "+position.coords.longitude))*/
        }
        
        ngAfterViewInit() {

        }

        alertNewOrder(){
            this.orderservices.getOrders(this.storeId, 1)
              .pipe(
                tap((data: any) => {
                  let filtDelevyD = [];
                  data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                      let currentDate = new Date(order.creation_date);
                      new Date();
                      filtDelevyD.push({
                        data:data
                      });
                    }
                  });
          
                  // Verificar si la cantidad de objetos cambió o aumentó
                  if (this.showAlertD == true) {
                    if (this.alertDelOrdersStructure && filtDelevyD.length > this.alertDelOrdersStructure.length) {
                        this.reproducir()
                        this.intervaloColorDe = setInterval(() => {
                            this.isPrimaryD = !this.isPrimaryD;
                          }, 1000);
                      }
                  }
                  this.showAlertD = true
          
                  this.alertDelOrdersStructure = filtDelevyD.reverse();
                })
              )
              .subscribe((data: any) => {
                // Tu lógica para procesar los datos
            });
            this.orderservices.getOrders(this.storeId, 2)
            .pipe(
                tap((data: any) => {
                  let filtDelevyPick = [];
                  data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                        filtDelevyPick.push({
                        data:data
                      });
                    }
                  });
          
                  // Verificar si la cantidad de objetos cambió o aumentó
                  if (this.showAlertPick == true) {
                    if (this.alertPickordersStructure && filtDelevyPick.length > this.alertPickordersStructure.length) {
                        this.reproducir()
                        this.intervaloColorPick = setInterval(() => {
                            console.log("sin entre a parpadear")
                            this.isPrimaryPick = !this.isPrimaryPick;
                          }, 1000);
                      }
                  }
                  this.showAlertPick = true
                  this.alertPickordersStructure = filtDelevyPick.reverse();
                })
              )
              .subscribe((data: any) => {
                // Tu lógica para procesar los datos
            });
            this.orderservices.getOrders(this.storeId, 3)
              .pipe(
                tap((data: any) => {
                  let filtDelevyPr = [];
                  data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                      filtDelevyPr.push({
                        data:data
                      });
                    }
                  });
          
                  // Verificar si la cantidad de objetos cambió o aumentó
                  if (this.showAlertPr == true) {
                    if (this.alertProOrdersStructure && filtDelevyPr.length > this.alertProOrdersStructure.length) {
                        this.reproducir()
                        this.intervaloColorPr = setInterval(() => {
                            this.isPrimaryPr = !this.isPrimaryPr;
                            console.log(this.isPrimaryPr)
                          }, 1000);
                      }
                  }
                  this.showAlertPr = true
                  this.alertProOrdersStructure = filtDelevyPr.reverse();
                })
              )
              .subscribe((data: any) => {
                // Tu lógica para procesar los datos
            });
            this.orderservices.getOrders(this.storeId, 4)
              .pipe(
                tap((data: any) => {
                  let filtDelevyE = [];
                  data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                      filtDelevyE.push({
                        data:data
                      });
                    }
                  });
          
                  // Verificar si la cantidad de objetos cambió o aumentó
                  if (this.showAlertE == true) {
                    if (this.alertEmerOrdersStructure && filtDelevyE.length > this.alertEmerOrdersStructure.length) {
                        this.reproducir()
                        this.intervaloColorEm = setInterval(() => {
                            this.isPrimaryE = !this.isPrimaryE;
                          }, 1000);
                      }
                  }
                  this.showAlertE = true
                  this.alertEmerOrdersStructure = filtDelevyE.reverse();
                })
              )
              .subscribe((data: any) => {
                // Tu lógica para procesar los datos
            });
        }
        
        getDelivery(){
            this.showDelivery = true
            this.showPickup = false;
            this.showEmergencia = false;
            this.showProgramada = true
            let typeorder = 1
            let typeorderpro = 3
            this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
                //console.log(data)
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
                                tipoPago:order.payment_type===1?"efectivo":order.payment_type===13?"Cybersource":order.payment_type===17?"Visa delivery":order.payment_type===18?"Whatsapp":"",
                                total:order.payment_amount,
                                numeroPedido:order.origin_store_id,
                                fechasort:order.creation_date,
                                idOrder:order.id,
                                //deliveryDate: new Date(order.creation_date),
                                deliveryDate: new Date(new Date(order.creation_date).setHours(new Date(order.creation_date).getHours() + 6)),
                                creationDate: order.creation_date
                            }
                        )
                    }
                    
                });
                // Ordenar los elementos por la fecha
                filtDelevy.sort((a, b) => {
                  const dateA = new Date(a.fechasort).getTime();
                  const dateB = new Date(b.fechasort).getTime();
                  return dateB - dateA;
                });
                this.delOrdersStructure = filtDelevy
                //console.log(filtDelevy)
            });

            this.orderservices.getOrders(this.storeId,typeorderpro).subscribe((data: any) =>{
              let filtProga = []
              //console.log(data)
              //console.log("programadas")
              data.forEach(order => {
                  if (order.status !== 0 && order.status !== 5) {
                      filtProga.push(
                          {
                              tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                              estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                              nameEstado:order.status===6?"pinchazo":order.status===7?"sin gas":order.status===8?"robo":order.status===9?"accidente":"",
                              nombre:order.client.name,
                              fecha:order.creation_date.substring(0, 10),
                              tipoPago:order.payment_type===1?"efectivo":order.payment_type===13?"Cybersource":order.payment_type===17?"Visa delivery":order.payment_type===18?"Whatsapp":"",
                              total:order.payment_amount,
                              numeroPedido:order.origin_store_id,
                              idOrder:order.id,
                              deliveryDate: this.getDeliveryDate(order.delivery_day),
                              dateView:order.delivery_day
                          }
                      )
              }
                  
              });
              filtProga.sort((a, b) => {
                // Convertir las fechas de 'a' y 'b' a objetos Date
                const dateA = new Date(a.deliveryDate);
                const dateB = new Date(b.deliveryDate);
              
                // Restar las fechas para obtener la diferencia en milisegundos
                const difference = dateA.getTime() - dateB.getTime() ;
              
                // Retornar el resultado de la comparación de diferencia
                return difference;
              });
              this.proOrdersStructure = filtProga//.reverse()
              console.log(this.proOrdersStructure.dateView)
            
          });
            //window.onload = this.getEmergencia
        }
        
        async reproducir() { 
            const response = await fetch('assets/sound/android-sms.mp3');
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            const audioSource = this.audioContext.createBufferSource();
            audioSource.buffer = audioBuffer;
            audioSource.connect(this.audioContext.destination);
            audioSource.start(0);
        }
    
        getPickup(){
            this.showDelivery = false
            this.showPickup = true;
            this.showEmergencia = false;
            this.showProgramada = false
            let typeorder = 2
            this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
                let filtPickup = []
                console.log(data)
                data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                        filtPickup.push(
                            {
                                tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                                estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                                nombre:order.client.name,
                                fecha:order.creation_date.substring(0, 10),
                                tipoPago:order.payment_type===1?"efectivo":order.payment_type===13?"Cybersource":order.payment_type===17?"Visa delivery":order.payment_type===18?"Whatsapp":"",
                                total:order.payment_amount,
                                numeroPedido:order.origin_store_id,
                                idOrder:order.id,
                                deliveryDate: new Date(new Date(order.creation_date).setHours(new Date(order.creation_date).getHours() + 6)),
                            }
                        )
                        
                    }
                });
                this.PickordersStructure = filtPickup.reverse()
            });
            
            console.log(this.showPickup);
        }
        getEmergencia(){
            this.showDelivery = false
            this.showPickup = false;
            this.showProgramada = false
            this.showEmergencia = true;
            let typeorder = 4
            
            this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
                console.log(data.sort((a, b) => a.id > b.id))
                let dataSotE = data.sort((a, b) => a.id > b.id)
                let filterEmerOrdersStructure = []
                dataSotE.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                        filterEmerOrdersStructure.push(
                            {
                                tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                                estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                                nameEstado:order.status===6?"pinchazo":order.status===7?"sin gas":order.status===8?"robo":order.status===9?"accidente":"",
                                nombre:order.client.name,
                                fecha:order.creation_date.substring(0, 10),
                                tipoPago:order.payment_type===1?"efectivo":order.payment_type===13?"Cybersource":order.payment_type===17?"Visa delivery":order.payment_type===18?"Whatsapp":"",
                                total:order.payment_amount,
                                numeroPedido:order.origin_store_id,
                                idOrder:order.id,
                                deliveryDate: new Date(new Date(order.creation_date).setHours(new Date(order.creation_date).getHours() + 6)),
                            }
                        )
                        
                    }
                });
                this.emerOrdersStructure = filterEmerOrdersStructure.reverse()
                console.log(this.emerOrdersStructure);
            });
            
        }
    
        getDeliveryDate(delivery_day){
            console.log(delivery_day)
            let deliveryDate = new Date()
            let divDate = delivery_day.split('-')
            console.log(divDate)
            let divYear = divDate[2].split (' ')
            let timep = divYear[1] + " " + divYear[2]
            console.log("soy la hora "+timep)
            let divHour = divYear[1].split(':')
            //console.log(divHour)
            let deliveryMonth = parseInt(divDate[0]) - 1
            let deliveryDay = parseInt(divDate[1])
            let deliveryYear = parseInt(divYear[0])
            //let deliveryHour = parseInt(divHour[0])
            //let deliveryMinute = parseInt(divHour[1])=== 1 ? 30: 0
            let hours = Number(timep.match(/^(\d+)/)[1]);
            let minutes = Number(timep.match(/:(\d+)/)[1]);
            let meridiem = timep.match(/\s(.*)$/)[1];
          
            if (meridiem === 'PM' && hours < 12) {
              hours += 12;
            }
            if (meridiem === 'AM' && hours === 12) {
              hours -= 12;
            }
          
            let hoursStr = hours.toString().padStart(2, '0');
            let minutesStr = minutes.toString().padStart(2, '0');
            console.log("hora convertida "+ hoursStr+ " " + minutes )
            deliveryDate = new Date(deliveryYear, deliveryMonth, deliveryDay, parseInt(hoursStr) ,parseInt(minutesStr))
            console.log(deliveryDate)
            return deliveryDate
        }
    
        getprogramadas(){
            
            this.showProgramada = true
            this.showDelivery = false
            this.showPickup = false;
            this.showEmergencia = false;
            let typeorder = 3
            //console.log(this.showProgramada)
            this.orderservices.getOrders(this.storeId,typeorder).subscribe((data: any) =>{
                let filtProga = []
                //console.log(data)
                console.log("programadas")
                data.forEach(order => {
                    if (order.status !== 0 && order.status !== 5) {
                        filtProga.push(
                            {
                                tipo: order.order_type===1?"delivery":order.order_type===2?"pickup":order.order_type===3?"programada":"emergencia",
                                estado:order.status===1?"procesada":order.status===2?"asignada":order.status===3?"en ruta":order.status===4?"en el sitio":order.status===6?"emergencia":order.status===7?"emergencia":order.status===8?"emergencia":order.status===9?"emergencia":"entregado",
                                nameEstado:order.status===6?"pinchazo":order.status===7?"sin gas":order.status===8?"robo":order.status===9?"accidente":"",
                                nombre:order.client.name,
                                fecha:order.creation_date.substring(0, 10),
                                tipoPago:order.payment_type===1?"efectivo":order.payment_type===13?"Cybersource":order.payment_type===17?"Visa delivery":order.payment_type===18?"Whatsapp":"",
                                total:order.payment_amount,
                                numeroPedido:order.origin_store_id,
                                idOrder:order.id,
                                deliveryDate: this.getDeliveryDate(order.delivery_day),
                                dateView:order.delivery_day
                            }
                        )
                }
                    
                });
                this.proOrdersStructure = filtProga//.reverse()
                console.log(this.proOrdersStructure)
              
            });
            console.log("es la de delivery")
            console.log(this.showDelivery)
        }
    
    
    }
    