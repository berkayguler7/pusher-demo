// login.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  async login() {
    this.authService.login(this.email, this.password).subscribe((response: any) => {
      console.log("login response", response);
      if (response) {
        localStorage.setItem('accessToken', response.accessToken);
        document.cookie = `refreshToken=${response.refreshToken}`;
        this.router.navigateByUrl('/chat');
      }
    });
  }
}
