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
import { TokenStorageService } from 'src/app/services/token-storage.service';
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

  userLogged: User | undefined;
  application: Application | undefined;
  candidate: User | undefined;
  candidature: Candidature | undefined;

  processes: OpenProcess[] = [];
  idCurrentProcess: number = 0;

  newOpenProcessName: string = '';
  newOpenProcessDate: string = '';

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
    private routeActive: ActivatedRoute, 
    private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    /* Recoge la ruta atual y el parametro id */ 
    this.routeActive.params.subscribe(params => {
      this.idApplication = params['id'] || null;
      
      // Buscamos la application y recogemos todos los datos necesarios
      this.applicationsService.getById(this.idApplication).subscribe(result => {

        this.application = result;
        this.candidate = this.application.user;
        this.candidature = this.application.candidature;

        this.idCurrentProcess = this.application.phase.id!;
        
        this.openProcessesService.getAllCandidatureAndUserByDateASC(this.candidature.id, this.candidate.id).subscribe(result => {
          this.processes = result;
        });
      });
    });

    // Buscamos las subscripciones de el usuario que esta logueado actualmente
    this.usersService.getOneById(this.tokenStorageService.getUser()).subscribe(result => {

      this.userLogged = result;
      
      this.subscriptionsService.getAllUser(this.userLogged.id).subscribe((result: any) => {
        this.subscriptions = result;
      });
    });
  }

  // Crea un proceso nuevo para esta application
  createOpenProcess() {
    let newOpenProcess = {
      candidature: this.candidature!,
      name: this.newOpenProcessName,
      date: this.newOpenProcessDate,
      user: this.candidate!,
      open: false
    }

    // Creamos el nuevo proceso
    this.openProcessesService.create(newOpenProcess).subscribe(() => {

      // Recargamos los procesos
      this.openProcessesService.getAllCandidatureAndUserByDateASC(this.candidature!.id, this.candidate!.id).subscribe(result => {
        this.processes = result;
      });

      this.newOpenProcessName = '';
      this.newOpenProcessDate = '';

      this.addProcessMode = false;
    });
  }

  // Borramos el proceso
  deleteOpenProcess(process: OpenProcess) {
    this.openProcessesService.delete(process.id!).subscribe(() => {

      // Recargamos los procesos
      this.openProcessesService.getAllCandidatureAndUserByDateASC(this.candidature!.id, this.candidate!.id).subscribe(result => {
        this.processes = result;
      });
    });
  }

  // Cambia el proceso actual
  changeCurrentProcess(process: OpenProcess) {
    this.idCurrentProcess = process.id!

    this.application!.phase = process;
    this.applicationsService.update(this.application!.id, this.application!).subscribe();
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
        this.idUserProcessService.addSubscribeUserProcess ({id:99,id_open_processes: processId, id_user:this.userLogged!.id});
      }
    }
    this.idUserProcessService.getSubscribeFindByUser_Process(this.userLogged!.id).subscribe((result: any) => {
          this.subscriptions = result;
        });
  }
}
