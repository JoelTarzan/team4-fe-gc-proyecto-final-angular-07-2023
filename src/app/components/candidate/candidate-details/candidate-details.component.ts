import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {

  name: string = "Laura";
  lastname: string = "Tarzán Jane";
  email: string = "laura@madeupmail.com";
  tel: string = "644 288 990";
  title: string = "Programadora Full Stack";
  linkedin: string = "https://www.linkedin.com/in/laura-tarzán-a778a6184/";
  web: string = "https://www.laura.com/inicio";
  notes: string = "Notas del usuario de RH sobre el candidato, solo visible para el rol de RH. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  skills: string = "Habilidades del candidato regogidas de su perfil.";
  description: string = "Descripción del candidato escrita por él y recogida de su perfil. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  activeTab: number = 1; // Pestaña activa por defecto

  constructor() {

  }

  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  
}
