import { Component, OnInit } from '@angular/core';
import { UsersCandidacyService } from 'src/app/services/users-candidacy.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-postulated',
  templateUrl: './list-postulated.component.html',
  styleUrls: ['./list-postulated.component.css']
})
export class ListPostulatedComponent implements OnInit{
  idCandidature:any=1;

  idusers:any;

  userslist:any[] = [];
  constructor(private relationService:UsersCandidacyService, private userService:UsersService){}
  
  
  ngOnInit(): void {
    this.relationService.getIdUsers(this.idCandidature)
        .subscribe((result: any) => {
        /* console.warn(result); */
        // save data in array
        this.idusers = result;
        console.log(this.idusers);


        this.idusers.forEach((element: { idPostulatedUser: any; }) => {
          this.userService.getOneById(element.idPostulatedUser).subscribe((result: any) => {
            this.userslist.push(result);
            /* console.log(this.userslist.length); */
          });
          
        });
        
      });
  }

}
