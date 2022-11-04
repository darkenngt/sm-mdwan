import { Component, OnInit } from '@angular/core';
import { AuthService} from 'app/services/auth.services'
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { Md5 } from 'ts-md5'
import { ToastrService } from "ngx-toastr";
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
    public from = "top"
    public align = "right"
    constructor(public authService: AuthService, public router: Router, private toastr: ToastrService){
        this.var1 = 15;
        //this.userAuthentication.user = '';
        //this.userAuthentication.password = '';
        //console.log(this.var1);
    }
    ngOnInit(){
        this.showVariables();
        localStorage.clear();

    }
    showVariables(): void{
        this.var1 = 18;
        this.userName = '';
        //console.log(this.var1);
    }
    getValue(){
        localStorage.clear();
        //console.log(this.userAuthentication.user)
        const md5 = new Md5()
         let message = "Usuario"
         let smsEnd = "Ingreso exitoso"
         let smsError = "Usurio o contraseña incorrecta"
         
        let jsonLogin = { username:this.userName, password:this.password }
        let varJson = JSON.stringify(jsonLogin)
        this.authService.postlogin(varJson).subscribe((data: any) =>{
            localStorage.setItem('userInformation',JSON.stringify(data.userInformation))
            localStorage.setItem('accestoken',JSON.stringify(data.accessToken))
            console.log(data.userInformation)
            let typeUser: Number = data.userInformation.user_type;

            if (data != "Forbidden") {
                console.log("viene data")
                switch (typeUser) { 
                    case 1:
                        console.log("Usuario administrador");
                        this.toastr.success(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+" "+data.userInformation.user_type.first_name+" "+smsEnd+'</span>',
                            "",
                            {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-success alert-with-icon",
                            positionClass: "toast-" + this.from + "-" + this.align
                            }
                        )
                        break;
                    case 2:
                        console.log("Usuario order manager");
                        this.toastr.success(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+" "+data.userInformation.user_type.first_name+" "+smsEnd+'</span>',
                            "",
                            {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-success alert-with-icon",
                            positionClass: "toast-" + this.from + "-" + this.align
                            }
                        )
                        break;
                    case 3:
                        console.log("Usuario biker");
                        this.toastr.success(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+" "+data.userInformation.first_name+" "+smsEnd+'</span>',
                            "",
                            {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-success alert-with-icon",
                            positionClass: "toast-" + this.from + "-" + this.align
                            }
                        )
                        this.router.navigate(['biker']);
                        break;
                    default: 
                        console.log("No existe el usuario");
                        this.toastr.error(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+smsError+'</span>',
                            "",
                            {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-error alert-with-icon",
                            positionClass: "toast-" + this.from + "-" + this.align
                            }
                        )
                        break;
                }
            }else{
                console.log("no viene data")
                this.toastr.error(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+smsError+'</span>',
                    "",
                    {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: "toast-" + this.from + "-" + this.align
                    }
                )
            }
        })
        /*console.log("json sin stringify")
        console.log(jsonLogin)
        console.log("json con stringify")
        console.log(varJson)
        console.log("json con md5")
        console.log(md5.appendStr(varJson).end())
        console.log(this.userName);*/
        console.log(md5.appendStr(this.password).end());
        $("#btn_sub").removeClass("btn-primary");
        $("#btn_sub").addClass("btn-danger");
        //this.router.navigate(['biker']);

    }
}