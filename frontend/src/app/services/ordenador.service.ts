import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class OrdenadorService {
  private URL = 'http://localhost:3000/api/v1/ordenador';

  constructor(private http: HttpClient) {}

  listarOrdenadores() {
    return this.http.get(`${this.URL}/listar`);
  }



}
