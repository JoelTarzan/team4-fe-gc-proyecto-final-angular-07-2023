import { Component, OnInit } from '@angular/core';
import { OpenProcess } from 'src/app/models/open-process';
import { OpenProcessesService } from 'src/app/services/open-processes.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  allOpenProcesses: OpenProcess[] = [];
  allInterviews: OpenProcess[] = [];
  displayedInterviews: OpenProcess[] = [];

  userImage: any;

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private openProcessesService: OpenProcessesService) {

  }

  ngOnInit(): void {

    // Recogemos todos los procesos abiertos
    this.openProcessesService.getOpenProcesses().subscribe(result => {
      this.allOpenProcesses = result;

      // Filtramos solo los procesos que son entrevistas
      this.allInterviews = this.allOpenProcesses.filter((openProcess: OpenProcess) => openProcess.interview);

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allInterviews.length / this.itemsPerPage);

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
    this.displayedInterviews = this.allInterviews.slice(startIndex, endIndex);
  }
}
