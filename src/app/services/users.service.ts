import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:3000/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  endpoint: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient) { 
      
  }
  getUserInfo (id:any):any{
    return this.http.get(`${baseUrl}/${id}`);  
  }
  // Devuelve todos los usuarios
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint + 'users');
  }

  // Edita un usuario
  update(id: number, user: User): Observable<any> {
    return this.http.put(this.endpoint + 'users/' + id, user);
  }
}
