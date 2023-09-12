import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesServiceService {

  endpoint: string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient){ 

  }

  /* Endpoints Backend
  * === Get ===
  * /roles
  * /roles/{id}
  * /roles/name/{name}
  * 
  * === Post ===
  * /roles
  * 
  * === Put ===
  * /roles/{id}
  * 
  * === Delete ===
  * /roles/{id}
  */

  // === Get ===
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.endpoint + 'roles');
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(this.endpoint + 'roles/' + id);
  }
  
  getByName(name: string): Observable<Role> {
    return this.http.get<Role>(this.endpoint + 'roles/name/' + name);
  }

  // === Post ===
  create(role : Role): Observable<Role> {
    return this.http.post<Role>(this.endpoint + 'roles', role);
  }

  // === Put ===
  update(id: number, role : Role): Observable<Role> {
    return this.http.put<Role>(this.endpoint + 'roles/' + id, role);
  }

  // === Delete ===
  delete(id: number): Observable<Role> {
    return this.http.delete<Role>(this.endpoint + 'roles/' + id);
  }

    
}
