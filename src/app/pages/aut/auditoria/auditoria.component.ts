import { AuditoriaService } from './../../../_service/aut/auditoria.service';
import { Auditoria } from './../../../_model/aut/auditoria';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {
  entidad: string = '';
  objeto: string = '';
  displayedColumns: string[] = ['fecha', 'accion', 'registro', 'ip', 'aplicacion', 'usuario'];
  dataSource: MatTableDataSource<Auditoria>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<AuditoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Auditoria,
    private auditoriaService: AuditoriaService) { }

  ngOnInit() {
    this.objeto = this.data.registro;
    this.auditoriaService.listar(this.data.tabla, this.data.idTabla).subscribe(x => {
      if(x.length > 0){
        this.entidad = x[0].entidad;
      }
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
    });
  }

}
