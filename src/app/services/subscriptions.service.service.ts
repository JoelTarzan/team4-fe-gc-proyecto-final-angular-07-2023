import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../models/subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsServiceService {

  endpoint: string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient) { 

  }

    getAll(): Observable<Subscription[]> {
      return this.http.get<Subscription[]>(this.endpoint + 'subscriptions');
    }
  
    getById(id: number): Observable<Subscription> {
      return this.http.get<Subscription>(this.endpoint + 'subscriptions/' + id);
    }
  
    create(subscription: Subscription): Observable<Subscription> {
      return this.http.post<Subscription>(this.endpoint + 'subscriptions', subscription);
    }
  
    update(id: number, subscription: Subscription): Observable<Subscription> {
      return this.http.put<Subscription>(this.endpoint + 'subscriptions/' + id, subscription);
    }
  
    delete(id: number): Observable<Subscription> {
      return this.http.delete<Subscription>(this.endpoint + 'subscriptions/' + id);
    }

    getAllOpenProcess(id:number): Observable<Subscription[]> {
      return this.http.get<Subscription[]>(this.endpoint + 'subscriptions/open-process/' + id);
    }

    getAllUser(id:number): Observable<Subscription[]> {
      return this.http.get<Subscription[]>(this.endpoint + 'subscriptions/user/' + id);
    }
}
