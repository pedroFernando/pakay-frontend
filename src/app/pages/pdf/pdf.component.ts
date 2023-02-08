import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ReporteDTO } from './../../_model/reporte-dto';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  pdfSrc: string = '';
  constructor(public dialogRef: MatDialogRef<PdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReporteDTO) { }

  ngOnInit() {
    let reader = new FileReader();
    reader.onload = (e:any)=>{
      this.pdfSrc = e.target.result;
    }
    reader.readAsArrayBuffer(this.data.pdf);
  }

  descargar() {
      const url = window.URL.createObjectURL(this.data.pdf);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = this.data.nombre+'.pdf';
      a.click();
      return url;
  }

}
