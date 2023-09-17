import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/models/candidature';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
//import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-candidature-details',
  templateUrl: './candidature-details.component.html',
  styleUrls: ['./candidature-details.component.css']
})
export class CandidatureDetailsComponent implements OnInit {
  //representacion de tipo de usuario 
  roleuser: any;
  //Usuario logeado
  idUser: any;
  
  //representacion de cual es la ID de la candidatura seleccionada 
  idCandidature!: number;

  // Boleano de control, guarda si el usuario esta aplicando a la candidatura
  userSubscribed:boolean=true;
  
  // Guarda los datos de la candidatura
  candidatureData!: Candidature;

  processes: any;
  idCurrentProcess: number = 0;

  //Booleanos para llevar control de los modos de edicion activados
  modeEditTitle:boolean=false;
  

  constructor(
    private candidaturesService: CandidaturesService, 
    private openProcessesService: OpenProcessesService,
    private routeActive: ActivatedRoute,
    private tokenStorageService: TokenStorageService) {

    }

  
  ngOnInit() {
    //Recoge datos del sesion storage
    this.roleuser = this.tokenStorageService.getRole();
    this.idUser = this.tokenStorageService.getUser();

    /* Recoge la ruta atual y el parametro id */ 
    this.routeActive.params.subscribe(params => {
      this.idCandidature = params['id'] || null;
    });

    /* Guarda en la variable la candidatura encontrada por ID */
    this.candidaturesService.getById(this.idCandidature)
    .subscribe((result: Candidature) => {

      this.candidatureData = result;
    });

    if(this.roleuser == "candidate"){
      /* this.openProcessesService.get().subscribe(result => {
        this.processes = result;
      }); */
    }
  }

  //Click boton guardar/aceptar datos
  saveChanges(){
    this.candidaturesService.update( <number> this.candidatureData?.id , <Candidature> this.candidatureData )
    .subscribe((result: Candidature) => {

      this.candidatureData = result;
    });
    this.modeEditTitle=false;
  }

  //Click boton eliminar/descartar datos
  deleteChanges(){
    /* Guarda en la variable la candidatura encontrada por ID */
    this.candidaturesService.getById(this.idCandidature)
    .subscribe((result: Candidature) => {

      this.candidatureData = result;
    });
    this.modeEditTitle=false;
  }

  /* Controla que modos de edicion estan aplicados y cuales no */
  controlModes(){
        if (this.modeEditTitle) {
          this.modeEditTitle=false;
        }else{
          this.modeEditTitle=true;
        }
  }

}
