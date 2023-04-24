import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { OrderServices } from 'app/services/order.services'


@Component({
    selector: 'coordinadores',
    moduleId: module.id,
    templateUrl: 'coordinadores.component.html'
})

export class CoordinadoresComponent implements OnInit{
  public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
 // storeSessionId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
      public model: any;
      public idTienda: number;
      public listCoorStore: any = []
      public statesWithFlags: {codigo: string, nombre: string, empresa: string}[]
      public UserAssingstore: any = [];
      public allstore: any = [];
      constructor( public orderservices: OrderServices){
        this.initComponent()
        /*this.UserAssingstore = this.UserAssingstore.map( (data, index) =>{
          data.date = this.todayWithPipe = this.pipe.transform(Date.now(), 'h:mm:ss a')
          data.indice = index;
          return data;
        })*/
        
      }
  search: OperatorFunction<string, readonly {codigo, nombre, empresa}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.statesWithFlags.filter(v => v.codigo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {codigo: string}) => x.codigo;
    /*myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];*/
  
    ngOnInit(){
      
      this.listUserStore()
      
    }

    initComponent(){
      this.allstore = []
      this.getallstore()
      let typeUser = 2
      this.orderservices.getAvailableCoord(typeUser).subscribe((data: any) =>{
        //console.log("entre a data");
        //console.log(data)
        this.statesWithFlags = data.map((coor)=>{
          console.log("data coordinador")
          console.log(coor)
            return {
                codigo: coor.code===""?coor.dpi:coor.code,
                nombre:coor.first_name+" "+coor.last_name,
                empresa:coor.enterprise.name,
                id:coor.id,
                store_id:1,//this.storeSessionId
            }
        })
      
    });
    //this.getDelivery()
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

    add(test){
      console.log(this.UserAssingstore)
      const arr = Array.from(test);
      /*arr =  arr.map( (data, index) =>{
          data.date = this.todayWithPipe = this.pipe.transform(Date.now(), 'h:mm:ss a')
          data.indice = index;
          return data;
      })*/
      //arr.push(this.todayWithPipe = this.pipe.transform(Date.now(), 'h:mm:ss a'))
      this.UserAssingstore.push(test)
     
      //console.log(test)
    }

    addUserCoor(){
      let addUserAssingstore = {
        "storeId": this.idTienda,
        "userId": this.model.id
      }
      //console.log(this.model)
      this.orderservices.addUserbikerStore(addUserAssingstore).subscribe((data: any) =>{
        this.listUserStore()
      
    });
      this.model = {};
      this.UserAssingstore = []
      this.idTienda = 0

    }

    listUserStore(){
      let typeUser = 2
      this.orderservices.getUserAllStore(typeUser).subscribe((data: any) =>{
        //this.listCoorStore.push(data)
        console.log("data para eliminar")
        console.log(data)
        this.listCoorStore = data.map((CoorStore)=>{
            return {
                codigo: CoorStore.user.code===""?CoorStore.user.dpi:CoorStore.user.code,
                nombre:CoorStore.user.first_name+" "+CoorStore.user.last_name,
                empresa:CoorStore.user.enterprise.name,
                user_id:CoorStore.user_id,
                store_name: CoorStore.store.name,
                fechaAsignacion:CoorStore.initial_date,
                store_id:CoorStore.store_id 
            }           
        })
        //console.log(this.listCoorStore)
    });
    }

    deleteUserCoor(duser_id, dStore_id){
      let delUser = {
        "userId": duser_id,
        "storeId": dStore_id
      }
      console.log("eliminando")
      console.log(delUser)
      this.orderservices.deleteUserbikerStore(delUser).subscribe((data: any) =>{
        console.log(data)
       this.listUserStore()
      
    });
    }
}