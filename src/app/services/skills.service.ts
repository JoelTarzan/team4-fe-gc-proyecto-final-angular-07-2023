import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';


const baseUrlCandidacy = 'http://localhost:3000/candidatures';
const baseUrlUser = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {

  skillsEndpoint: string = 'http://localhost:3000/skills';
  
  constructor( private http:HttpClient ) {}
  
  //get skills from one candidacy
  getSkillsCandidacy (id:any):any{
    return this.http.get(`${baseUrlCandidacy}/${id}`);
  }
  getSkillsUser (id:any):any{
    return this.http.get(`${baseUrlUser}/${id}`);
  }

  //add skills in Candidacy
  addSkillsCandidacy (data:any) {
    return this.http.put(`${baseUrlCandidacy}/${data.id}`,data);
  }
  addSkillsUser (data:any) {
    return this.http.put(`${baseUrlUser}/${data.id}`, data);
  }

  //delete skills in Candidacy
  removeSkillsCandidacy(data:any) {
    return this.http.put(`${baseUrlCandidacy}/${data.id}`, data);
  }
  removeSkillsUser (data:any) {
    return this.http.put(`${baseUrlUser}/${data.id}`, data);
  }

  confirmedSkill(skills:any){
    console.log(`id:${skills.id} skill:${skills.skills} y confirmacion:${skills.confirmation}`);
    return this.http.put(`${baseUrlCandidacy}/${skills.id}`, skills);

  }

  // Devuelve todas las skills
  getAllSkills() {
    return this.http.get<Skill[]>(this.skillsEndpoint);
  }

}
