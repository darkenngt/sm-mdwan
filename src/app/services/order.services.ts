import { Injectable , NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import {Router} from '@angular/router';



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1ycGVyZXpAc2FubWFydGluYmFrZXJ5LmNvbSIsInVzZXJfdHlwZSI6MywiZGF0ZV90aW1lIjoiMjAyMi0xMC0yNVQwNzowMjowMC4xOTJaIn0.KLDWCwU4PXt9Uy9DqFABH9KmL4F0GnmSxPmqI0F-BeM'
      'Authorization': localStorage.getItem('accestoken')
    })
  }
  console.log(httpOptions)
@Injectable({
    providedIn: 'root'
  })

export class OrderServices{
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
          if (error.status === 403) {
            console.log("tas morida")
            localStorage.clear();
            //this.router.navigate(['login'])
          }
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
      }
      //apiUrl = "https://middleware.sanmartinbakery.com/orders/v1";
    apiUrl = "http://localhost/orders/v1";
    constructor(private http: HttpClient, public router: Router){
        
    }

    getOrders(storeId, typeorder){
        return this.http.get(`${this.apiUrl}/ordersByStoreAndType/${storeId}/${typeorder}`,httpOptions).pipe(
            //catchError(this.handleError)
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderDetail(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/detailsOrdene/${orderId}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderAssing(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderAssing/${orderId}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderRute(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderRute/${orderId}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderSite(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderSite/${orderId}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderDelivered(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderDelivered/${orderId}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderEmergency(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderEmergency/${orderId}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    getOrdersBiker(Idbiker:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/detailsOrderBiker/${Idbiker}`,JSON.stringify(jsonBody),httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    getAvailableBickers(){
        return this.http.get(`${this.apiUrl}/getAvailablePilots`,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    addUserbikerStore(jsonBody:any){
        return this.http.post(`${this.apiUrl}/assignPilotToStore/`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    
    deleteUserbikerStore(jsonBody:any){
        return this.http.delete(`${this.apiUrl}/disablePilotFromStore/${jsonBody.userId}/${jsonBody.storeId}`,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    
    getUserBikerStore(storeId){
        return this.http.get(`${this.apiUrl}/getAssignedPilotsByStore/${storeId}`,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    informationOrder(idOrder){
        return this.http.get(`${this.apiUrl}/informationOrder/${idOrder}`,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    bikerAvailableToOrder(storeId){
        return this.http.get(`${this.apiUrl}/getAvailablePilotsToOrder/${storeId}`,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    assingBikertoOrder(jsonBody:any){
        return this.http.post(`${this.apiUrl}/assignPilotToOrder/`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    
    orderByBiker(storeId,userId){
        return this.http.get(`${this.apiUrl}/ordersByStoreAndPilot/${storeId}/${userId}`,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    /**Metodos de motoristas */
    crtInroute(jsonBody:any){
        console.log(jsonBody)
        return this.http.put(`${this.apiUrl}/updateOrder/route`,jsonBody,httpOptions).pipe(
            catchError(this.handleError))
    }
    crtInsite(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/site`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtInDelivered(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/delivered`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtInRide(jsonBody:any){//pinchazo
        return this.http.put(`${this.apiUrl}/updateOrder/ride`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtGas(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/gas`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtRobber(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/robber`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtInjury(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/injury`,jsonBody,httpOptions).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }


}