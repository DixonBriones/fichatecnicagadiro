import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuarionombre:any;
  constructor(private cookieService: CookieService,public authService: AuthService, private router: Router) {   
    this.usuarionombre=this.cookieService.get('usuario');
  }

  ngOnInit(): void {
  }
  
  cerrarsesion(){
    this.cookieService.delete('usuario','/')
    this.cookieService.delete('token','/')
    this.router.navigate(['login']);
  }

}
