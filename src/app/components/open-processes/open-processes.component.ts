import { Component, OnInit } from '@angular/core';
import { OpenProcess } from 'src/app/models/open-process';
import { User } from 'src/app/models/user';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-open-processes',
  templateUrl: './open-processes.component.html',
  styleUrls: ['./open-processes.component.css']
})
export class OpenProcessesComponent implements OnInit {

  userLogged: User | undefined;

  selectedOrder: string = 'date-asc';

  allOpenProcesses: OpenProcess[] = [];
  displayedOpenProcesses: OpenProcess[] = [];

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(
    private openProcessesService: OpenProcessesService,
    private tokenStorageService: TokenStorageService,
    private usersService: UsersService
  ) {

  }

  ngOnInit(): void {
    // Recogemos el usuario logueado
    this.usersService.getOneById(this.tokenStorageService.getUser()).subscribe(result => {
      this.userLogged = result;

      // Recogemos las procesos abiertos del usuario
      this.getAllProcessesByUserOrderDateASC();
    });
  }

  // Actualiza los procesos abiertos
  onPageChanged(newPage: number) {

    // Recibimos la nueva pagina y actualizamos la actual a esta
    this.currentPage = newPage;

    // Calcula los indices y actualiza la lista de los procesos abiertos a mostrar
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedOpenProcesses = this.allOpenProcesses.slice(startIndex, endIndex);
  }

  // Controla el filtro de orden de la vista
  onOrderChange() {
    switch (this.selectedOrder) {
      case 'date-asc':
        this.getAllProcessesByUserOrderDateASC();
        break;
        
      case 'date-desc':
        this.getAllProcessesByUserOrderDateDESC();
        break;
    }
  }

  // Devuelve todos los procesos abiertos a partir de un usuario y ordenados por fecha ascendente
  getAllProcessesByUserOrderDateASC() {
    this.openProcessesService.getAllByUserOrderDateASC(this.userLogged!.id).subscribe(result => {
      this.allOpenProcesses = result;

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allOpenProcesses.length / this.itemsPerPage);

      // Cambiamos los procesos abiertos a mostrar
      this.onPageChanged(1);
    });
  }

  // Devuelve todos los procesos abiertos a partir de un usuario y ordenados por fecha ascendente
  getAllProcessesByUserOrderDateDESC() {
    this.openProcessesService.getAllByUserOrderDateDESC(this.userLogged!.id).subscribe(result => {
      this.allOpenProcesses = result;

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allOpenProcesses.length / this.itemsPerPage);

      // Cambiamos los procesos abiertos a mostrar
      this.onPageChanged(1);
    });
  }
}