import { Component, OnInit } from '@angular/core';
import { CandidaturesService } from 'src/app/services/candidatures.service';

@Component({
  selector: 'app-candidature-list',
  templateUrl: './candidature-list.component.html',
  styleUrls: ['./candidature-list.component.css']
})
export class CandidatureListComponent implements OnInit {

  rol: string = 'candidate';

  allCandidatures: any;
  displayedCandidatures: any[] = [];

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private candidaturesService: CandidaturesService
  ) {

  }

  ngOnInit(): void {

    // Recogemos todas las candidaturas
    this.candidaturesService.getCandidatures().subscribe(result => {
      this.allCandidatures = result;

      // Calculamos las paginas totales
      this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

      // Cambiamos las candidaturas a mostrar
      this.onPageChanged(1);
    });

  }

  // Actualiza las candidaturas a mostrar
  onPageChanged(newPage: number) {

    // Recibimos la nueva pagina y actualizamos la actual a esta
    this.currentPage = newPage;

    // Calcula los indices y actualiza la lista de candidaturas a mostrar
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCandidatures = this.allCandidatures.slice(startIndex, endIndex);
  }

}
