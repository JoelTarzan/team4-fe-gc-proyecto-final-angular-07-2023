import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { User } from 'src/app/models/user';
import { SkillsService } from 'src/app/services/skills.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  allUsers: User[] = [];
  allCandidates: User[] = [];
  displayedCandidates:User[] = [];
  skills: Skill[] = [];

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private usersService: UsersService,
    private skillsService: SkillsService) {

  }

  ngOnInit(): void {

    // Recogemos las skills
    this.skillsService.getAll().subscribe(result => {
      this.skills = result;
    });
    
    // Recogemos todos los usuarios
    this.usersService.getAll().subscribe(result => {
      this.allUsers = result;

      // Filtramos solo los usuarios que son candidatos
      this.allCandidates = this.allUsers.filter((user: User) => user.role.name == "candidate");

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allCandidates.length / this.itemsPerPage);

      // Cambiamos los usuarios a mostrar
      this.onPageChanged(1);
    });

  }

  // Actualiza los candidatos
  onPageChanged(newPage: number) {

    // Recibimos la nueva pagina y actualizamos la actual a esta
    this.currentPage = newPage;

    // Calcula los indices y actualiza la lista de los candidatos a mostrar
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCandidates = this.allCandidates.slice(startIndex, endIndex);
  }

  // Recoge las skills marcadas cada vez que se modifica una en el filtro
  onFilterChange(skill: any) {

    // Filtrar las opciones marcadas
    const selectedSkills = this.skills.filter(skill => skill.value);

    // AQUI HABRA QUE MANDAR UNA PETI A LA API LLEVANDO selectedSkills
  }

}
