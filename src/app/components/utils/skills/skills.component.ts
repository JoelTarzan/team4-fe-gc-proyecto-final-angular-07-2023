import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  /* information to know what type of data you have to collect */
  @Input() applicant:any;



  /* title variants according to where the component is called  */
  tittle:string="Skills";
  tittle2:string="Skills Requeridas";

  /* save object data */
  skills:any;

  /* detect the user role */
  rol: string = 'user';

  skillItemID = 1;

  /* detect the item is editable with ture mark */
  editActivate:boolean=false;

  /* save text from add input text */
  skillinsert:any;


  constructor(private skillService:SkillsService, private router: Router){}

  actualRoute:any;
  /* On init we will collect the corresponding data  */
  ngOnInit(): void {
    /* save the actual route for introducing one or other functions */
    this.actualRoute = this.router.url; 

    /* Receive application information  */
    if(this.applicant == "candidatura"){
      this.skillService.getSkillsCandidacy(this.skillItemID)
        .subscribe((result: any) => {
        // save data in array
        this.skills = result;
      });
    } else if(this.applicant == "usuario"){
      this.skillService.getSkillsUser(this.skillItemID)
      .subscribe((result: any) => {
        // save data in array
        this.skills = result;
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
    let indexArray : any = this.skills.skills.findIndex((item: { skill: any; }) => item.skill === itemSkill);

    /* conditional to know if the checkbox of the item is true or false 
    and change it to the state that corresponds to it  */
    if(confirmation){
      this.skills.skills[indexArray].confirmation=false;
    }else if(!confirmation){
      this.skills.skills[indexArray].confirmation=true;
    }
    
    this.skillService.confirmedSkill(this.skills).subscribe(result => {
      // guarda los datos en el array de este componente
      this.skills = result;
    });
  }

  /* Function for add more skills to database */
  addSkills(){
    /* Conditional for control void data */
    if (this.skillinsert!=null){
      /* Push new skill in array */
      this.skills.skills.push(
        {
          "skill":this.skillinsert,
          "confirmation":false
        }
      );

      /* Clean insert data */
      this.skillinsert=null;

      /* save new data in database in respective id item */
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


  /* remove skills from edit mode */
  removeSkills(item:any){
    /* Obtain number index item selected */
    let indexArray : any = this.skills.skills.findIndex((item: { skill: any; }) => item.skill === item);
    /* remove skill from id */
    this.skills.skills.splice(indexArray, 1);
    /* Detect from data belongs */
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
  }
}
