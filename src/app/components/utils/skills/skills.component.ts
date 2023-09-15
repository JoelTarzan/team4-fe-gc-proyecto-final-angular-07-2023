import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillUser } from 'src/app/models/skill-user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { SkillUserService } from 'src/app/services/skill-user.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  //En este input se le indica la tabla que requiere la url
  //users (datos de usuario), candidatures (datos de candidatura)
  @Input() tableData: any;
  //candidate (rol de usuario "normal"), rrhh (rol de usuario de "recursos humanos")
  @Input() rol: any;

  // TITULO // 
  //que cambia segun la ruta (en la ruta detalle de candidato no sale titulo)
  //Perfil - candidate, Aplicacion_candidato - rrhh
  title: string = "Aptitudes";
  //Detalle_Candidatura - candidate/rrhh
  title2: string = "Aptitudes Requeridas";

  // DATOS BBDD GUARDADOS //
  user: any;
  candidature: any;

  skillsOfUser: any[] = [];

  // OBTENER DATOS URL
  actualRoute: any;
  idRoute: any;

  /* Controla el botón para editar las habilidades */
  editActivate: boolean = false;

  /* save text from add input text */
  /* skillinsert: any; */

  constructor(
    private userService: UsersService, 
    private candidatureService: CandidaturesService, 
    private router: Router, 
    private routeActive: ActivatedRoute,
    private skillUserService: SkillUserService,
    private applicationsService: ApplicationsService
    ) {

    }

  
  ngOnInit(): void {
    
    /* obtiene datos de url actualRoute='/RUTA' e idRoute='/ID'*/
    this.actualRoute = this.router.url;
    
    this.routeActive.params.subscribe(params => {
      this.idRoute = params['id'] || null;
    });

    //Recibe datos de usuario
    if(this.tableData == "user") {
      // Guarda Usuario
      this.userService.getOneById(this.idRoute).subscribe(result => {
        
        this.user = result; 
      });

      // Busca las SkillUser y guarda las Skills
      this.skillUserService.getByIdUser(this.idRoute).subscribe(result => {

        this.skillsOfUser = result;
      });

    //Recibe datos de Candidatura
    } else if(this.tableData == "candidature") {
      // Guarda Candidatura
      this.candidatureService.getById(this.idRoute).subscribe(result => {
        
        this.candidature = result;
      });

    // Recibe los datos de una application
    } else if (this.tableData == "application") {
      // Guarda el usuario
      this.applicationsService.getById(this.idRoute).subscribe(result => {
        
        this.user = result.user;

        // Busca las SkillUser y guarda las Skills
        this.skillUserService.getByIdUser(this.user.id).subscribe(result => {

          this.skillsOfUser = result;
        });
      });
    }
  }

  /* Función para activar o desactivar el modo editar */
  editFunction(){
    this.editActivate = !this.editActivate;
  }

  /* Función para los checkbox  */
  isChecked(skillUser: SkillUser){
    skillUser.validated = !skillUser.validated;
    
    this.skillUserService.update(skillUser, skillUser.id).subscribe(result => {
    });
  }

 /*  / Function for add more skills to database /
  addSkills(){
    / Conditional for control void data /
    if (this.skillinsert!=null){
      / Push new skill in array /
      this.skills.skills.push(
        {
          "skill":this.skillinsert,
          "confirmation":false
        }
      );

      / Clean insert data /
      this.skillinsert=null;

      / save new data in database in respective id item /
      if(this.applicant == "candidatura"){
        this.skillService.addSkillsCandidacy(this.skills).subscribe(result => {
          // guarda los datos en el array de este componente
          this.skills = result;
        });
      } else if(this.applicant == "usuario"){
        this.skillService.addSkillsCandidacy(this.skills).subscribe(result => {
          // guarda los datos en el array de este componente
          this.skills = result;
        });
      }
    }
  } 
  */

/* 
  / remove skills from edit mode /
  removeSkills(item:any){
    / Obtain number index item selected /
    let indexArray : any = this.skills.skills.findIndex((item: { skill: any; }) => item.skill === item);
    / remove skill from id /
    this.skills.skills.splice(indexArray, 1);
    / Detect from data belongs /
    if(this.applicant == "candidatura"){
      console.log(item.skill);
      this.skillService.removeSkillsCandidacy(this.skills).subscribe(result => {
        console.log('Habilidad eliminada con éxito.')
        // guarda los datos en el array de este componente
        this.skills = result;
      });
    } else if(this.applicant == "usuario"){
      this.skillService. removeSkillsUser(this.skills).subscribe(result => {
        // guarda los datos en el array de este componente
        this.skills = result;
      });
    }
  } */
}
