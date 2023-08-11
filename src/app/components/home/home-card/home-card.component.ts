import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() candidature: any;

  skillsCandidate: string[] = ['angular', 'html', 'css', 'java'];
  numSkillsReq: number = 0;
  numSkillsMatch: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.numSkillsReq = this.candidature.skills.length;

    // Mira las skills del candidato que coinciden con las requeridas de la candidatura
    this.numSkillsMatch = this.skillsCandidate.filter(skill => 
      this.candidature.skills.includes(skill)
    ).length;
    
  }
}
