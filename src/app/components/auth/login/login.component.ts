import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  notExistingEmail: boolean = false;
  invalidPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private tokenStorageService: TokenStorageService) {
      
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;

    // Busca primero el email, para ver si existe un usuario con este email
    this.userService.getOneByEmail(email).subscribe(result => {
      
      if (result == null) {
        this.notExistingEmail = true;

        setTimeout(() => {
          this.notExistingEmail = false;
        }, 3000);
        
      } else {

        this.authService.login(email, password).subscribe(result => {
          this.tokenStorageService.saveToken(result.token);
          this.router.navigate(['']);
        },
        error => {
          this.invalidPassword = true;

          setTimeout(() => {
            this.invalidPassword = false;
          }, 3000);
        });
      }
    });
  }
}