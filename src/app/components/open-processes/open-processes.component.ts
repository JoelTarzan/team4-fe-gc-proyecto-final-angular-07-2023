import { Component, OnInit } from '@angular/core';
import { OpenProcessesService } from 'src/app/services/open-processes.service';

@Component({
  selector: 'app-open-processes',
  templateUrl: './open-processes.component.html',
  styleUrls: ['./open-processes.component.css']
})
export class OpenProcessesComponent implements OnInit {

  allOpenProcesses: any;
  displayedOpenProcesses: any[] = [];

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private openProcessesService: OpenProcessesService
  ) {

  }

  ngOnInit(): void {
    
    // Recogemos todos los procesos abiertos
    this.openProcessesService.getOpenProcesses().subscribe(result => {
      this.allOpenProcesses = result;

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allOpenProcesses.length / this.itemsPerPage);

      // Cambiamos los procesos abiertos a mostrar
      this.onPageChanged(1);
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

}