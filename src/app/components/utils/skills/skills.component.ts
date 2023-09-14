import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillCandidature } from 'src/app/models/skill-candidature';
import { SkillUser } from 'src/app/models/skill-user';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { SkillCandidatureService } from 'src/app/services/skill-candidature.service';
import { SkillUserService } from 'src/app/services/skill-user.service';
import { SkillsService } from 'src/app/services/skills.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
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

  //representacion de tipo de usuario 
  roleuser: any;
  //Usuario logeado
  idUser: any;

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

  //skill!: Skill;

  // OBTENER DATOS URL
  actualRoute: any;
  idRoute: any;

  /* Controla el botón para editar las habilidades */
  editActivate: boolean = false;

  /* save text from add input text */
  skillinsert!: string; 

  constructor(
    private userService: UsersService, 
    private candidatureService: CandidaturesService, 
    private router: Router, 
    private routeActive: ActivatedRoute,
    private skillUserService: SkillUserService,
    private skillCandidatureService: SkillCandidatureService,
    private tokenStorageService: TokenStorageService,
    private skillService: SkillsService
    ) {}

  // ===== INICIO =====
  ngOnInit(): void {
    //Recoge datos del sesion storage
    this.roleuser = this.tokenStorageService.getRole();
    //this.idUser = this.tokenStorageService.getUser();

    // obtiene datos de url actualRoute='/RUTA' e idRoute='/ID'*/
    this.actualRoute = this.router.url;
    
    this.routeActive.params.subscribe(params => {
      this.idRoute = params['id'] || null;
    });

    //USUARIO
    if(this.tableData == "user"){

      this.userService.getOneById(this.idRoute).subscribe(result => {
        //Guarda User
        this.user = result; 
      });

      this.skillUserService.getByIdUser(this.idRoute).subscribe(result => {
        // Guarda SkillUser
        this.skillsOfUser = result;
      });

    //CANDIDATURA
    } else if(this.tableData == "candidature"){
      this.candidatureService.getById(this.idRoute).subscribe((result: any) => {
        // Guarda Candidature
        this.candidature = result;
      });
    }
  }

  // Función para activar o desactivar el modo editar
  editFunction(){
    this.editActivate = !this.editActivate;
  }

  // Función para los checkbox
  isChecked(skillUser: SkillUser){
    skillUser.validated = !skillUser.validated;
    
    this.skillUserService.update(skillUser, skillUser.id).subscribe(result => {
    });
  }





  // Function for add more skills to database 
  addSkills(){
    let skill!: Skill;

    if(this.tableData == "candidature"){
    
      this.skillService.getOneByName(this.skillinsert).subscribe(result => {
        // Guarda Skill
        skill = result; 

        //Resultado vacio
        if(!skill){

          let newSkill: Skill= {
            name: this.skillinsert,
            id: 0
          };

          this.skillService.create(newSkill).subscribe(result => {
            // Guarda Skill
            skill = result; 
            console.log(skill);
          });
        }

        //Crea la relacion
        let newSkillCandidature: SkillCandidature={ 
          id: 0,
          skill: skill,
          candidature: this.candidature
        };
        console.log(newSkillCandidature);
        this.skillCandidatureService.create(newSkillCandidature).subscribe(result => {
          // Guarda Skill
          result; 
        });
      });

      

      

      
      /* if(skill){
      
        
      } */
    }
  }
    // Conditional for control void data
    /* if (this.skillinsert!=null){
      // Push new skill in array 
      this.skills.skills.push(
        {
          "skill":this.skillinsert,
          "confirmation":false
        }
      );

      // Clean insert data 
      this.skillinsert=null;

      // save new data in database in respective id item 
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
    } */
  } 
  

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

