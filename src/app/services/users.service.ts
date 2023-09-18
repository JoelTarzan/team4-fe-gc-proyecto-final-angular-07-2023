import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

  constructor(
    private http: HttpClient) { 
      
  }
  /* Endpoints Backend
  * === Get ===
  * /users
  * /users/{id}
  * /users/name-asc
  * /users/name-desc
  * /users/search/{letters}
  * /users/role/{rolename}/name-asc
  * /users/role/{rolename}/name-desc
  * /users/search/{letters}
  * /users/role/{rolename}/search/{letters}
  * 
  * === Post ===
  * /users
  * /users/role/name-asc
  * /users/role/name-desc
  * /users/role/search/{letters}
  * /candidates/skills/name-asc
  * /candidates/skills/name-desc
  * /candidates/skills/search/{letters}
  * 
  * === Put ===
  * /users/{id}
  * /change-password/{id}/{newPassword}
  * 
  * === Delete ===
  * /users/{id}
  */
  
  endpoint: string = 'http://localhost:8080/';
  
  //Endpoints Backend
  
  // === Get ===
  // Devuelve todos los usuarios
  getAll(): Observable<User[]> {
    
    return this.http.get<User[]>(`${this.endpoint}users`);
  }

  // Devuelve todos los usuarios con el nombre en oreden Descente
  getAllNameDesc(): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}users/name-desc`);
  }

  // Devuelve todos los usuarios con el nombre en oreden Ascendente
  getAllNameAsc(): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}users/name-asc`);
  }

  // Devuelve todos los usuarios ordenados por rol
  getAllOrderByRole(): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}users/role`);
  }

  // Devuelve todos los usuarios con un rol, ordenados alfabeticamente de forma Ascendente
  getAllByRoleNameAsc(rolename: string): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}users/role/${rolename}/name-asc`);
  }

  // Devuelve todos los usuarios con un rol, ordenados alfabeticamente de forma Descendente
  getAllByRoleNameDesc(rolename: string): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}users/role/${rolename}/name-desc`);
  }

  // Devuelve todos los usuarios que empiezan por X letras
  getAllStartingWith(letters: string){

    return this.http.get<User[]>(`${this.endpoint}users/search/${letters}`);
  }

  // Devuelve todos los usuarios con un rol que empiezan por X letras
  getAllByRoleStartingWith(rolename: string, letters: string): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}users/role/${rolename}/search/${letters}`);
  }

  // Devuelve un solo usuario por id
  getOneById(id: number): Observable<User>{

    return this.http.get<User>(`${this.endpoint}users/${id}`);
  }
  
  // Devuelve un solo usuario por email
  getOneByEmail(email: string) {
  
    return this.http.get<User>(`${this.endpoint}users/email/${email}`);
  }

  // === Post ===
  //Crea un nuevo usuario
  create(user : User): Observable<User>{

    return this.http.post<User>(`${this.endpoint}users`, user);
  }

  // Devuelve los candidatos con X skills, ordenados alfabeticamente de forma ascendente
  getCandidatesWithSkillsNameAsc(skills: Skill[]): Observable<User[]> {

    return this.http.post<User[]>(`${this.endpoint}candidates/skills/name-asc`, skills);
  }

  // Devuelve los candidatos con X skills, ordenados alfabeticamente de forma descendente
  getCandidatesWithSkillsNameDesc(skills: Skill[]): Observable<User[]> {

    return this.http.post<User[]>(`${this.endpoint}candidates/skills/name-desc`, skills);
  }

  // Devuelve los candidatos con X skills, que empiezan por X letras
  getCandidatesWithSkillsStartingWith(letters: string, skills: Skill[]): Observable<User[]> {

    return this.http.post<User[]>(`${this.endpoint}candidates/skills/search/${letters}`, skills);
  }

  // === Put ===
  // Edita un usuario
  update(id: number, user: User): Observable<User> {

    return this.http.put<User>(`${this.endpoint}users/${id}`, user);
  }

  changePassword(id: number, user: User): Observable<User> {

    return this.http.put<User>(`${this.endpoint}change-password/${id}`, user);
  }

  // === Delete ===
  // Borra usuario
  delete(id: number): Observable<User> {
    
    return this.http.delete<User>(`${this.endpoint}users/${id}`);
  }
}