import { Injectable , NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError, Observable, of } from 'rxjs';



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

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
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
      }
      //apiUrl = "https://middleware.sanmartinbakery.com/orders/v1";
    apiUrl = "http://localhost/orders/v1";
    constructor(private http: HttpClient){
        
    }

    getOrders(storeId, typeorder){
        return this.http.get(`${this.apiUrl}/ordersByStoreAndType/${storeId}/${typeorder}`).pipe(
            catchError(this.handleError)
        );
    }

    orderDetail(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/detailsOrdene/${orderId}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    orderAssing(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderAssing/${orderId}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    orderRute(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderRute/${orderId}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    orderSite(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderSite/${orderId}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    orderDelivered(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderDelivered/${orderId}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    orderEmergency(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderEmergency/${orderId}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    getOrdersBiker(Idbiker:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/detailsOrderBiker/${Idbiker}`,JSON.stringify(jsonBody)).pipe(
            catchError(this.handleError)
        );
    }

    getAvailableBickers(){
        return this.http.get(`${this.apiUrl}/getAvailablePilots`).pipe(
            catchError(this.handleError))
    }

    addUserbikerStore(jsonBody:any){
        return this.http.post(`${this.apiUrl}/assignPilotToStore/`,jsonBody).pipe(
            catchError(this.handleError))
    }

    
    deleteUserbikerStore(jsonBody:any){
        return this.http.delete(`${this.apiUrl}/disablePilotFromStore/${jsonBody.userId}/${jsonBody.storeId}`).pipe(
            catchError(this.handleError))
    }
    
    getUserBikerStore(storeId){
        return this.http.get(`${this.apiUrl}/getAssignedPilotsByStore/${storeId}`).pipe(
            catchError(this.handleError)
        );
    }

    informationOrder(idOrder){
        return this.http.get(`${this.apiUrl}/informationOrder/${idOrder}`).pipe(
            catchError(this.handleError)
        );
    }

    bikerAvailableToOrder(idOrder){
        return this.http.get(`${this.apiUrl}/getPilotsToOrder/${idOrder}`).pipe(
            catchError(this.handleError)
        );
    }

    assingBikertoOrder(jsonBody:any){
        return this.http.post(`${this.apiUrl}/assignPilotToOrder/`,jsonBody).pipe(
            catchError(this.handleError))
    }

}