import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TransaccionService } from '../../_service/transaccion.service';
import { SocioService } from '../../_service/socio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Socio } from './../../_model/socio';
import { SocioEmpresaReporte } from './../../_model/rep/socio-empresa-reporte';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  lista: SocioEmpresaReporte[];
  formConsulta: FormGroup;

  socios: Socio[];
  socioSeleccionado: Socio;
  filteredSocio: Observable<any[]>;

  displayedColumns: string[] = ['descripcion', 'cantidad', 'valor'];
  dataSource: MatTableDataSource<SocioEmpresaReporte>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private transaccionService: TransaccionService,
    private socioService: SocioService,
    private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) {
    this.formConsulta = new FormGroup({
      socio: new FormControl('')
    });
  }

  ngOnInit() {
    this.lista = new Array();
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.transaccionService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 4000 });
    });
    this.cargarListas();
  }

  cargarListas() {
    this.socioService.getAll().subscribe(data => {
      this.socios = data;
      this.filteredSocio = this.formConsulta.controls['socio'].valueChanges
        .pipe(
          startWith(null),
          map(val => this.filterSocio(val))
        );
    });
  }

  filterSocio(val: any) {
    if (val != null)
      if (val.id > 0) {
        return this.socios.filter(option =>
          option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.cedula.toLowerCase().includes(val.cedula.toLowerCase()));
      } else {
        return this.socios.filter(option =>
          option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.nombres.toLowerCase().includes(val.toLowerCase()) || option.cedula.toLowerCase().includes(val.toLowerCase()));
      }
  }

  seleccionarSocio(e) {
    this.socioSeleccionado = e.option.value;
  }

  displayFnSocio(val: Socio) {
    return val ? `${val.cedula} - ${val.apellidos} ${val.nombres}` : val;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  consultar() {
    if (this.socioSeleccionado != null) {
      this.transaccionService.reporteSocio(this.socioSeleccionado.id).subscribe(data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.lista.length <= 0) {
          this.snackBar.open("No se encontraron resultados.", null, { duration: 2000 });
        }
      });
    } else {
      this.transaccionService.reporteEmpresa().subscribe(data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.lista.length <= 0) {
          this.snackBar.open("No se encontraron resultados.", null, { duration: 2000 });
        }
      });
    }
  }

}