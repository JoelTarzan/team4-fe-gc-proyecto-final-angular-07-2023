import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @Input() applicant:any;



  /* title variants according to where the component is called  */
  tittle:string="Skills";
  tittle2:string="Skills Requeridas";

  skills:any;

  rol: string = 'rrhh';

  skillItemID = 1;

  editActivate:boolean=false;


  constructor(private skillService:SkillsService, private router: Router){}

  actualRoute:any;
  /* On init we will collect the corresponding data  */
  ngOnInit(): void {
    this.actualRoute = this.router.url;
    
    
    /* console.log('Ruta actual:', rutaActual); */
    /* Receive application information  */
    if(this.applicant == "candidatura"){
      this.skillService.getSkillsCandidacy(this.skillItemID)
        .subscribe((result: any) => {
        // print data for console
        console.warn(result);
        // save data in array
        this.skills = result;
      });
    } else if(this.applicant == "usuario"){
      this.skillService.getSkillsUser(this.skillItemID)
      .subscribe((result: any) => {
        // print data for console
        console.warn(result);
        // save data in array
        this.skills = result;
      });
    }  
  }

  editFunction(){
    if(this.editActivate){
      this.editActivate = false;
    }else if(!this.editActivate){
      this.editActivate = true;
    }
  }

  isCheked(itemSkill:any, confirmation:any){
    if(confirmation){
      confirmation=false;
    }else if(!confirmation){
      confirmation=true;
    }
    
    this.skillService.confirmedSkill(this.skillItemID, itemSkill, confirmation).subscribe(result => {
      console.log('Habilidad confirmada con éxito.')
      // imprime por consola datos recibidos
      console.warn(result);
      // guarda los datos en el array de este componente
      this.skills = result;
    });
  }

  removeSkills(item:any){
    if(this.applicant == "candidatura"){
      console.log(item.skill);
      this.skillService.removeSkillsCandidacy(this.skillItemID, item.skill).subscribe(result => {
        console.log('Habilidad eliminada con éxito.')
        // imprime por consola datos recibidos
        console.warn(result);
        // guarda los datos en el array de este componente
        this.skills = result;
      });
    } else if(this.applicant == "usuario"){
      this.skillService. removeSkillsUser(item.id, item.skills).subscribe(result => {
        // imprime por consola datos recibidos
        console.warn(result);
        // guarda los datos en el array de este componente
        this.skills = result;
      });
    }
  }
}
