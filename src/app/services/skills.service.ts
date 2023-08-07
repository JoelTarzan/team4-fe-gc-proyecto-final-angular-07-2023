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

}
