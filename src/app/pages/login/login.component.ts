import { Component, OnInit } from '@angular/core';
import { AuthService} from 'app/services/auth.services'
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { Md5 } from 'ts-md5'
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
    constructor(public authService: AuthService, public router: Router){
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
        const md5 = new Md5()
         
        let jsonLogin = { username:this.userName, password:this.password }
        let varJson = JSON.stringify(jsonLogin)
        this.authService.postlogin(varJson).subscribe((data: any) =>{
            localStorage.setItem('userInformation',JSON.stringify(data.userInformation))
            localStorage.setItem('accestoken',JSON.stringify(data.accessToken))
            console.log(data)
        })
        console.log("json sin stringify")
        console.log(jsonLogin)
        console.log("json con stringify")
        console.log(varJson)
        console.log("json con md5")
        console.log(md5.appendStr(varJson).end())
        console.log(this.userName);
        console.log(md5.appendStr(this.password).end());
        $("#btn_sub").removeClass("btn-primary");
        $("#btn_sub").addClass("btn-danger");
        this.router.navigate(['biker']);

    }
}