import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
/*interface Login{
    user: string;
    password: string;
}*/

@Component({
    selector: 'UserLogin',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{
    public var1: number;
    //public userAuthentication: Login;
    public userName: string = '';
    public password: string = '';
    constructor(){
        this.var1 = 15;
        //this.userAuthentication.user = '';
        //this.userAuthentication.password = '';
        console.log(this.var1);
    }
    ngOnInit(){
        this.showVariables();
    }
    showVariables(): void{
        this.var1 = 18;
        this.userName = '';
        console.log(this.var1);
    }
    getValue(){
        //console.log(this.userAuthentication.user)
        console.log(this.userName);
        console.log(this.password);
    }
}