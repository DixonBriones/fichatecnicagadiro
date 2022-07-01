import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { MarcaComponent } from './components/marca/marca.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { OrdenadorComponent } from './components/ordenador/ordenador.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MarcaComponent,
    InventarioComponent,
    FooterComponent,
    OrdenadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
