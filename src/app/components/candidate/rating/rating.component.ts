import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating: number = 0;
  arrows: boolean[] = [];

  constructor() {

  }

  ngOnInit(): void {
    
    let rate = this.rating;

    // Rellena el array de arrows segun la valoracion que se indique
    for (let i = 0; i < 5; i++) {
      rate > 0 ? this.arrows.push(true) : this.arrows.push(false);
      rate--;
    }

  }
  
}
