import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, of, switchMap } from 'rxjs';
import { Skill } from 'src/app/models/skill';
import { SkillCandidature } from 'src/app/models/skill-candidature';
import { SkillUser } from 'src/app/models/skill-user';
import { ApplicationsService } from 'src/app/services/applications.service';
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
  skillsOfCandidature: any[] = [];

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
    private applicationsService: ApplicationsService,
    private skillService: SkillsService
    ) {

    }

  
  ngOnInit(): void {
    //Recoge datos del sesion storage
    this.roleuser = this.tokenStorageService.getRole();
    //this.idUser = this.tokenStorageService.getUser();

    // obtiene datos de url actualRoute='/RUTA' e idRoute='/ID'*/
    this.actualRoute = this.router.url;
    
    this.routeActive.params.subscribe(params => {
      this.idRoute = params['id'] || null;
      /* console.log(this.idRoute); */
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
        //console.log(this.candidature);
      });

      this.skillCandidatureService.getByIdCandidature(this.idRoute).subscribe(result => {
        // Guarda SkillCandidature
        this.skillsOfCandidature = result;
        // console.log(this.skillsOfCandidature);
      });
     
    } else if (this.tableData == "application") {
      // Guarda el usuario
      this.applicationsService.getById(this.idRoute).subscribe(result => {
        
        this.user = result.user;

        // Busca las SkillUser y guarda las Skills
        this.skillUserService.getByIdUser(this.user.id).subscribe(result => {

          this.skillsOfUser = result;
        });
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

  addSkills() {
    this.skillService.getOneByName(this.skillinsert).pipe(
      switchMap((skill) => {
        //skill no existe
        if (!skill) {
          
          //crea una skill con el nombre introducido
          let newSkill: Skill = {
            name: this.skillinsert,
            id: 0,
          };
          
          //devuelve el objeto creado
          return this.skillService.create(newSkill);

        //skill existe
        } else {

          //devuelve la skill existente
          return of(skill);
        }
      })).subscribe((skill) => {
        if (this.tableData === "candidature") {
          
          // Crea la relación candidatura
          let newSkillCandidature: SkillCandidature = {
            id: 0,
            skill: skill,
            candidature: this.candidature,
          };

          this.skillCandidatureService.create(newSkillCandidature).subscribe(result => {

            // Realiza las acciones después de que se haya creado la relación
            this.getListSkillCandidature();
          });
        } else if(this.tableData === "user"){
          // Crea la relación usuario
          let newSkillUser: SkillUser = {
            id: 0,
            skill: skill,
            user: this.user,
            validated: false
          };

          //Crea nueva relación
          this.skillUserService.create(newSkillUser).subscribe(result => {

            // Realiza las acciones después de que se haya creado la relación
            this.getListSkillUser();
          });
        }
        
        
        
      });
  }
  
  dropSkills(skillRelation: SkillCandidature | SkillUser){
      if(this.tableData == "candidature"){

        this.skillCandidatureService.delete(skillRelation.id).subscribe(()=>{
          //Refresca la lista
          this.getListSkillCandidature();
        });

      }else if(this.tableData == "user"){

        this.skillUserService.delete(skillRelation.id).subscribe(()=>{
          //Refresca la lista
          this.getListSkillUser();
        });

      }
    }

  //Metodo para refrescar la lista skillUser
  getListSkillUser(){
    this.skillUserService.getByIdUser(this.idRoute).subscribe(result => {
      // Guarda SkillCandidature
      this.skillsOfUser = result;
    });
  }

  //Metodo para refrescar la lista skillCandidature
  getListSkillCandidature(){
    this.skillCandidatureService.getByIdCandidature(this.idRoute).subscribe(result => {
      // Guarda SkillCandidature
      this.skillsOfCandidature = result;
    });
  }
} 
  
  


