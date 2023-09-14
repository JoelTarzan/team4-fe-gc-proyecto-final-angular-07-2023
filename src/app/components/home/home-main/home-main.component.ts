import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Candidature } from 'src/app/models/candidature';
import { Skill } from 'src/app/models/skill';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { SkillUserService } from 'src/app/services/skill-user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  //Variable para cambiar (simula el usuario que esta registrado a falta de tener el sesion storage)
  iduser!: number;

  candidatures!: Candidature[];
  numberOfCandidatures: number = 0;

  searchHomeTxt!: string;

  //"Subject" emite valores al mismo tiempo puede suscribirse a el para recibir esos valores. 
  searchTextChanged = new Subject<string>();

  //Recoge las skills del candidato para pasarlo en la comprobacion de la candidatura
  //skillsCandidate!: SkillUser[];
  skillsUser!: Skill[];
  
  constructor(
    private candidaturesService: CandidaturesService,
    private skillUserService: SkillUserService,
    private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    
    this.candidaturesService.getAll().subscribe((result: Candidature[]) => {
      this.candidatures = result;
      this.numberOfCandidatures = this.candidatures.length; 
    });
    
    this.iduser=this.tokenStorageService.getUser();
    
    //Obtiene el Array (Skill[]) del usuario/candidato para enviarlo al componente hijo
    //Home-card (este muestra el contenido de la candidatura).
    //Esto se hace para no hacer tantas llamadas desde el card cuando se puede hacer 
    //solo una vez desde el componente padre (ralentizaba la muestra de datos)
    this.skillUserService.getByIdUsermapSkills(this.iduser).subscribe((result: Skill[]) => {
      this.skillsUser = result;
    });

       // Configura el observable para retrasar la búsqueda
      this.searchTextChanged.pipe(
        debounceTime(1000) //1seg.
      ).subscribe(() => {
        this.searchOption();
      });
  }

  onSearchInputChange() {
    // Cuando el valor de búsqueda cambia, notifica al observable
    this.searchTextChanged.next(this.searchHomeTxt);
  }

  searchOption(){

    //Para evitar errores cuando el texto del buscador este vacio pondra el metodo getAll
    if(this.searchHomeTxt==""){

      this.candidaturesService.getAll().subscribe((result: Candidature[]) => {
        this.candidatures = result;
        this.numberOfCandidatures = this.candidatures.length; 
      });
      console.log(this.candidatures);
    }else{

      // Recogemos todas las candidaturas
      this.candidaturesService.getStartingWith(this.searchHomeTxt).subscribe(result => {
        this.candidatures = result;
        console.log(this.candidatures);
      });

    }  
  }

}
