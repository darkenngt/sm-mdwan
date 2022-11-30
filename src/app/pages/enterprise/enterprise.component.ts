import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { OrderServices} from 'app/services/order.services'
import { Md5 } from 'ts-md5'
import {Router} from '@angular/router';

@Component({
    selector: 'EnterpriseRegister',
    moduleId: module.id,
    templateUrl: 'enterprise.component.html'
})

export class EnterpriseComponent implements OnInit{
    public from = "top"
    public align = "right"
    constructor(private toastr: ToastrService, public OrderServices: OrderServices, public router: Router){

    }


    ngOnInit(){
    }

    onSubmit(f: NgForm) {
        let nameEntreprise: string = f.value.empresa
        let countryE: string = f.value.country
        let smsvacio = "Debe de llenar todos los campos"
       
        if (f.value.empresa === '' || f.value.country === '') {
            console.log("debe de llenar todos los campos")
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+smsvacio+'</span>',
                "",
                {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: "toast-" + this.from + "-" + this.align
                }
            )
        }else{
            let citye: string = countryE==="GTM"?"Guatemala":countryE==="SLV"?"El Salvador":countryE==="USA"?"Estado Unidos":""
            let jsonEnterprise = {name:nameEntreprise, country:countryE, city:citye}
            console.log(jsonEnterprise)
            this.OrderServices.creaToEnterprise(JSON.stringify(jsonEnterprise)).subscribe((data)=>{
                console.log(data)
            })
        }
    }
}