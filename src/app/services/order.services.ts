import { Injectable , NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, of, Subject } from 'rxjs';
import {Router} from '@angular/router';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('accestoken')
    })
  }
  //console.log(httpOptions)
@Injectable({
    providedIn: 'root'
  })

export class OrderServices{
    httpOptionApi = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accestoken')
          })
    };
    login(user, password){
        let userinfo = {user:user,password:password}
    
    }
    private _refresh$ = new Subject<void>()
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
        this.httpOptionApi={
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('accestoken')
              })
        }
    }
    
    postCreateUser(jsonBody:any){
        console.log(jsonBody)
        return this.http.post(`${this.apiUrl}/createUser/`,jsonBody,this.httpOptionApi).pipe(
         
            catchError(this.handleError)
        );
    }

    postlogin(jsonBody:any){
        console.log(jsonBody)
        return this.http.post(`${this.apiUrl}/signin/`,jsonBody,this.httpOptionApi).pipe(
         
            catchError(this.handleError)
        );
    }
    getOrders(storeId, typeorder):Observable<any>{
        return this.http.get(`${this.apiUrl}/ordersByStoreAndType/${storeId}/${typeorder}`,this.httpOptionApi).pipe(
            //catchError(this.handleError)
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderDetail(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/detailsOrdene/${orderId}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderAssing(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderAssing/${orderId}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderRute(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderRute/${orderId}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderSite(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderSite/${orderId}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderDelivered(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderDelivered/${orderId}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    orderEmergency(orderId:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/orderEmergency/${orderId}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    sabergetOrdersBiker(Idbiker:any,jsonBody:any){
        return this.http.post(`${this.apiUrl}/detailsOrderBiker/${Idbiker}`,JSON.stringify(jsonBody),this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    getAvailableBikers(typeUser:any){
        return this.http.get(`${this.apiUrl}/getAvailablePilots/${typeUser}`,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    getAvailableCoord(typeUser:any){
        return this.http.get(`${this.apiUrl}/getAvailablePilots/${typeUser}`,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    addUserbikerStore(jsonBody:any){
        return this.http.post(`${this.apiUrl}/assignPilotToStore/`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    
    deleteUserbikerStore(jsonBody:any){
        return this.http.delete(`${this.apiUrl}/disablePilotFromStore/${jsonBody.userId}/${jsonBody.storeId}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    
    getUserBikerStore(storeId){
        return this.http.get(`${this.apiUrl}/getAssignedPilotsByStore/${storeId}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    getUserAllStore(usetType){
        return this.http.get(`${this.apiUrl}/getAssignedUsersToStore/${usetType}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    informationOrder(idOrder){
        return this.http.get(`${this.apiUrl}/informationOrder/${idOrder}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    bikerAvailableToOrder(storeId){
        return this.http.get(`${this.apiUrl}/getAvailablePilotsToOrder/${storeId}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    assingBikertoOrder(jsonBody:any){
        return this.http.post(`${this.apiUrl}/assignPilotToOrder/`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    
    orderByBiker(storeId,userId){

        return this.http.get(`${this.apiUrl}/ordersByStoreAndPilot/${storeId}/${userId}`,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
                
            
            })
        );
    }

    getAllStore(){
        return this.http.get(`${this.apiUrl}/getAllStores/`,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    /**Metodos de motoristas */
    crtInroute(jsonBody:any){
        console.log(jsonBody)
        return this.http.put(`${this.apiUrl}/updateOrder/route`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError(404);
                
            
            })
            )
    }
    crtInsite(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/site`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtInDelivered(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/delivered`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtInRide(jsonBody:any){//pinchazo
        return this.http.put(`${this.apiUrl}/updateOrder/ride`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtGas(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/gas`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtRobber(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/robber`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }
    crtInjury(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateOrder/injury`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    closed(jsonBody:any){
        console.log(jsonBody)
        return this.http.put(`${this.apiUrl}/updateOrder/closed`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
            )
    }

    ////aloha
    sendAloha(orderId){
            return this.http.post(`${this.apiUrl}/setOrderToAlohaById/${orderId}`,{},this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    testAloha(orderId){
        return this.http.get(`${this.apiUrl}/getRawAndMiddlewareOrder/${orderId}`,this.httpOptionApi).pipe(
            catchError(err =>{
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    creaToEnterprise(jsonBody:any){
        return this.http.post(`${this.apiUrl}/createEnterprise/`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    allUsermdw(){
        return this.http.get(`${this.apiUrl}/getAllUsers/`,this.httpOptionApi).pipe(
            catchError(err =>{
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    updatePassword(jsonBody:any){
        return this.http.put(`${this.apiUrl}/updateUserPass`,jsonBody,this.httpOptionApi).pipe(
            catchError(err =>{
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    getAllEnterprise(){
        return this.http.get(`${this.apiUrl}/getAllEnterprises`,this.httpOptionApi).pipe(
            catchError(err =>{
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    getAllOrdersStatus(){
        return this.http.get(`${this.apiUrl}/getAllMiddlewareOrders`,this.httpOptionApi).pipe(
            catchError(err =>{
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    
    getDetalleListaReport(storeId,dateOrder){
        return this.http.get(`${this.apiUrl}/getAllAssignedMdwOrdersByDay/${storeId}/${dateOrder}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    listViiew(storeId,status,dateInit,dateEnd){
        return this.http.get(`${this.apiUrl}/getAllMiddlewareOrdersByStore/${storeId}/${status}/${dateInit}/${dateEnd}`,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again no entrego nada.');
            })
        );
    }

    ordersList(storeId){
        return this.http.get(`${this.apiUrl}/ordersByStoreWithoutType/${storeId}`,this.httpOptionApi).pipe(
            //catchError(this.handleError)
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    ListComplete(storeId,dateEnd){
        return this.http.get(`${this.apiUrl}/getAllDeliveredMdwOrdersByDay/${storeId}/${dateEnd}`,this.httpOptionApi).pipe(
            //catchError(this.handleError)
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
    }

    removeOrder(orderId){
        return this.http.put(`${this.apiUrl}/updateOrderToClosed/${orderId}`,null,this.httpOptionApi).pipe(
            catchError(err =>{
                this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
            })
        );
    }

    stepBiker(numberOrder,storeId){
        return this.http.get(`${this.apiUrl}/informationOrderAndPilotHistoryByOriginOrderId/${numberOrder}/${storeId}`,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
        
    }

    allUserUpdate(){
        return this.http.get(`${this.apiUrl}/getAllUsers/`,this.httpOptionApi).pipe(
            catchError(err =>{
                //this.router.navigate(['login'])
                console.error(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
                return throwError('Something bad happened. Please try again later.');
                
            
            })
        );
        
    }
}