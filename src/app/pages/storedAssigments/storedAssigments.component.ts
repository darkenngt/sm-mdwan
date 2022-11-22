import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { OrderServices } from 'app/services/order.services'


@Component({
    selector: 'storedAssigments',
    moduleId: module.id,
    templateUrl: 'storedAssigments.component.html'
})

export class StoredAssigmentsComponent implements OnInit{
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
  storeSessionId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
      public model: any;
      public listBikerStore: any = []
      public statesWithFlags: {codigo: string, nombre: string, empresa: string}[]
      public UserAssingstore: any = [];
      constructor( public orderservices: OrderServices){
      }
  search: OperatorFunction<string, readonly {codigo, nombre, empresa}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.statesWithFlags.filter(v => v.codigo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {codigo: string}) => x.codigo;
  
    ngOnInit(){
      this.initComponent()
      this.listUserStore()
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    initComponent(){
      let typeUser = 3
      console.log("entre al código")
      this.orderservices.getAvailableBikers(typeUser).subscribe((data: any) =>{
        console.log("entre a data");
        console.log(data)
        this.statesWithFlags = data.map((biker)=>{
            return {
                codigo: biker.code===""?biker.dpi:biker.code,
                nombre:biker.first_name+" "+biker.last_name,
                empresa:biker.enterprise.name,
                id:biker.id,
                store_id:this.storeSessionId
            }
        })
      
    });
  
    //this.getDelivery()

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

    addUserBiker(){
      let addUserAssingstore = {
        "storeId": this.storeSessionId,
        "userId": this.model.id
        
      }
      /*console.log("esto va")
      console.log(addUserAssingstore)
      console.log("entre a delete")
      console.log(this.model)*/
      this.orderservices.addUserbikerStore(addUserAssingstore).subscribe((data: any) =>{
        this.listUserStore()
      
    });
      this.model = {};
      this.UserAssingstore = []

    }

    listUserStore(){
      console.log("lista usuarios");
      this.orderservices.getUserBikerStore(this.storeSessionId).subscribe((data: any) =>{
        //console.log("esta es la data");
        //console.log(data);
        //this.listBikerStore.push(data)
        this.listBikerStore = data.map((bikerStore)=>{
            return {
                codigo: bikerStore.user.code===""?bikerStore.user.dpi:bikerStore.user.code,
                nombre:bikerStore.user.first_name+" "+bikerStore.user.last_name,
                empresa:bikerStore.user.enterprise.name,
                user_id:bikerStore.user_id,
                store_id:this.storeSessionId,
                fechaAsignacion:bikerStore.initial_date
            }
            
        })
        //console.log(this.listBikerStore)
    });
    }

    deleteUserBiker(duser_id, dStore_id){
      let delUser = {
        "userId": duser_id,
        "storeId": dStore_id
      }
      console.log("eliminando")
      console.log(delUser)
      this.orderservices.deleteUserbikerStore(delUser).subscribe((data: any) =>{
       this.listUserStore()
      
    });
    }
}