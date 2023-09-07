import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { IdUserOpenProcessService } from 'src/app/services/id-user-open-process.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { UsersService } from 'src/app/services/users.service';

interface Imagen {
  ruta: string;
  id: number;
}

@Component({
  selector: 'app-candidate-application',
  templateUrl: './candidate-application.component.html',
  styleUrls: ['./candidate-application.component.css']
})

export class CandidateApplicationComponent implements OnInit {

  idUser: number = 1;
  user: User | undefined;

  idCandidature: number = 1;
  candidature: any;

  processes: any;
  processStatus: string = "Entrevista";

  subscriptions:any;

  // Control para que mustre el input para añadir un proceso
  addProcessMode: boolean = false;



  constructor(
    private openProcessesService: OpenProcessesService,
    private candidaturesService: CandidaturesService,
    private usersService: UsersService,
    private idUserProcessService : IdUserOpenProcessService) {

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

    this.idUserProcessService.getSubscribeFindByUser_Process(this.idUser).subscribe((result: any) => {
      this.subscriptions = result;
      console.log(result);
    });


    
  }

  
  isSubscribed(processId: number): boolean {
    //Verifica que existe
    if (this.subscriptions && Array.isArray(this.subscriptions)) {
      return this.subscriptions.some((subscription: { id_open_processes: number; }) => subscription.id_open_processes === processId);
    } else {
      return false;
    }
  }

  isSubscribedChange(processId: any){
    if (this.subscriptions && Array.isArray(this.subscriptions)) {
      if(this.subscriptions.some((subscription: { id_open_processes: number; }) => subscription.id_open_processes === processId)){
        //borra en la base de datos desde Service
        this.idUserProcessService.removeSubscribeUserProcess(this.subscriptions.find((subscription: { id_open_processes: number; }) => subscription.id_open_processes === processId));
      }else{
        this.idUserProcessService.addSubscribeUserProcess ({id:99,id_open_processes: processId, id_user:this.idUser});
      }
    }
    this.idUserProcessService.getSubscribeFindByUser_Process(this.idUser).subscribe((result: any) => {
          this.subscriptions = result;
        });
  }
}
