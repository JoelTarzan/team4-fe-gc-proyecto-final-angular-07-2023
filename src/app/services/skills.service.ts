import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {

  endpoint: string = 'https://aurum-backend-production.up.railway.app/';
  
  constructor( private http:HttpClient ) {}
  /* Endpoints Backend
  * === Get ===
  * /skills
  * /skills/{id}
  * /skills/name/{name}
  * 
  * === Post ===
  * /skills
  * 
  * === Put ===
  * /skills/{id}
  * 
  * === Delete ===
  * /skills/{id}
  */
  
  // === Get ===
  // Devuelve todos los skills
  getAll(){

    return this.http.get<Skill[]>(`${this.endpoint}skills`);
  }

  // Devuelve una skill por id
  getOneById(id: number): Observable<Skill>{

    return this.http.get<Skill>(`${this.endpoint}skills/${id}`);
  }

  // Devuelve una skill por nombre
  getOneByName(name: String): Observable<Skill>{

    return this.http.get<Skill>(`${this.endpoint}skills/name/${name}`);
  }

  // === Post ===
  // Crea una nueva skill
  create(skill: Skill): Observable<Skill>{

    return this.http.post<Skill>(`${this.endpoint}skills`, skill);
  }

  // === Put === /skills/{id}

  update(id: number, skill: Skill): Observable<Skill> {

    return this.http.put<Skill>(`${this.endpoint}skills/${id}`, skill);
  }

  // === Delete ===
  delete(id: number): Observable<Skill>{

    return this.http.delete<Skill>(`${this.endpoint}skills/${id}`)
  }
}
