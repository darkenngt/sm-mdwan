import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { OrderServices } from 'app/services/order.services'


@Component({
    selector: 'updatePassword',
    moduleId: module.id,
    templateUrl: 'updatePassword.component.html'
})

export class UpdatePasswordComponent implements OnInit{
  public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
 // storeSessionId = this.userInfo === null?0:this.userInfo.MDW_User_Stores[0].store_id
  today: Date = new Date();
  actpass ='';
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
      
      
    }

    initComponent(){
      this.allstore = []
      this.getallstore()
      console.log("entre al código")
      this.orderservices.allUsermdw().subscribe((data: any) =>{
        console.log("entre a pass");
        console.log(data)
        this.statesWithFlags = data.map((pass)=>{
          console.log(pass)
            return {
                codigo: pass.code===""?pass.dpi:pass.code,
                nombre:pass.first_name+" "+pass.last_name,
                empresa:pass.enterprise_id,
                id:pass.id
            }
        })
      
    });
    console.log(this.statesWithFlags)
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

    updatePass(){
      console.log(this.actpass)
      let uddateTopass = {userId: this.model.id, password: this.actpass}
      console.log("esto va")
      console.log(uddateTopass)
      console.log(this.model)
      this.orderservices.updatePassword(JSON.stringify(uddateTopass)).subscribe((data: any) =>{
        console.log(data)
    });
      this.model = {};
      this.UserAssingstore = []
      this.idTienda = 0

    }


}