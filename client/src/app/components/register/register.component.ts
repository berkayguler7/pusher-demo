// register.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  async register() {
    this.authService.register(this.name, this.email, this.password).subscribe((response: any) => {
      // response.ok is not a valid property
      if (response) {
        document.cookie = `accessToken=${response.accessToken}`;
        document.cookie = `refreshToken=${response.refreshToken}`;
        this.router.navigate(['/chat']);
      }
    });
  }
}
