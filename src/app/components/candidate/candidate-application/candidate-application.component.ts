import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-candidate-application',
  templateUrl: './candidate-application.component.html',
  styleUrls: ['./candidate-application.component.css']
})
export class CandidateApplicationComponent implements OnInit {

  idUser: number = 5;
  user: User | undefined;

  idCandidature: number = 1;
  candidature: any;

  processes: any;
  processStatus: string = "Entrevista";

  // Control para que mustre el input para añadir un proceso
  addProcessMode: boolean = false;

  constructor(
    private openProcessesService: OpenProcessesService,
    private candidaturesService: CandidaturesService,
    private usersService: UsersService) {

  }

  ngOnInit(): void {
    
    this.openProcessesService.getExampleProgressBar().subscribe(result => {
      this.processes = result;
    });

    this.candidaturesService.getOneById(this.idCandidature).subscribe(result => {
      this.candidature = result;
    });

    this.usersService.getOneById(this.idUser).subscribe(result => {
      this.user = result;
    });

  }

}
