import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol: string = 'candidate';
  userId: number = 0;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.rol = this.tokenStorageService.getRole();
    this.userId = this.tokenStorageService.getUser();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}