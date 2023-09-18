import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ApplicationsService } from 'src/app/services/applications.service';
import { CandidaturesService } from 'src/app/services/candidatures.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-candidature-list',
  templateUrl: './candidature-list.component.html',
  styleUrls: ['./candidature-list.component.css']
})
export class CandidatureListComponent implements OnInit {

  roleuser: any;
  iduser: any;

  allCandidatures: any;
  displayedCandidatures: any[] = [];

  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  optionSelected: string="seleccione filtro";
  searchTxtOption!: string;

  //"Subject" emite valores al mismo tiempo puede suscribirse a el para recibir esos valores. 
  searchTextChanged = new Subject<string>();

  constructor(
    private candidaturesService: CandidaturesService,
    private tokenStorageService: TokenStorageService,
    private applicationService: ApplicationsService
  ) {

  }

  ngOnInit(): void {
    this.iduser=this.tokenStorageService.getUser();
    this.roleuser=this.tokenStorageService.getRole();

    if (this.roleuser == "rrhh" || this.roleuser == "admin") {
      this.getAllDefault();
    }else if(this.roleuser == "candidate"){
      // Recogemos todas las candidaturas
      this.applicationService.getByIdUserMapCandidatures(this.iduser).subscribe(result => {
        this.allCandidatures = result;
        

        // Calculamos las paginas totales
        this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

        // Cambiamos las candidaturas a mostrar
        this.onPageChanged(1);
      });
    }

     // Configura el observable para retrasar la búsqueda
     this.searchTextChanged.pipe(
      debounceTime(1000) //1seg.
    ).subscribe(() => {
      this.searchOption();
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

  onSearchInputChange() {
    // Cuando el valor de búsqueda cambia, notifica al observable
    this.searchTextChanged.next(this.searchTxtOption);
  }

  filterChange(){
    switch (this.optionSelected) {
      case "0":
        // Recogemos todas las candidaturas
        this.candidaturesService.getAllNameASC().subscribe(result => {
          this.allCandidatures = result;

          // Calculamos las paginas totales
          this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

          // Cambiamos las candidaturas a mostrar
          this.onPageChanged(1);
        });
        
        break;
      case "1":
        // Recogemos todas las candidaturas
        this.candidaturesService.getAllNameDESC().subscribe(result => {
          this.allCandidatures = result;

          // Calculamos las paginas totales
          this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

          // Cambiamos las candidaturas a mostrar
          this.onPageChanged(1);
        });
        break;
      case "2":
        // Recogemos todas las candidaturas
        this.candidaturesService.getAllOrderOpen().subscribe(result => {
          this.allCandidatures = result;

          // Calculamos las paginas totales
          this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

          // Cambiamos las candidaturas a mostrar
          this.onPageChanged(1);
        });
        break;
      case "3":
        // Recogemos todas las candidaturas
        this.candidaturesService.getAllOrderClose().subscribe(result => {
          this.allCandidatures = result;

          // Calculamos las paginas totales
          this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

          // Cambiamos las candidaturas a mostrar
          this.onPageChanged(1);
        });
        break;
      default:
        this.getAllDefault();
        break;
    }
  }

  searchOption(){
    //Limpia el filtro ya que se usa el buscador
    this.optionSelected="seleccione filtro";

    //Para evitar errores cuando el texto del buscador este vacio pondra el metodo getAll
    if(this.searchTxtOption==""){

      this.getAllDefault();
    }else{

      // Recogemos todas las candidaturas
      this.candidaturesService.getStartingWith(this.searchTxtOption).subscribe(result => {
        this.allCandidatures = result;

        // Calculamos las paginas totales
        this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

        // Cambiamos las candidaturas a mostrar
        this.onPageChanged(1);
      });
    }  
  }

  //Metodo creado para no tener el mismo codigo 3 veces
  getAllDefault(){

      // Recogemos todas las candidaturas
      this.candidaturesService.getAll().subscribe(result => {
        this.allCandidatures = result;

        // Calculamos las paginas totales
        this.totalPages = Math.ceil(this.allCandidatures.length / this.itemsPerPage);

        // Cambiamos las candidaturas a mostrar
        this.onPageChanged(1);
      });
  }

}
