import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const baseUrl = 'http://localhost:3000/list-postulated';

@Injectable({
  providedIn: 'root'
})
export class UsersCandidacyService {

  constructor(private http:HttpClient) { }

  getIdUsers (id:any): Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}?idCandidature=${id}`).pipe(
        map((response) => {
          return response
        })
      )
  }

  getIdUserSpecific(idUser:any, idCandidacy:any): Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}?idCandidature=${idCandidacy}&idPostulatedUser=${idUser}`).pipe(
        map((response) => {
          return response
        })
      );
  }
}

