import { Component, OnInit } from '@angular/core';
import { OrdenadorService } from 'src/app/services/ordenador.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  ordenador:any=[]
  constructor( private ordenadorService: OrdenadorService) { }

  ngOnInit(): void {
    this.ListarOrdenadores()
  }
  ListarOrdenadores() {
    this.ordenadorService.listarOrdenadores().subscribe((res)=>{
      this.ordenador=res
    })
    
  }

}
