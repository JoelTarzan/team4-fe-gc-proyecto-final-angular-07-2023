import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'https://aurum-backend-production.up.railway.app/';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {

    const userName = email;

    return this.http.post(this.endpoint + 'login', {
      userName,
      password
    }, this.httpOptions);
  }

  register(name:string, email: string, password: string): Observable<any> {

    return this.http.post(this.endpoint + 'users', {
      name,
      email,
      password,
      rating: 1,
      role: {
        id: 3
      }
    }, this.httpOptions)
  }
}