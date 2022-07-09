import { Component, OnInit } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';



@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

  constructor(private componenteServive:ComponenteService) { }
  

  observador = {
    next: (res: any) => {this.alerta(res.msg,'success')},
    error: (err:any) => {
      const {error}=err; 
      this.alerta(error.msg,'danger')
    },
    complete: () => this.ListarComponentes(),
  };
  componente:any=[]
  modificarComponente:any={}
  marca:any=[]
  tipoComponente:any=[]
  nuevoComponente:any={}
  private fileTmp:any=null;
  alertPlaceholder:any

  ngOnInit(): void {
    this.ListarComponentes();
    this.ListarMarcas();
    this.ListarTipoComponentes();
  }
  
  ListarComponentes() {
    this.componenteServive.listarComponentes().subscribe((res)=>{
      this.componente=res
    })
  }
  ListarMarcas() {
    this.componenteServive.listarMarcas().subscribe((res)=>{
      this.marca=res
    })
  }
  ListarTipoComponentes() {
    this.componenteServive.listarTipoComponentes().subscribe((res: any)=>{
      this.tipoComponente=res
    })
  }
  GuardarComponente(){
    const body = new FormData();
    body.append("nombre",this.nuevoComponente.nombre)
    body.append("marca",this.nuevoComponente.marca)
    body.append("tipo",this.nuevoComponente.tipo)
    body.append("imagen",this.fileTmp.fileRaw)
    console.log(body)
    this.componenteServive.insertComponente(body).subscribe((res)=>{
      this.ListarComponentes();
      this.fileTmp= null
      $('#cerrarboton').trigger( "click" );
    })
  }

  DeleteComponente(id:any){
    this.componenteServive.deleteComponente(id).subscribe(this.observador)   
  }
  ComponenteID(id:any){
    this.componenteServive.componenteID(id).subscribe((res: any)=>{
      this.modificarComponente=res[0]
    })  
  }

  ModificarComponente(id:any){
    const body = new FormData();
    body.append("nombre",this.modificarComponente.componente_nombre)
    body.append("marca",this.modificarComponente.componente_marcaid)
    body.append("tipo",this.modificarComponente.componente_tipoid)
    body.append("fotoactual",this.modificarComponente.componente_fotourl)
    if(this.fileTmp){
      body.append("imagen",this.fileTmp.fileRaw)
    }
    console.log(body)
    this.componenteServive.actualizarComponente(body,id).subscribe((res)=>{
      this.ListarComponentes();
      this.fileTmp= null
      $('#cerrarboton2').trigger( "click" );
    })

  }

  getFile($event:any){
    const[file]=$event.target.files
    this.fileTmp= {
      fileRaw:file,
      fileName:file.name
    }
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
