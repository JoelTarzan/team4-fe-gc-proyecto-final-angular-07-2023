import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenProcess } from '../models/open-process';

@Injectable({
  providedIn: 'root'
})
export class OpenProcessesService {

  endpoint: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  // Devuelve los procesos abiertos
  getOpenProcesses() {
    return this.http.get<OpenProcess[]>(this.endpoint + 'open-processes');
  }

  // Devuelve los procesos abiertos de ejemplo para la barra de progreso - SOLO SON DE EJEMPLO TEMPORALMENTE
  getExampleProgressBar() {
    return this.http.get(this.endpoint + 'progress-bar');
  }
}