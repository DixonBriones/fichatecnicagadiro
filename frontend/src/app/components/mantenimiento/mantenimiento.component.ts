import { Component, OnInit } from '@angular/core';
import {MantenimientoService} from 'src/app/services/mantenimiento.service'

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
  mantenimiento:any={}
  listaMatenimiento:any=[]
  listaTecnico:any=[]
  listaOrdenador:any=[]
  nuevoMantenimiento:any={}
  alertPlaceholder:any

  observador = {
    next: (res: any) => {this.alerta(res.msg,'success')},
    error: (err:any) => {
      const {error}=err; 
      this.alerta(error.msg,'danger')
      console.log(error)
    },
    complete: () => this.MostarMantenimiento(),
  };

  constructor(private mantenimientoService: MantenimientoService) { }

  ngOnInit(): void {
    this.MostarMantenimiento()
    this.MostarTecnico()
    this.MostarOrdenador()
  }

  MostarMantenimiento(){
    this.mantenimientoService.mostrarMantenimiento().subscribe((res)=>{
      this.listaMatenimiento=res
    })
  }

  MostarTecnico(){
    this.mantenimientoService.mostrarTecnico().subscribe((res)=>{
      this.listaTecnico=res
    })
  }
  MostarOrdenador(){
    this.mantenimientoService.mostrarOrdenador().subscribe((res)=>{
      this.listaOrdenador=res
    })
  }

  GuardarMantenimiento(){
    this.mantenimientoService.insertMantenimiento(this.nuevoMantenimiento).subscribe((res)=>{
      this.MostarMantenimiento();
      $('#cerrarboton').trigger( "click" );
    })
  }
  DeleteMantenimiento(id:any){
    this.mantenimientoService.deleteMantenimiento(id).subscribe(this.observador)   
  }
  GetMantenimiento(id:any){
    this.mantenimientoService.getMantenimiento(id).subscribe((res: any)=>{
      this.mantenimiento=res[0]
    })  
  }
  ActualizarMantenimiento(id:any){
    this.mantenimientoService.actualizarMantenimiento(id,this.mantenimiento).subscribe((res:any)=>{
      this.MostarMantenimiento();
      $('#cerrarboton2').trigger( "click" );
    })
  }

  alerta = (message:any, type:any) => {
    this.alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    this.alertPlaceholder.append(wrapper)
  }
}
