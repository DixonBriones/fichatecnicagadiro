import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: null,
    password: null,
  };
  constructor(private authService: AuthService, private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  singIn() {
    this.authService.singin(this.user).subscribe((res: any) => {
      if (res.token == null) {
        alert("error")
      } else {
        this.cookieService.set('usuario', res.usauario)
        this.cookieService.set('token', res.token);
        this.router.navigate(['/','inventario']);
      }
    });
  }
}
