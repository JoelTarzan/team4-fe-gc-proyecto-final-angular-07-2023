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
    this.user!.rating++;
    
    this.usersService.update(this.user!.id, this.user!).subscribe(result => {
      this.user = result;
    });
  }
}