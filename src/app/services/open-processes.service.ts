import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenProcess } from '../models/open-process';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenProcessesService {

  endpoint: string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) { }

  // Devuelve los procesos abiertos
  getAll(): Observable<OpenProcess[]> {
    return this.http.get<OpenProcess[]>(this.endpoint + 'openprocesses');
  }

  // Devuelve los procesos abiertos de ejemplo para la barra de progreso - SOLO SON DE EJEMPLO TEMPORALMENTE
  getExampleProgressBar() {
    return this.http.get(this.endpoint + 'progress-bar');
  }

  getById(id: number): Observable<OpenProcess> {
    return this.http.get<OpenProcess>(this.endpoint + 'openprocesses/' + id);
  }

  create(openprocess: OpenProcess): Observable<OpenProcess> {
    return this.http.post<OpenProcess>(this.endpoint + 'openprocesses', openprocess);
  }

  update(id: number, openprocess: OpenProcess): Observable<OpenProcess> {
    return this.http.put<OpenProcess>(this.endpoint + 'openprocesses/' + id, openprocess);
  }

  delete(id: number): Observable<OpenProcess> {
    return this.http.delete<OpenProcess>(this.endpoint + 'openprocesses/' + id);
  }

  getAllUser(id: number): Observable<OpenProcess[]> {
    return this.http.get<OpenProcess[]>(this.endpoint + 'openprocesses/user/' + id);
  }

  getAllDateASC(): Observable<OpenProcess[]> {
    return this.http.get<OpenProcess[]>(this.endpoint + 'openprocesses/date-asc');
  }

  getAllDateDESC(): Observable<OpenProcess[]> {
    return this.http.get<OpenProcess[]>(this.endpoint + 'openprocesses/date-desc');
  }

  getAllCandidatureAndUserByDateASC(candidatureid: number, userid: number): Observable<OpenProcess[]> {
    return this.http.get<OpenProcess[]>(this.endpoint + 'openprocesses/candidature/' + candidatureid + '/user/' + userid + '/date-asc');
  }

  getAllCandidatureAndUserByDateDESC(candidatureid: number, userid: number): Observable<OpenProcess[]> {
    return this.http.get<OpenProcess[]>(this.endpoint + 'openprocesses/candidature/' + candidatureid + '/user/' + userid + '/date-desc');
  }
}