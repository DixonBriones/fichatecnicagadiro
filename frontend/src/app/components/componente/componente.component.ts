import { Component, OnInit } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';



@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

  constructor(private componenteServive:ComponenteService) { }

  componente:any=[]
  marca:any=[]
  tipoComponente:any=[]
  nuevoComponente:any={}
  private fileTmp:any;

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
    this.componenteServive.insertComponente(body).subscribe((res)=>{
      this.ListarComponentes();
      $('#cerrarboton').trigger( "click" );
    })
  }

  getFile($event:any){
    const[file]=$event.target.files
    this.fileTmp= {
      fileRaw:file,
      fileName:file.name
    }
  }

  mostrarid(id:any){
    alert(id)    
  }

}
