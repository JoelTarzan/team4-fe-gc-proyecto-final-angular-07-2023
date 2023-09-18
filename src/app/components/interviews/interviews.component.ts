import { Component, OnInit } from '@angular/core';
import { OpenProcess } from 'src/app/models/open-process';
import { Subscription } from 'src/app/models/subscription';
import { User } from 'src/app/models/user';
import { OpenProcessesService } from 'src/app/services/open-processes.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  userLogged: User | undefined;

  selectedOrder: string = 'date-asc';

  subscriptions: Subscription[] = [];

  allOpenProcesses: OpenProcess[] = [];
  openProcessesSubscribed: OpenProcess[] = [];
  displayedOpenProcesses: OpenProcess[] = [];

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private openProcessesService: OpenProcessesService,
    private tokenStorageService: TokenStorageService,
    private usersService: UsersService, 
    private subscriptionsService: SubscriptionsService) {

  }

  ngOnInit(): void {
    // Recogemos el usuario logueado
    this.usersService.getOneById(this.tokenStorageService.getUser()).subscribe(result => {
      this.userLogged = result;

      // Recogemos las suscripciones del usuario logueado
      this.subscriptionsService.getAllUser(this.userLogged.id).subscribe(result => {
        this.subscriptions = result;
        
        // Recogemos los procesos abiertos
        this.getProcessesSubscribedDateAsc();
      });
    });
  }

  // Actualiza los procesos abiertos
  onPageChanged(newPage: number) {

    // Recibimos la nueva pagina y actualizamos la actual a esta
    this.currentPage = newPage;

    // Calcula los indices y actualiza la lista de los procesos abiertos a mostrar
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedOpenProcesses = this.openProcessesSubscribed.slice(startIndex, endIndex);
  }

  // Filtra los procesos abiertos para quedarnos solo con los que el usuario esta suscrito
  filterOpenProcesses() {
    this.openProcessesSubscribed = this.allOpenProcesses.filter(process => {
      return this.subscriptions.some(subscription => subscription.openProcess.id === process.id);
    });
  }

  // Controla el filtro de orden de la vista
  onOrderChange() {
    switch (this.selectedOrder) {
      case 'date-asc':
        this.getProcessesSubscribedDateAsc();
        break;
        
      case 'date-desc':
        this.getProcessesSubscribedDateDesc();
        break;

      case 'name-asc':
        this.getProcessesSubscribedNameAsc();
        break;
    
      case 'name-desc':
        this.getProcessesSubscribedNameDesc();
        break;
    }
  }

  // Devuelve los procesos suscritos ordenados por fecha ascendente
  getProcessesSubscribedDateAsc() {
    // Recogemos los procesos abiertos
    this.openProcessesService.getAllDateASC().subscribe(result => {
      this.allOpenProcesses = result;

      // Nos quedamos solo con los procesos abiertos a los que el usuario esta suscrito
      this.filterOpenProcesses();

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.openProcessesSubscribed.length / this.itemsPerPage);

      // Cambiamos los procesos abiertos a mostrar
      this.onPageChanged(1);
    });
  }

  // Devuelve los procesos suscritos ordenados por fecha descendente
  getProcessesSubscribedDateDesc() {
    // Recogemos los procesos abiertos
    this.openProcessesService.getAllDateDESC().subscribe(result => {
      this.allOpenProcesses = result;

      // Nos quedamos solo con los procesos abiertos a los que el usuario esta suscrito
      this.filterOpenProcesses();

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.openProcessesSubscribed.length / this.itemsPerPage);

      // Cambiamos los procesos abiertos a mostrar
      this.onPageChanged(1);
    });
  }

  // Devuelve los procesos suscritos ordenados por nombre ascendente
  getProcessesSubscribedNameAsc() {
    this.openProcessesSubscribed.sort((a, b) => a.user.name.localeCompare(b.user.name));

    // Calculamos las paginas totales
    this.totalPages = Math.ceil(this.openProcessesSubscribed.length / this.itemsPerPage);

    // Cambiamos los procesos abiertos a mostrar
    this.onPageChanged(1);
  }

  // Devuelve los procesos suscritos ordenados por nombre descendente
  getProcessesSubscribedNameDesc() {
    this.openProcessesSubscribed.sort((a, b) => b.user.name.localeCompare(a.user.name));

    // Calculamos las paginas totales
    this.totalPages = Math.ceil(this.openProcessesSubscribed.length / this.itemsPerPage);

    // Cambiamos los procesos abiertos a mostrar
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
