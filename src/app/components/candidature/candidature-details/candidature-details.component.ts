import { Component, OnInit } from '@angular/core';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';

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
  idCandidacy: number = 1;

  // Boleano de control, guarda si el usuario esta aplicando a la candidatura
  userSubscribed:boolean=true;
  
  // Guarda los datos de la candidatura
  data: any;

  processes: any;
  processStatus: string = "Entrevista";

  //Booleanos para llevar control de los modos de edicion activados
  modeEditTitle:boolean=false;
  /* modeEditInfoCandidacy:boolean=false;
  modeEditDescription:boolean=false;
  modeEditRequeriments:boolean=false;
  modeEditResponsibilities:boolean=false; */

  constructor(
    private candidaturesService: CandidaturesService, 
    private userCandidacy:UsersCandidacyService,
    private openProcessesService: OpenProcessesService,
    private tokenStorageService: TokenStorageService) {

    }

  
  ngOnInit() {
    this.typeUser = this.tokenStorageService.getRole();
    this.idUser = this.tokenStorageService.getUser();
    
    /* Recoge los datos de la candidatura que se esta observando */
    this.candidaturesService.getOneById(this.idCandidacy)
    .subscribe((result: any) => {
      // save data in array
      this.data = result;
    });
    /* Comprovacion de si el usuario esta registrado en la candidatura */
    if(this.typeUser=="user"){
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
