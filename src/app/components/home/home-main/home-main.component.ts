import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/models/candidature';
import { Skill } from 'src/app/models/skill';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { SkillUserService } from 'src/app/services/skill-user.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  //Variable para cambiar (simula el usuario que esta registrado a falta de tener el sesion storage)
  iduser: number = 1;

  candidatures!: Candidature[];
  numberOfCandidatures: number = 0;

  //Recoge las skills del candidato para pasarlo en la comprobacion de la candidatura
  //skillsCandidate!: SkillUser[];
  skillsUser!: Skill[];
  
  constructor(
    private candidaturesService: CandidaturesService,
    private skillUserService: SkillUserService) {

  }

  ngOnInit(): void {
    this.candidaturesService.getAll().subscribe((result: Candidature[]) => {
      this.candidatures = result;
      this.numberOfCandidatures = this.candidatures.length; 
    });

    //Obtiene el Array (Skill[]) del usuario/candidato para enviarlo al componente hijo
    //Home-card (este muestra el contenido de la candidatura).
    //Esto se hace para no hacer tantas llamadas desde el card cuando se puede hacer 
    //solo una vez desde el componente padre (ralentizaba la muestra de datos)
    this.skillUserService.getByIdUsermapSkills(this.iduser).subscribe((result: Skill[]) => {
      this.skillsUser = result;
    });
  }

}
