import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MarcaComponent } from './components/marca/marca.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { OrdenadorComponent } from './components/ordenador/ordenador.component';

//Modules
import { HttpClientModule } from '@angular/common/http';


//Providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { ComponenteComponent } from './components/componente/componente.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MarcaComponent,
    InventarioComponent,
    FooterComponent,
    OrdenadorComponent,
    ComponenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
