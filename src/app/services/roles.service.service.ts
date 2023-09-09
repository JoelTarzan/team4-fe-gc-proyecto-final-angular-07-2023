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

    getAll(): Observable<Role[]> {
      return this.http.get<Role[]>(this.endpoint + 'roles');
    }

    getById(id: number): Observable<Role> {
      return this.http.get<Role>(this.endpoint + 'roles/' + id);
    }

    create(role : Role): Observable<Role> {
      return this.http.post<Role>(this.endpoint + 'roles', role);
    }

    update(id: number, role : Role): Observable<Role> {
      return this.http.put<Role>(this.endpoint + 'roles/' + id, role);
    }

    delete(id: number): Observable<Role> {
      return this.http.delete<Role>(this.endpoint + 'roles/' + id);
    }

    getByName(name: string): Observable<Role> {
      return this.http.get<Role>(this.endpoint + 'roles/name/' + name);
    }
}
