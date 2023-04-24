import { AuditoriaComponent } from './../aut/auditoria/auditoria.component';
import { Auditoria } from './../../_model/aut/auditoria';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TransaccionService } from '../../_service/transaccion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionConsulta } from './../../_model/dto/transaccion-consulta';
import { TransaccionDTO } from './../../_model/dto/transaccion-dto';
import { TransaccionStore } from './../../_model/dto/transaccion-store';
import { TransaccionReporte } from './../../_model/rep/transaccion-reporte';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  transaccionDTO: TransaccionDTO;
  formConsulta: FormGroup;
  listaRep: TransaccionReporte[];
  activar: Boolean;

  displayedColumns: string[] = ['documento', 'numero', 'socio', 'caja', 'fecha', 'ingreso', 'egreso', 'acciones'];
  dataSource: MatTableDataSource<TransaccionStore>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private transaccionService: TransaccionService,
    private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) {
    this.formConsulta = new FormGroup({
      fechaDesde: new FormControl(new Date()),
      fechaHasta: new FormControl(new Date())
    });
  }

  ngOnInit() {
    this.transaccionDTO = new TransaccionDTO;
    this.listaRep = new Array();
    this.activar = true;
    this.dataSource = new MatTableDataSource(this.transaccionDTO.lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.transaccionService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 4000 });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  consultar() {
    let consulta = new TransaccionConsulta();
    if (this.formConsulta.value['fechaDesde'] != null && this.formConsulta.value['fechaDesde'] != '') {
      consulta.fechaDesde = this.formConsulta.value['fechaDesde'];
      consulta.fechaDesde.setHours(0);
      consulta.fechaDesde.setMinutes(0);
      consulta.fechaDesde.setSeconds(0);
      consulta.fechaDesde.setMilliseconds(0);
    }
    if (this.formConsulta.value['fechaHasta'] != null && this.formConsulta.value['fechaHasta'] != '') {
      consulta.fechaHasta = this.formConsulta.value['fechaHasta'];
      consulta.fechaHasta.setHours(0);
      consulta.fechaHasta.setMinutes(0);
      consulta.fechaHasta.setSeconds(0);
      consulta.fechaHasta.setMilliseconds(0);
    }
    
    this.transaccionService.filtrar(consulta).subscribe(data => {
      this.transaccionDTO = data;
      this.dataSource = new MatTableDataSource(this.transaccionDTO.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.transaccionDTO.lista.length <= 0) {
        this.activar = true;
        this.snackBar.open("No se encontraron resultados con los parametros ingresados.", null, { duration: 2000 });
      } else {
        this.activar = false;
      }
    });
  }

  showAuditoria(obj: TransaccionStore) {
    let auditoria = new Auditoria();
    auditoria.tabla = 'transaccion';
    auditoria.idTabla = obj.id;
    auditoria.registro = '  Nro. ' + obj.numero;
    this.dialog.open(AuditoriaComponent, {
      data: auditoria
    });
  }

  listaReporte(){
    let doc = new TransaccionReporte();
    this.listaRep = new Array();
    for (var i = 0; i < this.transaccionDTO.lista.length; i++) {
      doc = new TransaccionReporte();
      doc.Numero = this.transaccionDTO.lista[i].numero;
      doc.Documento = this.transaccionDTO.lista[i].documento;
      doc.Caja = this.transaccionDTO.lista[i].caja;
      doc.Nombres = this.transaccionDTO.lista[i].nombres;
      doc.Periodo = this.transaccionDTO.lista[i].mes;
      doc.Fecha = this.transaccionDTO.lista[i].fecha;
      doc.Ingreso = this.transaccionDTO.lista[i].ingreso;
      doc.Egreso = this.transaccionDTO.lista[i].egreso;
      doc.Descripcion = this.transaccionDTO.lista[i].descripcion;
      this.listaRep.push(doc);
    }
  }

  exportAsExcelFile(): void {
    this.listaReporte();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listaRep);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pakay');
    XLSX.writeFile(wb, 'Transacciones_'+new Date().getTime()+'.xlsx');
  }

}