import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillUser } from '../models/skill-user';

@Injectable({
  providedIn: 'root'
})
export class SkillUserService {
  endpoint: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  /* Endpoints Backend
  * === Get ===
  * /skillsusers
  * /skillsusers/{id}
  * /skillsusers/user/{userid}
  * /skillsusers/skill/{skillid}
  * /skillsusers/user/{userid}/skill/{skillid}
  * 
  * === Post ===
  * /skillsusers
  * 
  * === Put ===
  * /skillsusers/{id}
  * 
  * === Delete ===
  * /skillsusers/{id}
  */

  // === Get ===

  getAll(): Observable<SkillUser[]> {

    return this.http.get<SkillUser[]>(`${this.endpoint}skillsusers`);
  }

  getOneById(id: number): Observable<SkillUser> {

    return this.http.get<SkillUser>(`${this.endpoint}skillsusers/${id}`);
  }

  getByIdUser(idUser: number): Observable<SkillUser[]> {

    return this.http.get<SkillUser[]>(`${this.endpoint}skillsusers/${idUser}`);
  }

  getByIdSkill(idSkill: number): Observable<SkillUser[]> {

    return this.http.get<SkillUser[]>(`${this.endpoint}skillsusers/${idSkill}`);
  }

  getOneByIdSkillandIdUser(idSkill: number, idUser: number): Observable<SkillUser>{

    return this.http.get<SkillUser>(`${this.endpoint}/skillsusers/user/${idUser}/skill/${idSkill}`);
  }

  // === Post ===

  create(skillUser: SkillUser): Observable<SkillUser>{
    return this.http.post<SkillUser>(`${this.endpoint}/skillsusers`, skillUser);
  }

  // === Put ===

  update(skillUser: SkillUser, id: number): Observable<SkillUser>{
    return this.http.put<SkillUser>(`${this.endpoint}/skillsusers/${id}`, skillUser);
  }

  // === Delete ===
  delete(id: number){
    this.http.delete(`${this.endpoint}/skillsusers/${id}`);
  }
}