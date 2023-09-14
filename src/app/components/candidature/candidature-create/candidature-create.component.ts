import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Candidature } from 'src/app/models/candidature';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
//import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';

@Component({
  selector: 'app-candidature-create',
  templateUrl: './candidature-create.component.html',
  styleUrls: ['./candidature-create.component.css']
})
export class CandidatureCreateComponent {
//representacion de tipo de usuario 
roleuser: any;
iduser: any;

//representacion de cual es la ID del usuario que esta observando la candidatura 
idUser:any=1;

//representacion de cual es la ID de la candidatura seleccionada 
idCandidacy: number = 1;

// Boleano de control, guarda si el usuario esta aplicando a la candidatura
userSubscribed:boolean=true;

// Guarda los datos de la candidatura
data: any;

processes: any;
processStatus: string = "Entrevista";

//Booleanos para llevar control de los modos de edicion activados
modeEditTitle: boolean = true;

// Guarda los datos de la candidatura
candidatureData!: Candidature;


constructor(
  private candidaturesService: CandidaturesService, 
  private router: Router,
  private openProcessesService: OpenProcessesService) {

  }


ngOnInit() {
  this.openProcessesService.getExampleProgressBar().subscribe(result => {
    this.processes = result;
  });
}

//Click boton guardar/aceptar datos
saveChanges(){
  this.candidaturesService.create( <Candidature> this.candidatureData )
  .subscribe((result: Candidature) => {

    this.candidatureData = result;
    
    this.router.navigate(['/candidature-details', this.candidatureData.id]);
  });
  
  this.modeEditTitle=false;
}

//Click boton eliminar/descartar datos
deleteChanges(){
  /* Guarda en la variable la candidatura encontrada por ID */
  this.candidaturesService.getById(this.idCandidacy)
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
