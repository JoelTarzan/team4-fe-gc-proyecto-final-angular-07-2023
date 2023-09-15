import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application';
import { Candidature } from 'src/app/models/candidature';
import { OpenProcess } from 'src/app/models/open-process';
import { User } from 'src/app/models/user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { IdUserOpenProcessService } from 'src/app/services/id-user-open-process.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
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

  idApplication: number = 0;

  application: Application | undefined;
  user: User | undefined;
  candidature: Candidature | undefined;

  processes: OpenProcess[] = [];
  processStatus: string = "Entrevista";

  subscriptions:any;

  // Control para que mustre el input para añadir un proceso
  addProcessMode: boolean = false;

  constructor(
    private openProcessesService: OpenProcessesService,
    private candidaturesService: CandidaturesService,
    private usersService: UsersService,
    private idUserProcessService : IdUserOpenProcessService,
    private subscriptionsService: SubscriptionsService,
    private applicationsService: ApplicationsService,
    private routeActive: ActivatedRoute) {

  }

  ngOnInit(): void {
    /* Recoge la ruta atual y el parametro id */ 
    this.routeActive.params.subscribe(params => {
      this.idApplication = params['id'] || null;
      
      this.applicationsService.getById(this.idApplication).subscribe(result => {

        this.application = result;
        this.user = this.application.user;
        this.candidature = this.application.candidature;

        this.openProcessesService.getAllCandidatureAndUserByDateASC(this.candidature.id, this.user.id).subscribe(result => {
          this.processes = result;
        });
      });
    });

    this.subscriptionsService.getAllUser(this.user!.id).subscribe((result: any) => {
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
        this.subscriptionsService.delete(this.subscriptions.find((subscription: { id_open_processes: number; }) => subscription.id_open_processes === processId));
      }else{
        this.idUserProcessService.addSubscribeUserProcess ({id:99,id_open_processes: processId, id_user:this.user!.id});
      }
    }
    this.idUserProcessService.getSubscribeFindByUser_Process(this.user!.id).subscribe((result: any) => {
          this.subscriptions = result;
        });
  }
}
