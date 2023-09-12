import { Component } from '@angular/core';
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
typeUser: string = "rrhh";
  
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
/* modeEditInfoCandidacy:boolean=false;
modeEditDescription:boolean=false;
modeEditRequeriments:boolean=false;
modeEditResponsibilities:boolean=false; */

constructor(
  private candidaturesService: CandidaturesService, 
  //private userCandidacy: UsersCandidacyService,
  private openProcessesService: OpenProcessesService) {

  }


ngOnInit() {
  this.openProcessesService.getExampleProgressBar().subscribe(result => {
    this.processes = result;
  });
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
  /* switch (modeSeccion) {
    
    case "description":
      if (this.modeEditDescription) {
        this.modeEditDescription=false;
      }else{
        this.modeEditDescription=true;
      }
      break;
    
    case "requeriments":
      if (this.modeEditRequeriments) {
        this.modeEditRequeriments=false;
      }else{
        this.modeEditRequeriments=true;
      }
      break;
  
    case "responsabilities":
      if (this.modeEditResponsibilities) {
        this.modeEditResponsibilities=false;
      }else{
        this.modeEditResponsibilities=true;
      }
      break;
  
    case "title":
      
      break;

      case "infocandidacy":
        if (this.modeEditInfoCandidacy) {
          this.modeEditInfoCandidacy=false;
        }else{
          this.modeEditInfoCandidacy=true;
        }
        break;
      
    default:
      break;
  } */
}

/* Metodos preparados para aplicar ediciones */
// editTitle(){ }
// editInfoCandidacy(){ }
// editDescription(){ }
// editRequeriments(){ }
// editResponsibilities(){ }
}
