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

  selectedOrder: string = 'name-asc';
  selectedSkills: Skill[] = [];

  inputValue: string = '';

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
    
    // Recogemos todos los candidatos
    this.usersService.getAllByRoleNameAsc('candidate').subscribe(result => {
      this.allCandidates = result;

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
    this.selectedSkills = this.skills.filter(skill => skill.value);

    // Activamos tambien la busqueda de candidatos al tocar las skills para filtrar
    this.onOrderChange();
  }

  // Maneja el cambio de orden en la vista
  onOrderChange() {
    switch (this.selectedOrder) {
      case 'name-asc':
        this.getUsersWithSkillsNameAsc();
        break;
    
      case 'name-desc':
        this.getUsersWithSkillsNameDesc();
        break;
    }
  }

  // Recoge los usuarios con X skills, ordenados alfabéticamente de forma ascendente
  getUsersWithSkillsNameAsc() {
    let skillsTemp: Skill[] = [];

    // Si no hay ninguna skill seleccionada, mandamos todas, para ver todos los candidatos
    if (this.selectedSkills.length == 0) {
      skillsTemp = this.skills;

    } else {

      skillsTemp = this.selectedSkills;
    }

    // Recogemos los usuarios
    this.usersService.getCandidatesWithSkillsNameAsc(skillsTemp).subscribe(result => {

      this.allCandidates = result;
      this.updateDisplayedUsers();
    });
  }

  // Recoge los usuarios con X skills, ordenados alfabéticamente de forma descendente
  getUsersWithSkillsNameDesc() {
    let skillsTemp: Skill[] = [];

    // Si no hay ninguna skill seleccionada, mandamos todas, para ver todos los candidatos
    if (this.selectedSkills.length == 0) {
      skillsTemp = this.skills;

    } else {

      skillsTemp = this.selectedSkills;
    }

    // Recogemos los usuarios
    this.usersService.getCandidatesWithSkillsNameDesc(skillsTemp).subscribe(result => {

      this.allCandidates = result;
      this.updateDisplayedUsers();
    });
  }

  // Actualiza la paginación y los usuarios a mostrar
  updateDisplayedUsers() {
    // Calculamos las paginas totales
    this.totalPages = Math.ceil(this.allUsers.length / this.itemsPerPage);

    // Cambiamos los usuarios a mostrar
    this.onPageChanged(1);
  }

  // Busca los candidatos dependiendo de las skills y las letras escritas en el buscador
  onInputChange() {
    let skillsTemp: Skill[] = [];

    // Si no hay ninguna skill seleccionada, mandamos todas, para ver todos los candidatos
    if (this.selectedSkills.length == 0) {
      skillsTemp = this.skills;

    } else {

      skillsTemp = this.selectedSkills;
    }

    if (this.inputValue == '') {
      this.onOrderChange();

    } else {

      this.usersService.getCandidatesWithSkillsStartingWith(this.inputValue, skillsTemp).subscribe(result => {

        this.allCandidates = result;
        this.updateDisplayedUsers();
      });
    }
  }
}