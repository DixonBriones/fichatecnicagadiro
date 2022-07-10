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

  listarSoftware() {
    return this.http.get(`${this.URL}/listarSoftware`);
  }
  listarDepartamento() {
    return this.http.get(`${this.URL}/listarDepartamento`);
  }
  listarTipoOrdenador() {
    return this.http.get(`${this.URL}/listarTipoOrdenador`);
  }
  insertarOrdenador(body:FormData) {
    return this.http.post(`${this.URL}/insertOrdenador`,body);
  }

  deleteOrdenador(id:any){
    return this.http.delete(`${this.URL}/deleteOrdenador/${id}`);
  }
  busquedaSerial(serial:any){
    return this.http.get(`${this.URL}/busquedaserial/${serial}`);
  }

  busquedaID(serial:any){
    return this.http.get(`${this.URL}/busquedaId/${serial}`);
  }
  modificarOrdenadorID(body:any,id:any){
    return this.http.put(`${this.URL}/modificarordenador/${id}`,body);
  }



}
