import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ComponenteService {
  private URL = 'http://localhost:3000/api/v1/componente';

  constructor(private http: HttpClient) {}

  listarComponentes() {
    return this.http.get(`${this.URL}/listar`);
  }
  listarMarcas() {
    return this.http.get(`${this.URL}/listarMarcas`);
  }
  listarTipoComponentes() {
    return this.http.get(`${this.URL}/listarTiposComponentes`);
  }
  insertComponente(body:FormData) {
    return this.http.post(`${this.URL}/insertComponente`,body);
  }



}
