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

  selectedOption: string = 'name-asc';
  inputValue: string = '';

  numRrhh: number = 0;
  numCandidates: number = 0;

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.getUsersNameAsc();
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
      if (user.role.name == 'candidate') {
        user.role.id = 3;

      } else if (user.role.name == 'rrhh') {
        user.role.id = 2;
      }

      if (user.rating == 0) {
        user.rating = 1;
      }
      
      this.usersService.update(user.id, user).subscribe();
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  // Controla el filtro de la vista
  filterChange() {
    switch (this.selectedOption) {
      case 'name-asc':
        this.getUsersNameAsc();
        break;
    
      case 'name-desc':
        this.getUsersNameDesc();
        break;

      case 'rrhh':
        this.getUsersOrderRrhh();
        break;

      case 'candidate':
        this.getUsersOrderCandidate();
        break;
    }
  }

  // Recogemos los usuarios por orden ascendente
  getUsersNameAsc() {
    this.numRrhh = 0;
    this.numCandidates = 0;

    // Recogemos todos los usuarios
    this.usersService.getAllNameAsc().subscribe(result => {
      this.allUsers = result;

      // Cogemos solo los usuarios que no sean admin
      this.allUsers = this.allUsers.filter(user => {
        return user.role.name !== 'admin';
      });

      // Contamos el numero de candidatos y usuarios de RRHH que existen, lo hacemos aquí ya que es el filtro que se carga por defecto
      this.allUsers.forEach(user => {
        user.role.name=="rrhh" ? this.numRrhh++ : this.numCandidates++;
        user.avatar = this.getAvatarUrl(user);
      });

      this.updateDisplayedUsers();
    });
  }

  // Recogemos los usuarios por orden descendente
  getUsersNameDesc() {
    // Recogemos todos los usuarios
    this.usersService.getAllNameDesc().subscribe(result => {
      this.allUsers = result;

      // Cogemos solo los usuarios que no sean admin
      this.allUsers = this.allUsers.filter(user => {
        user.avatar = this.getAvatarUrl(user);
        return user.role.name !== 'admin';
      });

      this.updateDisplayedUsers();
    });
  }

  getUsersOrderRrhh() {
    // Recogemos todos los usuarios
    this.usersService.getAllOrderByRole().subscribe(result => {
      this.allUsers = result;

      // Cogemos solo los usuarios que no sean admin
      this.allUsers = this.allUsers.filter(user => {
        user.avatar = this.getAvatarUrl(user);
        return user.role.name !== 'admin';
      });

      this.updateDisplayedUsers();
    });
  }

  getUsersOrderCandidate() {
    // Recogemos todos los usuarios
    this.usersService.getAllOrderByRole().subscribe(result => {
      this.allUsers = result;

      // Cogemos solo los usuarios que no sean admin
      this.allUsers = this.allUsers.filter(user => {
        user.avatar = this.getAvatarUrl(user);
        return user.role.name !== 'admin';
      });

      // Reordenamos el array
      this.allUsers = this.allUsers.reverse();

      this.updateDisplayedUsers();
    });
  }

  onInputChange() {
    if (this.inputValue == '') {
      this.filterChange();

    } else {
      this.usersService.getAllStartingWith(this.inputValue).subscribe(result => {
        this.allUsers = result;

         // Cogemos solo los usuarios que no sean admin
        this.allUsers = this.allUsers.filter(user => {
          user.avatar = this.getAvatarUrl(user);
          return user.role.name !== 'admin';
        });

        this.updateDisplayedUsers();
      });
    }
  }

  // Actualiza la paginación y los usuarios a mostrar, asi como el contador de tipos de usuarios
  updateDisplayedUsers() {
    // Calculamos las paginas totales
    this.totalPages = Math.ceil(this.allUsers.length / this.itemsPerPage);

    // Cambiamos los usuarios a mostrar
    this.onPageChanged(1);
  }

  // Transforma la imagen
  getAvatarUrl(user: User) {
    if (user.avatar && user.avatar.length > 0) {
      
      // Creamos una URL de datos (Data URL) a partir de la cadena Base64
      return `data:image/png;base64,${user?.avatar}`; // Cambia 'image/png' al tipo de imagen correcto si es diferente
    }

    return null;
  }
}