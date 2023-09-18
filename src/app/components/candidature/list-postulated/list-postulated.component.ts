import { Component, Input, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { User } from 'src/app/models/user';
import { ApplicationsService } from 'src/app/services/applications.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-postulated',
  templateUrl: './list-postulated.component.html',
  styleUrls: ['./list-postulated.component.css']
})
export class ListPostulatedComponent implements OnInit{
  @Input() idCandidature!: number;

  ApplyList!: Application[];

  userslist:any[] = [];
  constructor(private aplicationsService:ApplicationsService){}
  
  
  ngOnInit(): void {
    this.aplicationsService.getByIdCandidature(this.idCandidature)
        .subscribe((result: Application[]) => {

          this.ApplyList = result;

          
      });
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