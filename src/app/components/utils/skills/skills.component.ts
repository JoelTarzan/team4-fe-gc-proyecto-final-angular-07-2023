import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  //En este input se le indica la tabla que requiere la url
  //user (datos de usuario), candidature (datos de candidatura)
  @Input() tableData:any;
  //user (rol de usuario "normal"), rrhh (rol de usuario de "recursos humanos")
  @Input() rol: any;


  // TITULO // 
  //que cambia segun la ruta (en la ruta detalle de candidato no sale titulo)
  //Perfil - usuario, Aplicacion_candidato - rrhh
  title:string="Habilidades";
  //Detalle_Candidatura - Usuario/rrhh
  title2:string="Habilidades Requeridas";



  // DATOS BBDD GUARDADOS //
  user:any;
  candidature: any;
  
  
  
  //OBTENER DATOS URL
  actualRoute:any;
  idRoute:any;


  /* detect the item is editable with ture mark */
  editActivate:boolean=false;

  /* save text from add input text */
  /* skillinsert:any; */


  constructor(private userService:UsersService, private candidatureService:CandidaturesService, private router: Router, private routeActive:ActivatedRoute){}

  
  ngOnInit(): void {
    /* obtiene datos de url actualRoute='/RUTA' e idRoute='/ID'*/
    this.actualRoute = this.router.url; 
    this.routeActive.params.subscribe(params => {
      this.idRoute = params['id'] || null;
    });

    //Condicional para controlar aquellas URL que no contienen :id como profile
    //A la espera de si se guardan datos del usuario al iniciar sesion coger el 
    //id a partir de ese metodo
    if(this.idRoute==null || this.idRoute==undefined){
      //de momento se pone 1 para que salga informacion
      //si de alguna manera se guarda info del usuario registrado poner la id con ese metodo
      this.idRoute==1;
    }


    //Recibe datos de usuario
    if(this.tableData == "user"){
      this.userService.getOneById(this.idRoute)
        .subscribe((result: any) => {
        // Guarda Usuario
        this.user = result;
      });
    //Recibe datos de Candidatura
    } else if(this.tableData == "candidature"){
      this.candidatureService.getOneById(this.idRoute)
      .subscribe((result: any) => {
        // Guarda Candidatura
        this.candidature = result;
      });
    }  
  }

  /* funtion for activate edit mode */
  editFunction(){
    if(this.editActivate){
      this.editActivate = false;
    }else if(!this.editActivate){
      this.editActivate = true;
    }
  }

  /* function for checkbox option  */
  isCheked(itemSkill:any, confirmation:any){
    /* Obtain number index item selected */
    let indexArray : any = this.user.skills.findIndex((item: { skill: any; }) => item.skill === itemSkill);

    /* conditional to know if the checkbox of the item is true or false 
    and change it to the state that corresponds to it  */
    if(confirmation){
      this.user.skills[indexArray].confirmation=false;
    }else if(!confirmation){
      this.user.skills[indexArray].confirmation=true;
    }
    
    /* this.skillService.confirmedSkill(this.skills).subscribe(result => {
      // guarda los datos en el array de este componente
      this.skills = result;
    }); */
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
