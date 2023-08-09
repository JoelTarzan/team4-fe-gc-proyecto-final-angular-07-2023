import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:3000/candidarura-detalle';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  constructor(private http:HttpClient) { }

  getDataCandidacy (id:any):any{
    return this.http.get(`${baseUrl}/${id}`);
  }
}
