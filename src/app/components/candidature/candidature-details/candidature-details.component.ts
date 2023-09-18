import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Application } from 'src/app/models/application';
import { Candidature } from 'src/app/models/candidature';
import { OpenProcess } from 'src/app/models/open-process';
import { User } from 'src/app/models/user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
//import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-candidature-details',
  templateUrl: './candidature-details.component.html',
  styleUrls: ['./candidature-details.component.css']
})
export class CandidatureDetailsComponent implements OnInit {
  //Values for progress-bar
  processes: OpenProcess[] = [];
  idCurrentProcess: number = 0;
  application: Application | undefined;

  //representacion de tipo de usuario 
  roleuser: any;
  //Usuario logeado
  idUser: any;
  
  //representacion de cual es la ID de la candidatura seleccionada 
  idCandidature!: number;

  // Boleano de control, guarda si el usuario esta aplicando a la candidatura
  userAplicated:boolean=false;
  
  // Guarda los datos de la candidatura
  candidatureData!: Candidature;

  // Guarda los datos de la User
  userData!: User;

  //Booleanos para llevar control de los modos de edicion activados
  modeEditTitle:boolean=false;

  aplicationStatus!: string;

  radioBtn!: boolean;

  isUpdating: boolean = false; 
  
  applyCount: number=0;

  constructor(
    private candidaturesService: CandidaturesService, 
    private userService: UsersService,
    private openProcessesService: OpenProcessesService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private applicationsService: ApplicationsService
    ) {    }

  
  ngOnInit() {
    //Recoge datos del sesion storage
    this.roleuser = this.tokenStorageService.getRole();
    this.idUser = this.tokenStorageService.getUser();

    /* Recoge la ruta atual y el parametro id */ 
    this.routeActive.params.subscribe(params => {
      this.idCandidature = params['id'] || null;
      
      /* Guarda en la variable la candidatura encontrada por ID */
      this.candidaturesService.getById(this.idCandidature)
      .subscribe((result: Candidature) => {
        
        

        this.candidatureData = result;

        this.radioBtn = this.candidatureData.state;
      });

      if(this.roleuser == "candidate"){

        /* Guarda en la variable el Usuario encontrada por ID */
        this.userService.getOneById(this.idUser)
        .subscribe((result: User) => {

          this.userData = result;
        });

        this.applicationsService.getOneByIdCandidatureandIdUser(this.idUser, this.idCandidature).subscribe(result => {

          this.application = result;

          //Si la Aplicacion existe
          if(this.application){

            if(this.application.phase){
              this.idCurrentProcess = this.application.phase.id!;
            }
            
            this.userAplicated=true;

          }else{

            this.userAplicated=false;

          }
          
          this.openProcessesService.getAllCandidatureAndUserByDateASC(this.idCandidature, this.idUser).subscribe(result => {
            
            this.processes = result;

            // Muestra el estado de la solicitud
            if(this.processes.length>1 && this.processes[this.processes.length-1].id == this.application?.phase!.id){
              this.aplicationStatus = "Finalizado";
            }else{
              this.aplicationStatus = "Pendiente";
            }
            
          });
        });

        

      }

      
      this.applicationsService.getByIdCandidature(this.idCandidature)
      .subscribe((result: Application[]) => {
        this.applyCount = result.length;
      });
    });

    
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

  userAplicate(){
    if(!this.userAplicated){

      //Crea una nueva aplicacion
      let newAplication: Application={
        id: 0,
        user: this.userData,
        candidature: this.candidatureData,
        phase: undefined
      }

      this.applicationsService.create(newAplication).subscribe(()=>{this.userAplicated = true;});
    }
  }

  deleteCandidature(){
    this.candidaturesService.delete(this.candidatureData.id).subscribe(()=>{
      this.router.navigate(['/candidature-list']);
    })
    
  }




  changeStatusCandidature(){
    if (this.isUpdating) {
      return; // Evitar cambios adicionales mientras se actualiza
    }

    if(this.candidatureData.state){
      this.candidatureData.state = false;
    }else{
      this.candidatureData.state = true;
    }

    this.isUpdating = true;

    this.candidaturesService.update(this.idCandidature, this.candidatureData).pipe(
        switchMap(() => {
          /* Guarda en la variable la candidatura encontrada por ID */
          return  this.candidaturesService.getById(this.idCandidature);
        })
      ).subscribe((result: Candidature) => {
        this.candidatureData = result;
        this.radioBtn = this.candidatureData.state;
        this.isUpdating = false;
      });

    
  }

}
