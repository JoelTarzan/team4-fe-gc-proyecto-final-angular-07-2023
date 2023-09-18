import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidature } from '../models/candidature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidaturesService {

  endpoint: string = 'https://aurum-backend-production.up.railway.app/';

  constructor(
    private http: HttpClient) { 

  }

  // Devuelve las candidaturas
  getAll(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures');
  }

  // Devuelve una candidatura
  getById(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(this.endpoint + 'candidatures/' + id);
  }

  create(candidature : Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.endpoint + 'candidatures', candidature);
  }

  update(id: number, candidature : Candidature): Observable<Candidature> {
    return this.http.put<Candidature>(this.endpoint + 'candidatures/' + id, candidature);
  }

  delete(id: number): Observable<Candidature> {
    return this.http.delete<Candidature>(this.endpoint + 'candidatures/' + id);
  }

  getAllNameASC(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/name-asc');
  }

  getAllNameDESC(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/name-desc');
  }

  getStartingWith(letters: string): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/search/' + letters);
  }

  getAllOrderOpen(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/order-open');
  }

  getAllOrderClose(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/order-close');
  }

  getAllOrderOpenStartingWith(letters:string): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/open/search/' + letters);
  }

  getAllOrderCloseStartingWith(letters:string): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/close/search/' + letters);
  }

  getAllOpen(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/open');
  }

  getAllClose(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.endpoint + 'candidatures/close');
  }
}