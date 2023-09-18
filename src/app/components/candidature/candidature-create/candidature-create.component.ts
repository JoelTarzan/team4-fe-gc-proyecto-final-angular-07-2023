import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Candidature } from 'src/app/models/candidature';
import { User } from 'src/app/models/user';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
//import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';

@Component({
  selector: 'app-candidature-create',
  templateUrl: './candidature-create.component.html',
  styleUrls: ['./candidature-create.component.css']
})
export class CandidatureCreateComponent {
//representacion de tipo de usuario 
roleUser: any;
idUser: any;

// Boleano de control, guarda si el usuario esta aplicando a la candidatura
userAplicated:boolean=false;



//Booleanos para llevar control de los modos de edicion activados
modeEditTitle: boolean = true;

// Guarda los datos de la candidatura
candidatureData!: Candidature;




name: string = "";
location: string = "";
closingDate: Date = new Date('2023-12-23');
typeWorkingDate: string = "";
applicantsNum: number = 0;
description: string = "";
requirements: string = "";
responsabilities: string = "";
state: boolean = false;
creator!: User;

constructor(
  private candidaturesService: CandidaturesService, 
  private userService: UsersService,
  private router: Router,
  private tokenStorageService: TokenStorageService,
  private openProcessesService: OpenProcessesService) {  }


ngOnInit() {
  this.roleUser = this.tokenStorageService.getRole();
  this.idUser = this.tokenStorageService.getUser();
}

//Click boton guardar/aceptar datos
saveChanges(){

  this.userService.getOneById(this.idUser).subscribe(result=>{/* this.closingDate */
  let newCandidature: Candidature={
      "id": 0,
      "name": this.name,
      "location": this.location,
      "closingDate": new Date(),
      "typeWorkingDate": this.typeWorkingDate,
      "applicantsNum": this.applicantsNum,
      "description": this.description,
      "requirements": this.requirements,
      "responsabilities": this.responsabilities,
      "state": this.state,
      "creator": result,
    };
    console.log(newCandidature);
    this.candidaturesService.create(<Candidature> newCandidature )
    .subscribe((result: Candidature) => {

      this.candidatureData = result;
      
      this.router.navigate([`/candidature-details/${this.candidatureData.id}`]); 
    });
  });
}

//Click boton eliminar/descartar datos
deleteChanges(){
  this.router.navigate(['/candidature-list']);
}

}
