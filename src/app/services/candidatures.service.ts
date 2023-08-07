import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidaturesService {

  endpoint: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient) { 

  }

  // Devuelve las candidaturas
  getCandidatures() {
    return this.http.get(this.endpoint + 'candidatures');
  }

}