import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000/api/v1/user';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private cookieService: CookieService) {}

  singin(user: any) {
    return this.http.post(`${this.URL}/singin`, user);
  }

  //*Verificamos si existe una seccion activa del lado del servidor
  isAuth(): boolean {
    const token = this.cookieService.get('token');
    //console.log(token);
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      //console.log(token);
      return false;
    }

    return true;
  }
}
