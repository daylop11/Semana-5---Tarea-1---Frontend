import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: radial-gradient(circle at top left, #0f2027, #0a192f, #081120);
      font-family: 'Segoe UI', sans-serif;
      color: white;
    }

    .container {
      background: #162238;
      padding: 40px;
      width: 360px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 
        0 0 20px rgba(0, 183, 255, 0.4),
        0 0 60px rgba(0, 183, 255, 0.2);
      animation: fadeIn 0.6s ease-in-out;
    }

    .icon {
      font-size: 28px;
      margin-bottom: 10px;
    }

    h1 {
      margin: 0;
      color: #39bdf8;
      font-size: 26px;
    }

    .subtitle {
      font-size: 14px;
      color: #9fb3c8;
      margin-bottom: 25px;
    }

    input {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: none;
      background: #2a3a52;
      color: white;
      font-size: 14px;
    }

    input::placeholder {
      color: #9fb3c8;
    }

    input:focus {
      outline: 2px solid #39bdf8;
    }

    button {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: none;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      background: linear-gradient(90deg, #1ea7fd, #39bdf8);
      color: #081120;
      transition: 0.3s ease;
    }

    button:hover {
      transform: scale(1.03);
      box-shadow: 0 0 15px #39bdf8;
    }

    a {
      color: #39bdf8;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .error {
      color: #ff6b6b;
      margin-top: 10px;
      font-size: 13px;
    }

    .success {
      color: #4cd964;
      margin-top: 10px;
      font-size: 13px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RegisterComponent {

  username = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    if (!this.username || !this.password) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.authService.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.success = 'Usuario registrado correctamente';
        this.error = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: () => {
        this.error = 'Error al registrar usuario';
        this.success = '';
      }
    });
  }
}
