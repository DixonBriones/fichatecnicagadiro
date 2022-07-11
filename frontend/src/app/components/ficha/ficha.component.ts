import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FichaService} from 'src/app/services/ficha.service'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  listaComponentes:any=[]
  listaSoftware:any=[]
  ordenador:any
  public id:any;
  constructor(private route:ActivatedRoute, private fichaService: FichaService) { 
    this.id=this.route.snapshot.params['id'];
  }
  

  ngOnInit(): void {
    this.MostarComponentes()
    this.MostarSoftware()
    this.MostarOrdenador()
  }

  MostarComponentes(){
    this.fichaService.mostrarComponentes(this.id).subscribe((res)=>{
      this.listaComponentes=res
      console.log(this.listaComponentes)
    })
  }
  MostarSoftware(){
    this.fichaService.mostrarSoftware(this.id).subscribe((res)=>{
      this.listaSoftware=res
      console.log(this.listaSoftware)
    })
  }
  MostarOrdenador(){
    this.fichaService.mostrarOrdenador(this.id).subscribe((res)=>{
      this.ordenador=res
      console.log(this.ordenador)
    })
  }

  crearPdf(){
        // Extraemos el
        const DATA:any = document.getElementById('FichaTecnica');
        const doc = new jsPDF('p', 'pt', 'a4');
        const options = {
          background: 'white',
          scale: 2,
          allowTaint: true,
          useCORS:true
        };
        html2canvas(DATA, options).then((canvas) => {
    
          const img = canvas.toDataURL('image/jpeg',0.9);
    
          // Add image Canvas to PDF
          const bufferX = 20;
          const bufferY =20;
          const imgProps = (doc as any).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
          return doc;
        }).then((docResult) => {
          docResult.save(`Ficha${new Date().toISOString()}.pdf`);
        });
    
  }

}
