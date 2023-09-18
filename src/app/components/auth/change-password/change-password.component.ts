import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: User | undefined;

  changePasswordForm: FormGroup = new FormGroup({});

  invalidPassword: boolean = false;
  successPasswordChange: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService) {

      this.changePasswordForm = this.formBuilder.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]],
        confirmNewPassword: ['', [Validators.required, this.matchPassword]]
      });
  }

  ngOnInit(): void {
    this.userService.getOneById(this.tokenStorageService.getUser()).subscribe(result => {
      this.user = result;
    });
  }

  onSubmit() {
    // Probamos de hacer un login para saber si ha puesto la contraseña actual correcta
    this.authService.login(this.user!.email, this.changePasswordForm.get('currentPassword')?.value).subscribe(result => {

      this.user!.password = this.changePasswordForm.get('newPassword')?.value;

      // Cambiamos la contraseña
      this.userService.changePassword(this.user!.id, this.user!).subscribe(() => {
        this.successPasswordChange = true;

      setTimeout(() => {
        this.successPasswordChange = false;
      }, 3000);
      });

    },
    error => {
      this.invalidPassword = true;

      setTimeout(() => {
        this.invalidPassword = false;
      }, 3000);
    });
  }

  matchPassword = (control: { value: any; }) => {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmNewPassword = control.value;
    
    if (newPassword !== confirmNewPassword) {
      return { 'passwordMismatch': true };
    }
    
    return null;
  }
}