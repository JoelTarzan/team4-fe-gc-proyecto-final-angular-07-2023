import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CandidaturaService } from 'src/app/services/candidatura.service';

@Component({
  selector: 'app-candidature-details',
  templateUrl: './candidature-details.component.html',
  styleUrls: ['./candidature-details.component.css']
})
export class CandidatureDetailsComponent implements OnInit {
  typeUser:string="rrhh";
  idCandidacy:any=1;

  data:any;

  /* Booleanos para llevar control de los modos de edicion activados */
  modeEditTitle:boolean=false;
  modeEditInfoCandidacy:boolean=false;
  modeEditDescription:boolean=false;
  modeEditRequeriments:boolean=false;
  modeEditResponsibilities:boolean=false;

  constructor(private candidacyService:CandidaturaService){}

  actualRoute:any;
  
  ngOnInit(): void {
    this.candidacyService.getDataCandidacy(this.idCandidacy)
    .subscribe((result: any) => {
      // save data in array
      this.data = result;
    });
  }

  /* Controla que modos de edicion estan aplicados y cuales no */
  controlModes(modeSeccion: string){
    switch (modeSeccion) {
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
    
      case "tittle":
        if (this.modeEditTitle) {
          this.modeEditTitle=false;
        }else{
          this.modeEditTitle=true;
        }
        break;

      default:
        break;
    }
  }

  editTitle(){

  }
  editInfoCandidacy(){
    
  }
  editDescription(){
    
  }
  editRequeriments(){
    
  }
  editResponsibilities(){
    
  }
}
