import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEY_KEY: string = 'auth-token';
  USER_ID: string = 'auth-user';
  ROLE: string = 'auth-role';

  constructor(private jwtHelperService: JwtHelperService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEY_KEY);
    window.sessionStorage.setItem(this.TOKEY_KEY, token);

    if (token) {

      try {
        const decodedToken = this.jwtHelperService.decodeToken(token);

        window.sessionStorage.removeItem(this.USER_ID);
        window.sessionStorage.setItem(this.USER_ID, decodedToken.user_id);

        window.sessionStorage.removeItem(this.ROLE);
        window.sessionStorage.setItem(this.ROLE, decodedToken.role.name);

      } catch (error) {
        
        console.log(error);
      }
    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEY_KEY);
  }

  public getUser(): any {
    return window.sessionStorage.getItem(this.USER_ID);
  }

  public getRole(): any {
    return window.sessionStorage.getItem(this.ROLE);
  }
}