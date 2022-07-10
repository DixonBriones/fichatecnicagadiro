import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OrdenadorService } from 'src/app/services/ordenador.service';
import { ComponenteService } from 'src/app/services/componente.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  ordenador:any=[]
  componenteLista:any=[]
  softwareLista:any=[]
  departamentoLista:any=[]
  tipoOrdenadorLista:any=[]
  alertPlaceholder:any
  private fileTmp:any=null;
  public nuevoOrdenadorForm: FormGroup;
  modificarOrdenador:any={}

  constructor( private componenteService: ComponenteService ,
    private ordenadorService: OrdenadorService, 
    private formBuilder:FormBuilder) { 

    this.nuevoOrdenadorForm=this.formBuilder.group({
      serie:[''],
      fechaAquisicion:[''],
      fechaFinGarantia:[''],
      departamento:[''],
      tipoordenador:[''],
      componentes: this.formBuilder.array([
        this.formBuilder.group({
          componenteid:'',
          componenteserial:''
        })
      ]),
      softwares: this.formBuilder.array([
        this.formBuilder.group({
          softwareid:''
        })
      ])
    });
  }
  
  get form(){
    return this.nuevoOrdenadorForm.controls;
  }
  get formulario(){
    return this.nuevoOrdenadorForm.value;
  }

  get componentes(){
    return this.nuevoOrdenadorForm.get('componentes') as FormArray
  }
  get softwares(){
    return this.nuevoOrdenadorForm.get('softwares') as FormArray
  }

  observador = {
    next: (res: any) => {this.alerta(res.msg,'success')},
    error: (err:any) => {
      const {error}=err; 
      this.alerta(error.msg,'danger')
    },
    complete: () => this.ListarOrdenadores(),
  };


  ngOnInit(): void {
    this.ListarOrdenadores()
    this.ListarComponentes()
    this.ListarSoftware()
    this.ListarDepartamento()
    this.ListarTipoOrdenador()
  }

  ListarOrdenadores() {
    this.ordenadorService.listarOrdenadores().subscribe((res)=>{
      this.ordenador=res
    }) 
  }
  InsertarOrdenador(){
    const body = new FormData();
    body.append("serie",this.formulario.serie)
    body.append("departamento",this.formulario.departamento)
    body.append("tipoordenador",this.formulario.tipoordenador)
    body.append("fechaAquisicion",this.formulario.fechaAquisicion)
    body.append("fechaFinGarantia",this.formulario.fechaFinGarantia)
    body.append("imagen",this.fileTmp.fileRaw)
    this.componentes.value.forEach((item:any) => {body.append("componentes[]", JSON.stringify(item))})
    this.softwares.value.forEach((item:any) => {body.append("softwares[]", JSON.stringify(item))})
    this.ordenadorService.insertarOrdenador(body).subscribe((res)=>{
      this.ListarOrdenadores();
      this.fileTmp= null
      $('#cerrarboton').trigger( "click" );
      this.refrescar();
    })
    
  }

  ListarComponentes() {
    this.componenteService.listarComponentes().subscribe((res)=>{
      this.componenteLista=res
    })
  }

  ListarSoftware() {
    this.ordenadorService.listarSoftware().subscribe((res)=>{
      this.softwareLista=res
    })
  }

  ListarDepartamento() {
    this.ordenadorService.listarDepartamento().subscribe((res)=>{
      this.departamentoLista=res
    })
  }

  ListarTipoOrdenador() {
    this.ordenadorService.listarTipoOrdenador().subscribe((res)=>{
      this.tipoOrdenadorLista=res
    })
  }
  DeleteOrdenador(id:any){
    this.ordenadorService.deleteOrdenador(id).subscribe(this.observador)   
  }
  OrdenadorID(id:any){
    this.ordenadorService.busquedaID(id).subscribe((res: any)=>{
      this.modificarOrdenador=res[0]
    })  
  }
  ModificarOrdenador(id:any){
    const body = {
      "departamento":this.modificarOrdenador.ordenador_departamentoid,
      "estado":this.modificarOrdenador.ordenador_estado
    }
    console.log(body)
    console.log(this.modificarOrdenador.ordenador_departamentoid)
    console.log(this.modificarOrdenador.ordenador_estado)
    this.ordenadorService.modificarOrdenadorID(body,id).subscribe((res)=>{
      this.ListarOrdenadores();
      $('#cerrarboton2').trigger( "click" );
    })
  }

  addcomponente(){
    const componenteFormGroup = this.formBuilder.group({
      componenteid:'',
      componenteserial:''
    })
    this.componentes.push(componenteFormGroup)
  }

  removecomponente(index:number){
    this.componentes.removeAt(index)
  }

  addsoftware(){
    const softwareFormGroup = this.formBuilder.group({
      softwareid:''
    })
    this.softwares.push(softwareFormGroup)
  }

  removesoftware(index:number){
    this.softwares.removeAt(index)
  }

  getFile($event:any){
    const[file]=$event.target.files
    this.fileTmp= {
      fileRaw:file,
      fileName:file.name
    }
  }

  refrescar(){
    this.nuevoOrdenadorForm.patchValue({
      serie:'',
      fechaAquisicion:'',
      fechaFinGarantia:'',
      departamento:'',
      tipoordenador:''
    });
    this.softwares.reset()
    this.componentes.reset()
    
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
