import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { Candidature } from '../models/candidature';


@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  endpoint: string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient) { 

  }

  /* Endpoints Backend
  * === Get ===
  * /applications
  * /applications/{id}
  * /applications/user/{id}
  * /applications/candidature/{id}
  * /applications/user/{userid}/candidature/{candidatureid}
  * 
  * === Post ===
  * /applications
  * 
  * === Put ===
  * /applications/{id}
  * 
  * === Delete ===
  * /applications/{id}
  */

  // === Get ===

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.endpoint}applications`);
  }

  getById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.endpoint}applications/${id}`);
  }

  getByIdUser(idUser: number): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.endpoint}applications/user/${idUser}`);
  }

  getByIdCandidature(idCandidature: number): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.endpoint}applications/candidature/${idCandidature}`);
  }

  // Mapear la respuesta para obtener solo el array de skills
  getByIdCandidaturemapUsers(idCandidature: number): Observable<User[]> {

    return this.http.get<Application[]>(`${this.endpoint}applications/candidature/${idCandidature}`).pipe(
      map(response => {
        
        return response.map(Candidature => Candidature.user);
      })
    );
  }

  // Mapear la respuesta para obtener solo el array de skills
  getByIdUserMapCandidatures(idUser: number): Observable<Candidature[]> {

    return this.http.get<Application[]>(`${this.endpoint}applications/user/${idUser}`).pipe(
      map(response => {

        return response.map(user => user.candidature);
      })
    );
  }
  
  getOneByIdCandidatureandIdUser(idUser: number, idCandidature: number): Observable<Application>{
    return this.http.get<Application>(`${this.endpoint}applications/user/${idUser}/candidature/${idCandidature}`);
  }

  

  // === Post ===

  create(application : Application): Observable<Application> {
    return this.http.post<Application>(this.endpoint + 'applications', application);
  }

  // === Put ===

  update(id: number, application : Application): Observable<Application> {
    return this.http.put<Application>(this.endpoint + 'applications/' + id, application);
  }

  // === Delete ===

  delete(id: number): Observable<Application> {
    return this.http.delete<Application>(this.endpoint + 'applications/' + id);
  }


}
