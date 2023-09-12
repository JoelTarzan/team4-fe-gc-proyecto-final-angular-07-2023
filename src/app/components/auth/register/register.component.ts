import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  usedEmail: boolean = false;
  successfulRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private userService: UsersService) {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchPassword]]
    });
  }

  ngOnInit(): void {
    
  }

  matchPassword = (control: { value: any; }) => {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = control.value;
    
    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    
    return null;
  }

  onSubmit() {
    const name: string = this.registerForm.get('name')?.value;
    const email: string = this.registerForm.get('email')?.value;
    const password: string = this.registerForm.get('password')?.value;

    // Busca primero el email, para ver si existe ya un usuario con este email
    this.userService.getOneByEmail(email).subscribe(result => {
      
      if (result == null) {
        this.authService.register(name, email, password).subscribe(result => {
          this.successfulRegister = true;
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        });
        
      } else {
        this.usedEmail = true;

        setTimeout(() => {
          this.usedEmail = false;
        }, 3000);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}