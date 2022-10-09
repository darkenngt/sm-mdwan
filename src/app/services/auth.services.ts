
import { NgLocaleLocalization } from '@angular/common';
import { Injectable , NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

@Injectable({
    providedIn: 'root'
  })

  export class AuthService {
    httpOptionApi = {};
    login(user, password){
        let userinfo = {user:user,password:password}
        localStorage.setItem('UserKey',JSON.stringify(userinfo))
    }
    constructor(private http: HttpClient){
        this.httpOptionApi={headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('UserKey')
          })}
    }
  }
