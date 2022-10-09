import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';


const statesWithFlags: {codigo: string, nombre: string, empresa: string}[] = [
    {'codigo': '251632890101', 'nombre': 'Marcel Gregorioa Armas','empresa': 'entregas lentas S.A'},
    {'codigo': '12430', 'nombre': 'Kenny Rolando López Flores', 'empresa': 'Flora S.A'},
    {'codigo': '2516260750101', 'nombre': 'otro yo', 'empresa': 'Mega Mandados S.A'},
    {'codigo': '12456', 'nombre': 'Gordonioa Florindo Apretadin', 'empresa': 'Flora S.A'}];

@Component({
    selector: 'storedAssigments',
    moduleId: module.id,
    templateUrl: 'storedAssigments.component.html'
})

export class StoredAssigmentsComponent implements OnInit{
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
      public model: any;
      public UserAssingstore: any = [
      {'codigo': '251632890101', 
      'nombre': 'Marcel Gregorioa Armas', 
      'empresa': 'entregas lentas S.A',},
      {'codigo': '12430', 
      'nombre': 'Kenny Rolando López Flores', 
      'empresa': 'Flora S.A',},
      {'codigo': '2516260750101', 
      'nombre': 'otro yo', 
      'empresa': 'Mega Mandados S.A',},
      {'codigo': '12456', 
      'nombre': 'Gordonioa Florindo Apretadin', 
      'empresa': 'Flora S.A',}];
      constructor(){
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
        : statesWithFlags.filter(v => v.codigo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {codigo: string}) => x.codigo;
    /*myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];*/
  
    ngOnInit(){
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
      console.log(test)
    }
}