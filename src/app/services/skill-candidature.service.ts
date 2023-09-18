import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SkillCandidature } from '../models/skill-candidature';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillCandidatureService {

  endpoint: string = 'https://aurum-backend-production.up.railway.app/';

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
  
  getByIdSkill(idSkill: number): Observable<SkillCandidature[]>{

    return this.http.get<SkillCandidature[]>(`${this.endpoint}skillscandidatures/skill/${idSkill}`);
  }

  getByIdCandidature(idCandidature: number): Observable<SkillCandidature[]>{

    return this.http.get<SkillCandidature[]>(`${this.endpoint}skillscandidatures/candidature/${idCandidature}`);
  }

  // Mapear la respuesta para obtener solo el array de skills
  getByIdUsermapSkills(idCandidature: number): Observable<Skill[]> {

    return this.http.get<SkillCandidature[]>(`${this.endpoint}skillscandidatures/candidature/${idCandidature}`).pipe(
      map(response => {
        
        return response.map(Candidature => Candidature.skill);
      })
    );
  }

  

  // === Post ===

  create(skillCandidature: SkillCandidature): Observable<SkillCandidature>{
    return this.http.post<SkillCandidature>(`${this.endpoint}skillscandidatures`, skillCandidature);
  }

  // === Put ===

  update(id: number, skillCandidature: SkillCandidature): Observable<SkillCandidature>{
    return this.http.put<SkillCandidature>(`${this.endpoint}skillscandidatures/${id}`, skillCandidature);
  }

  //=== Delete ===

  delete(id: number): Observable<SkillCandidature>{

    return this.http.delete<SkillCandidature>(`${this.endpoint}skillscandidatures/${id}`);
  }
}
