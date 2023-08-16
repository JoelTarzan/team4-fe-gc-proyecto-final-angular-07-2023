import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent {
  @Input() developer:any;
  @Input() additionalClass:any;
}
