import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { OrderServices} from 'app/services/order.services'
import { Md5 } from 'ts-md5'
import {Router} from '@angular/router';

@Component({
    selector: 'UserRegister',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
    public model: any;
    public idEmpresa: number;
    public enterprises: any = []
    textp1 = ''; //initialised the text variable
    textp2 = ''
    public from = "top"
    public align = "right"
    constructor(private toastr: ToastrService, public OrderServices: OrderServices, public router: Router){
        this.initComponent()
    }
    ngOnInit(){
        this.getEnterprise()
    }
    initComponent(){
        this.enterprises = []
    }
    
    onKeyUp(x) { // appending the updated value to the variable
        //this.text += x.target.value + ' | ';
      }

      settimer(){
        location.reload()
        }

        getEnterprise(){
                this.OrderServices.getAllEnterprise().subscribe((data: any) =>{
                    console.log(data)
                  this.enterprises = data.map((stores)=>{
                    return{
                      id:stores.id,
                      name:stores.name
                    }
                  })
                })
        }
        
      onSubmit(f: NgForm) {
        //console.log(f.value);  // { first: '', last: '' }
        const md5 = new Md5()
        let elePass = document.getElementsByName("password")[0]
        let smspass1 = "debe contener 8 caracteres"
        let smspass2 = "el password no coincide"
        let vacio = "Debe de llenar todos los campos"
        let password: string = f.value.password
        let pass2: string = f.value.pass2
        let empresa:number = f.value.empresa
        let correo:string = f.value.correo
        let nombres:string = f.value.nombres
        let apellidos:string = f.value.apellidos
        let codigo:string = f.value.codigo
        let tipo:number = f.value.tipo
        let tienda:string = "1"   
        let dpi:string = f.value.dpi   

        if (f.valid === false) {
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+vacio+'</span>',
                "",
                {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: "toast-" + this.from + "-" + this.align
                }
            )
        }else if (password.length <8) {
            //console.log(f.valid)
            elePass.classList.add('bg-yellow');
            this.toastr.warning(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+smspass1+'</span>',
                "",
                {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: "toast-" + this.from + "-" + this.align
                }
            )

            this.textp1 = "debe contener 8 caracteres"
        } else if (password !== pass2){
            console.log("los pass son")
            console.log(password+"|"+pass2)
            this.textp2 = "el password no coincide"
            this.toastr.warning(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+smspass2+'</span>',
                "",
                {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: "toast-" + this.from + "-" + this.align
                }
            
            )
        }else{
            let errorsmsu = "No se pudo realizar la acción contacte a sistemas"
            let succesu = "Usuario registrado con exito"
            let jsonUser ={
                firstName: nombres,
                lastName: apellidos,
                email: correo,
                password: password,
                code: codigo,
                dpi:dpi,
                userType: tipo,
                enterpriseId: empresa
            }
            console.log(jsonUser)
            this.OrderServices.postCreateUser(jsonUser).subscribe((data: any) =>{
                console.log(data)
                if (data) {
                    if (data.errorType) {
                        console.log(data)
                    this.toastr.warning(
                        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+data.errorType+" "+data.errorField+'</span>',
                        "",
                        {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-warning alert-with-icon",
                        positionClass: "toast-" + this.from + "-" + this.align
                        }
                    )
                    }else{
                        this.toastr.success(
                            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+succesu+'</span>',
                            "",
                            {
                            timeOut: 4000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-success alert-with-icon",
                            positionClass: "toast-" + this.from + "-" + this.align
                            }
                        )
                        setInterval(this.settimer, 2000)
                        
                    }
                }
            })
        }
            
      }


    
}