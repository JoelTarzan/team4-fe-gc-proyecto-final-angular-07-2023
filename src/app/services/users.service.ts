import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

  constructor(
    private http: HttpClient) { 
      
  }
  /* Endpoints Backend
  * === Get ===
  * /users
  * /users/{id}
  * /users/name-asc
  * /users/name-desc
  * /users/search/{letters}
  * 
  * === Post ===
  * /users
  * /users/role/name-asc
  * /users/role/name-desc
  * /users/role/search/{letters}
  * /candidates/skills/name-asc
  * /candidates/skills/name-desc
  * /candidates/skills/search/{letters}
  * 
  * === Put ===
  * /users/{id}
  * 
  * === Delete ===
  * /users/{id}
  */
  
  endpoint: string = 'http://localhost:8080/';
  
  //Endpoints Backend
  
  // === Get ===
  // Devuelve todos los usuarios
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endpoint}users`);
  }

  // Devuelve todos los usuarios con el nombre en oreden Descente
  getAllNameDesc(): Observable<any> {
    return this.http.get<User[]>(`${this.endpoint}users/name-desc`);
  }

  // Devuelve todos los usuarios con el nombre en oreden Descente
  getAllNameAsc(): Observable<any> {
    return this.http.get<User[]>(`${this.endpoint}/users/name-asc`);
  }

  // Devuelve un solo usuario por id
  getOneById(id: number) {
    return this.http.get<User>(`${this.endpoint}users/${id}`);
  }

  // === Post ===
  //Crea un nuevo usuario
  create(user : User){
    return this.http.post<User>(`${this.endpoint}users`, user);
  }

  // Edita un usuario
  /* roleNomAsc(role: Role): Observable<any> {
    return this.http.put(`${this.endpoint}users/${id}`, user);
  } */


  // === Put ===
  // Edita un usuario
  update(id: number, user: User): Observable<any> {
    return this.http.put(`${this.endpoint}users/${id}`, user);
  }

  // === Delete ===
  // Borra usuario
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}users/${id}`);
  }
}
