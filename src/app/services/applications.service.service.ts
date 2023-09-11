import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApplicationsServiceService {

  endpoint: string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient) { 

  }

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.endpoint + 'applications');
  }

  getById(id: number): Observable<Application> {
    return this.http.get<Application>(this.endpoint + 'applications/' + id);
  }

  create(application : Application): Observable<Application> {
    return this.http.post<Application>(this.endpoint + 'applications', application);
  }

  update(id: number, application : Application): Observable<Application> {
    return this.http.put<Application>(this.endpoint + 'applications/' + id, application);
  }

  delete(id: number): Observable<Application> {
    return this.http.delete<Application>(this.endpoint + 'applications/' + id);
  }
}
