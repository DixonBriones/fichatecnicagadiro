import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class FichaService {
  private URL = 'https://apigadiro.herokuapp.com/api/v1/ficha';

  constructor(private http: HttpClient) {}

    mostrarComponentes(id:any){
        return this.http.get(`${this.URL}/busquedaComponenteid/${id}`);
    }
    mostrarSoftware(id:any){
        return this.http.get(`${this.URL}/busquedaSoftwareid/${id}`);
    }
    mostrarOrdenador(id:any){
        return this.http.get(`${this.URL}/busquedaOrdenadorid/${id}`);
    }
    mostrarMantenimiento(id:any){
      return this.http.get(`${this.URL}/busquedaMantenimientoid/${id}`);
  }



}