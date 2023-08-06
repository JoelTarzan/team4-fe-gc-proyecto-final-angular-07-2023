import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const baseUrlCandidacy = 'http://localhost:3000/candidatura';
const baseUrlUser = 'http://localhost:3000/usuario';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  
  constructor( private http:HttpClient ) {}
  
  //get skills from one candidacy
  getSkillsCandidacy (id:any):any{
    return this.http.get(`${baseUrlCandidacy}/${id}`);
  }
  getSkillsUser (id:any):any{
    return this.http.get(`${baseUrlUser}/${id}`);
  }

  //add skills in Candidacy
  addSkillsCandidacy (id:any, data:any) {
    return this.http.post(`${baseUrlCandidacy}/${id}`,data);
  }
  addSkillsUser (id:any, data:any) {
    return this.http.post(`${baseUrlUser}/${id}`, data);
  }

  //delete skills in Candidacy
  removeSkillsCandidacy(id:any, skill:any) {
    return this.http.delete(`${baseUrlCandidacy}/${id}/skills/${skill}`);
  }
  removeSkillsUser (id:any, skill:any) {
    return this.http.delete(`${baseUrlUser}/${id}`);
  }

  confirmedSkill(id:any, skill:any, confirmation:any){
    console.log(`id:${id} skill:${skill} y confirmacion:${confirmation}`);
    return this.http.put(`${baseUrlCandidacy}/${id}/skills/${skill}/confirmation`, confirmation);

  }

}
