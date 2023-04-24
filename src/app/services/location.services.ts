import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })


export class GeoService{

    public useLocation?:[number,number]

    get isUserLocationReady(): boolean {
        return !!this.useLocation
    }

    constructor(public router: Router){
        this.getUserLocation()
    }

    public async getUserLocation(): Promise<[number,number]>{
        return new Promise((resolve, reject )=>{
            navigator.geolocation.getCurrentPosition(
                ( {coords}) => {
                    this.useLocation = [coords.longitude, coords.latitude]
                    resolve(this.useLocation)
                },
                (err)=>{
                    console.log("no se pudo obtener la geolocalización")
                    console.log(err)
                    this.router.navigate(['login'])
                    reject()
                }
            )
        })
    }
}
