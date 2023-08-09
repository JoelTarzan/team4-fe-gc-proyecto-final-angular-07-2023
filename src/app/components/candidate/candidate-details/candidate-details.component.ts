import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {

  name: string = "Laura";
  lastname: string = "Tarzán";
  email: string = "laura@gmail.com";
  tel: string = "644288990";


  constructor() {

  }
}
