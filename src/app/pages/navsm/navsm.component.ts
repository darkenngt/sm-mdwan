import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'NavSm',
    moduleId: module.id,
    templateUrl: 'navsm.component.html'
})

export class NavSm implements OnInit{

public userInfo = JSON.parse(localStorage.getItem("userInformation")) !== undefined?JSON.parse(localStorage.getItem("userInformation")):404
public userType = this.userInfo === null?0:this.userInfo.user_type
initComponent(){

    
}
    ngOnInit(){
        //console.log("soy "+this.userType)
    }
}
