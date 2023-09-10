import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillCandidature } from '../models/skill-candidature';

@Injectable({
  providedIn: 'root'
})
export class SkillCandidatureService {

  endpoint: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  /* Endpoints Backend
  * === Get ===
  * /skillscandidatures
  * /skillscandidatures/{id}
  * /skillscandidatures/skill/{id}
  * /skillscandidatures/candidature/{id}
  * 
  * === Post ===
  * /skillscandidatures
  * 
  * === Put ===
  * /skillscandidatures/{id}
  * 
  * === Delete ===
  * /skillscandidatures/{id}
  */

  // === Get ===
  getAll(): Observable<SkillCandidature[]>{

    return this.http.get<SkillCandidature[]>(`${this.endpoint}skillscandidatures`);
  }

  getOneById(id: number): Observable<SkillCandidature>{

    return this.http.get<SkillCandidature>(`${this.endpoint}skillscandidatures/${id}`);
  }
  
  getByIdUser(idUser: number): Observable<SkillCandidature[]>{

    return this.http.get<SkillCandidature[]>(`${this.endpoint}skillscandidatures/skill/${idUser}`);
  }

  getByIdCandidature(idCandidature: number): Observable<SkillCandidature[]>{

    return this.http.get<SkillCandidature[]>(`${this.endpoint}skillscandidatures/candidature/${idCandidature}`);
  }

  // === Post ===

  create(skillCandidature: SkillCandidature): Observable<SkillCandidature>{
    return this.http.post<SkillCandidature>(`${this.endpoint}/skillscandidatures`, skillCandidature);
  }

  // === Put ===

  update(id: number, skillCandidature: SkillCandidature): Observable<SkillCandidature>{
    return this.http.put<SkillCandidature>(`${this.endpoint}/skillscandidatures/${id}`, skillCandidature);
  }

  //=== Delete ===

  delete(id: number){
    this.http.delete(`${this.endpoint}/skillscandidatures/${id}`);
  }
}