import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/models/candidature';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
//import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';

@Component({
  selector: 'app-candidature-details',
  templateUrl: './candidature-details.component.html',
  styleUrls: ['./candidature-details.component.css']
})
export class CandidatureDetailsComponent implements OnInit {
  //representacion de tipo de usuario 
  typeUser:string="rrhh";
  
  //representacion de cual es la ID del usuario que esta observando la candidatura 
  idUser:any=1;
  
  //representacion de cual es la ID de la candidatura seleccionada 
  idCandidacy!: number;

  // Boleano de control, guarda si el usuario esta aplicando a la candidatura
  userSubscribed:boolean=true;
  
  // Guarda los datos de la candidatura
  candidatureData!: Candidature;

  processes: any;
  processStatus: string = "Entrevista";

  //Booleanos para llevar control de los modos de edicion activados
  modeEditTitle:boolean=false;
  

  constructor(
    private candidaturesService: CandidaturesService, 
    //private userCandidacy:UsersCandidacyService,
    private openProcessesService: OpenProcessesService,
    private routeActive: ActivatedRoute) {

    }

  
  ngOnInit() {
    /* Recoge la ruta atual y el parametro id */ 
    this.routeActive.params.subscribe(params => {
      this.idCandidacy = params['id'] || null;
    });

    /* Guarda en la variable la candidatura encontrada por ID */
    this.candidaturesService.getById(this.idCandidacy)
    .subscribe((result: Candidature) => {

      this.candidatureData = result;
      console.log(this.candidatureData.name.length);
    });





    /* Comprovacion de si el usuario esta registrado en la candidatura */
    /* if(this.typeUser=="user"){
      this.userCandidacy.getIdUserSpecific(this.idUser, this.idCandidacy).subscribe((result: any) => {
        // save data in array
        if(result != null && result.length > 0){
          this.userSubscribed=true;
        }else{
          this.userSubscribed=false;
        }
      });
    }

    this.openProcessesService.getExampleProgressBar().subscribe(result => {
      this.processes = result;
    }); */
  }

  //Click boton guardar/aceptar datos
  saveChanges(){
    this.modeEditTitle=false;
  }

  //Click boton eliminar/descartar datos
  deleteChanges(){
    this.modeEditTitle=false;
  }

  /* Controla que modos de edicion estan aplicados y cuales no */
  controlModes(modeSeccion: string){
        if (this.modeEditTitle) {
          this.modeEditTitle=false;
        }else{
          this.modeEditTitle=true;
        }
  }

}
