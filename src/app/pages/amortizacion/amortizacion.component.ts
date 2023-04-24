import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Amortizacion } from './../../_model/amortizacion';
import { AmortizacionService } from '../../_service/amortizacion.service';
import { AmortizacionConsulta } from './../../_model/dto/amortizacion-consulta';
import * as XLSX from 'xlsx';
import { AmortizacionReporte } from './../../_model/rep/amortizacion-reporte';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {
  lista: Amortizacion[];
  listaRep: AmortizacionReporte[];
  formConsulta: FormGroup;
  totalCapital: number = 0.00;
  totalInteres: number = 0.00;
  totalCuota: number = 0.00;
  activar: Boolean;
  clases: string[] = ['Francesa', 'Alemana'];
  tipos: string[] = ['Días', 'Quincenas', 'Meses'];

  claseSeleccionada: string;
  tipoSeleccionado: string;

  displayedColumns: string[] = ['numero', 'fecha', 'capital', 'interes', 'cuota', 'saldo'];
  dataSource: MatTableDataSource<Amortizacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private amortizacionService: AmortizacionService,
    private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) {
    this.formConsulta = new FormGroup({
      clase: new FormControl(''),
      tipo: new FormControl(''),
      monto: new FormControl(''),
      interes: new FormControl(''),
      plazo: new FormControl(''),
      fecha: new FormControl(new Date())
    });
  }

  ngOnInit() {
    this.lista = new Array();
    this.listaRep = new Array();
    this.activar = true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  changeClase($event: EventEmitter<MatSelectChange>) {
    this.claseSeleccionada = this.formConsulta.value['clase'];
  }

  compareClases(f1: string, f2: string): boolean {
    return f1 == f2;
  }

  changeTipo($event: EventEmitter<MatSelectChange>) {
    this.tipoSeleccionado = this.formConsulta.value['tipo'];
  }

  compareTipos(f1: string, f2: string): boolean {
    return f1 == f2;
  }

  consultar() {
    let consulta = new AmortizacionConsulta();
    if (this.formConsulta.value['fecha'] != null && this.formConsulta.value['fecha'] != '') {
      consulta.fecha = this.formConsulta.value['fecha'];
    }
    consulta.clase = this.formConsulta.value['clase'];
    consulta.interes = this.formConsulta.value['interes'];
    consulta.monto = this.formConsulta.value['monto'];
    consulta.plazo = this.formConsulta.value['plazo'];
    consulta.tipo = this.formConsulta.value['tipo'];
    this.amortizacionService.simular(consulta).subscribe(data => {
      this.lista = data;
      this.totalCapital = this.lista[Number(consulta.plazo)+1].capital;
      this.totalInteres = this.lista[Number(consulta.plazo)+1].interes;
      this.totalCuota = this.lista[Number(consulta.plazo)+1].cuota;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.lista.length <= 0) {
        this.activar = true;
        this.snackBar.open("No se pudo realizar la simulación.", null, { duration: 2000 });
      } else {
        this.activar = false;
      }
    });
  }

  listaReporte(){
    let doc = new AmortizacionReporte();
    this.listaRep = new Array();
    for (var i = 0; i < this.lista.length; i++) {
      doc = new AmortizacionReporte();
      doc.Numero = this.lista[i].numero;
      doc.Fecha = this.lista[i].fecha;
      doc.Capital = Math.floor(this.lista[i].capital * 100) / 100;
      doc.Interes = Math.floor(this.lista[i].interes * 100) / 100;
      doc.Cuota = Math.floor(this.lista[i].cuota * 100) / 100;
      doc.Saldo = Math.floor(this.lista[i].saldo * 100) / 100;
      this.listaRep.push(doc);
    }
  }

  exportAsExcelFile(): void {
    this.listaReporte();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listaRep);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pakay');
    XLSX.writeFile(wb, 'Amortizacion_'+new Date().getTime()+'.xlsx');
  }

}