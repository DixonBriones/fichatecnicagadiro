import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ComponenteService {
  private URL = 'https://apigadiro.herokuapp.com/api/v1/componente';

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
  deleteComponente(id:any) {
    return this.http.delete(`${this.URL}/eliminarComponente/${id}`);
  }
  componenteID(id:any) {
    return this.http.get(`${this.URL}/busquedaid/${id}`);
  }
  actualizarComponente(body:FormData,id:any) {
    return this.http.put(`${this.URL}/actualizarComponente/${id}`,body);
  }
  



}
