import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol: string = 'candidate';
  currentPage: string = '';

  constructor( 
    private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.currentPage = event.url;
        
      }
    });
  }

}
