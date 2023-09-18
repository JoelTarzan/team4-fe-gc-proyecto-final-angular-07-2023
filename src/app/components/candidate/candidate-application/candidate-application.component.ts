import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application';
import { Candidature } from 'src/app/models/candidature';
import { OpenProcess } from 'src/app/models/open-process';
import { Subscription } from 'src/app/models/subscription';
import { User } from 'src/app/models/user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

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

  subscriptions: Subscription[] = [];

  // Control para que mustre el input para añadir un proceso
  addProcessMode: boolean = false;

  constructor(
    private openProcessesService: OpenProcessesService,
    private usersService: UsersService,
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
  
  // Verifica si el usuario esta subscrito
  isSubscribed(processId: number): boolean {

    let result = false;

    this.subscriptions.forEach(subscription => {
      if (subscription.openProcess.id == processId) {
        result = true;
      }
    });
    
    return result;
  }

  // Conrola la subscripcion o la eliminación de esta
  isSubscribedChange(openProcess: OpenProcess) {

    let subscriptionId = 0;

    if (this.isSubscribed(openProcess.id!)) {

      // Buscamos el id de la susbcripcion a eliminar
      this.subscriptions.forEach(subscription => {
        if (subscription.openProcess.id == openProcess.id) {
          subscriptionId = subscription.id!;
        }
      });

      // Eliminamos la subscripcion
      this.subscriptionsService.delete(subscriptionId).subscribe(() => {

        // Actualizamos las subscripciones
        this.subscriptionsService.getAllUser(this.userLogged!.id).subscribe(result => {
          this.subscriptions = result;
        });
      });

    } else {

      let newSubscription: Subscription = {
        openProcess: openProcess,
        user: this.userLogged!
      }

      // Creamos la nueva subscripcion
      this.subscriptionsService.create(newSubscription).subscribe(result => {

        // Actualizamos las subscripciones
        this.subscriptionsService.getAllUser(this.userLogged!.id).subscribe(result => {
          this.subscriptions = result;
        });
      });
    }
  }

  // Transforma la imagen
  getAvatarUrl(user: User) {
    if (user?.avatar && user?.avatar.length > 0) {
      
      // Creamos una URL de datos (Data URL) a partir de la cadena Base64
      return `data:image/png;base64,${user?.avatar}`; // Cambia 'image/png' al tipo de imagen correcto si es diferente
    }

    return null;
  }
}