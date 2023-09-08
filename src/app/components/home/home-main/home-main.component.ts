import { Component, OnInit } from '@angular/core';
import { CandidaturesService } from 'src/app/services/candidatures.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  candidatures: any;
  numberOfCandidatures: number = 0;

  constructor(
    private candidaturesService: CandidaturesService) {

  }

  ngOnInit(): void {
    this.candidaturesService.getAll().subscribe(result => {
      this.candidatures = result;
      this.numberOfCandidatures = this.candidatures.length; 
    })
  }

}
