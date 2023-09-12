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

  userApplyList!: User[];

  userslist:any[] = [];
  constructor(private aplicationsService:ApplicationsService){}
  
  
  ngOnInit(): void {
    this.aplicationsService.getByIdCandidaturemapUsers(this.idCandidature)
        .subscribe((result: User[]) => {
        this.userApplyList = result;
      });
  }

}
