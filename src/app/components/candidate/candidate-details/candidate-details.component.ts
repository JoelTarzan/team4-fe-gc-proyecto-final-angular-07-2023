import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application';
import { User } from 'src/app/models/user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  idCandidate: number = 0;
  user: User | undefined;

  selectedRating: number = 0;

  applications: Application[] = [];

  activeTab: number = 2; // Pestaña activa por defecto

  constructor(
    private routeActive: ActivatedRoute, 
    private usersService: UsersService,
    private applicationsService: ApplicationsService) {

  }

  ngOnInit(): void {
    /* Recoge la ruta atual y el parametro id */ 
    this.routeActive.params.subscribe(params => {
      this.idCandidate = params['id'] || null;
      
      this.usersService.getOneById(this.idCandidate).subscribe(result => {

        this.user = result;
        this.selectedRating = this.user.rating;
      });

      this.applicationsService.getByIdUser(this.idCandidate).subscribe(result => {

        this.applications = result;
      });
    });
  }

  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  // Controla el cambio de valoración
  onChangeRating() {
    this.user!.rating = this.selectedRating;
    
    this.usersService.update(this.user!.id, this.user!).subscribe(result => {
      this.user = result;
    });
  }

  // Transforma la imagen
  getAvatarUrl(user: User) {
    if (user?.avatar && user?.avatar.length > 0) {
      
      // Creamos una URL de datos (Data URL) a partir de la cadena Base64
      return `data:image/png;base64,${user?.avatar}`; // Cambia 'image/png' al tipo de imagen correcto si es diferente
    }

    return null;
  }
}