
import { NgLocaleLocalization } from '@angular/common';
import { Injectable , NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError, Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

@Injectable({
    providedIn: 'root'
  })

  export class AuthService {
    httpOptionApi = {};
    login(user, password){
        let userinfo = {user:user,password:password}
    
    }
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
      apiUrl = "https://middleware.sanmartinbakery.com/orders/v1";
      //apiUrl = "http://localhost/orders/v1";
    constructor(private http: HttpClient){
        this.httpOptionApi={headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('UserKey')
          })}
    }

    postlogin(jsonBody:any){
      return this.http.post(`${this.apiUrl}/signin/`,jsonBody,httpOptions).pipe(
       
          catchError(this.handleError)
      );
  }
  }
