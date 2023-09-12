import { Component, Input, OnInit } from '@angular/core';
import { Candidature } from 'src/app/models/candidature';
import { Skill } from 'src/app/models/skill';
import { SkillCandidatureService } from 'src/app/services/skill-candidature.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  //Trae la candidatura 
  @Input() candidature!: Candidature;
  
  //Trae la lista de skills del usuario
  //@Input() candidateSkills!: SkillUser[];
  @Input() skillsUser!: Skill[];

  //Guarda las skills de la candidatura
  skillsCandidature!: Skill[];
  //skillsUser!: Skill[];

  numSkillsReq: number = 0;
  numSkillsMatch: number = 0;

  constructor(private skillCandidature: SkillCandidatureService) {
  }

  ngOnInit(): void {

    //Se llama al servicio para recibir una lista de (skill[]) que forman parte de la candidatura
    this.skillCandidature.getByIdUsermapSkills(this.candidature.id).subscribe((result: Skill[]) => {

      //Cuantos skills tiene candidatura
      this.numSkillsReq = result.length; 
      //Guarda (skill[]) de candidature
      this.skillsCandidature = result;

      //Compara entre Array (skill[]) Candidature con el Array (skill[]) de User
      //Obtiene el numero de coincidencias
      this.numSkillsMatch = this.skillsCandidature.filter(item1 =>
        this.skillsUser.some(item2 => item2.id === item1.id)
      ).length;
    });

  }
}
