import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  allUsers: User[] = [];
  displayedUsers: User[] = [];

  numRrhh: number = 0;
  numCandidates: number = 0;

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private usersService: UsersService) {

  }

  ngOnInit(): void {

    // Recogemos todos los usuarios
    this.usersService.getAll().subscribe(result => {
      this.allUsers = result;

      // Contamos el numero de candidatos y usuarios de RRHH que existen
      this.allUsers.forEach(user => {
        user.rrhh ? this.numRrhh++ : this.numCandidates++;
      });

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allUsers.length / this.itemsPerPage);

      // Cambiamos los usuarios a mostrar
      this.onPageChanged(1);
    });
  }

  // Actualiza los usaurios
  onPageChanged(newPage: number) {

    // Recibimos la nueva pagina y actualizamos la actual a esta
    this.currentPage = newPage;

    // Calcula los indices y actualiza la lista de los usuarios a mostrar
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedUsers = this.allUsers.slice(startIndex, endIndex);
  }

  // Guarda los cambios de los usuarios
  saveChanges() {
    this.allUsers.forEach(user => {
      this.usersService.update(user.id, user).subscribe();
    });

    window.location.reload();
  }
}
