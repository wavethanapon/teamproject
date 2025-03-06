import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '..//../app/login/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe((users) => {
      const user = users.find((u: any) => u.email === this.email);

      if (user) {
        alert('Login Success!');
        localStorage.setItem('authToken', JSON.stringify(user));
        window.location.href = '/dashboard'; // ✅ เปลี่ยนเส้นทางไปหน้า Dashboard
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
