import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Verificar si los campos están vacíos
    if (
      this.registerForm.get('username')?.value.trim() === '' ||
      this.registerForm.get('email')?.value.trim() === '' ||
      this.registerForm.get('password')?.value.trim() === '' ||
      this.registerForm.get('confirmPassword')?.value.trim() === ''
    ) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      alert('Las contraseñas no coinciden. Por favor, verifique.');
      return;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
