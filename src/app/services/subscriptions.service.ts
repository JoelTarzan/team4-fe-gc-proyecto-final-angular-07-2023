import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../models/subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  endpoint: string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient) { 

  }

  /* Endpoints Backend
  * === Get ===
  * /subscriptions
  * /subscriptions/{id}
  * /subscriptions/open-process/{id}
  * /subscriptions/user/{id}
  * 
  * === Post ===
  * /subscriptions
  * 
  * === Put ===
  * /subscriptions/{id}
  * 
  * === Delete ===
  * /subscriptions/{id}
  */

  // === Get ===
  getAll(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.endpoint + 'subscriptions');
  }

  getById(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(this.endpoint + 'subscriptions/' + id);
  }

  getAllOpenProcess(idOpenProcesses:number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.endpoint + 'subscriptions/open-process/' + idOpenProcesses);
  }

  getAllUser(idUser:number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.endpoint + 'subscriptions/user/' + idUser);
  }

  // === POST ===
  create(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.endpoint + 'subscriptions', subscription);
  }

  // === PUT ===
  update(id: number, subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(this.endpoint + 'subscriptions/' + id, subscription);
  }

  // === DELETE ===
  delete(id: number): Observable<Subscription> {
    return this.http.delete<Subscription>(this.endpoint + 'subscriptions/' + id);
  }

    
}
