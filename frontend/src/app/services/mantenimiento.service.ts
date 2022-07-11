import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
  private URL = 'http://localhost:3000/api/v1/mantenimiento';

  constructor(private http: HttpClient) {}

    mostrarMantenimiento(){
        return this.http.get(`${this.URL}/listarMantenimiento`);
    }
    
    mostrarTecnico(){
      return this.http.get(`${this.URL}/listarTecnico`);
    }
    mostrarOrdenador(){
      return this.http.get(`${this.URL}/listarOrdenador`);
    }
    insertMantenimiento(body:any){
      return this.http.post(`${this.URL}/insertMantenimiento`,body);
    }
    deleteMantenimiento(id:any){
      return this.http.delete(`${this.URL}/deleteMantenimiento/${id}`);
    }
    actualizarMantenimiento(id:any,body:any){
      return this.http.put(`${this.URL}/actualizarMantenimiento/${id}`,body);
    }
    getMantenimiento(id:any){
      return this.http.get(`${this.URL}/getMantenimientoid/${id}`);
    }


}