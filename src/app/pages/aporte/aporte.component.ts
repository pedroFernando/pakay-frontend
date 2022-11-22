import { AuditoriaComponent } from './../aut/auditoria/auditoria.component';
import { Auditoria } from './../../_model/aut/auditoria';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { USUARIO, OK, COD_APORTE } from './../../_util/var.constant';
import { Router } from '@angular/router';
import { TransaccionService } from '../../_service/transaccion.service';
import { SocioService } from '../../_service/socio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Socio } from './../../_model/socio';
import { TransaccionConsulta } from './../../_model/dto/transaccion-consulta';
import { TransaccionDTO } from './../../_model/dto/transaccion-dto';
import { TransaccionStore } from './../../_model/dto/transaccion-store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-aporte',
  templateUrl: './aporte.component.html',
  styleUrls: ['./aporte.component.css']
})
export class AporteComponent implements OnInit {
  transaccionDTO: TransaccionDTO;
  formConsulta: FormGroup;

  socios: Socio[];
  socioSeleccionado: Socio;
  filteredSocio: Observable<any[]>;

  displayedColumns: string[] = ['socio', 'numero', 'fecha', 'periodo', 'monto', 'acciones'];
  dataSource: MatTableDataSource<TransaccionStore>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private transaccionService: TransaccionService,
    private socioService: SocioService,
    private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) {
    this.formConsulta = new FormGroup({
      socio: new FormControl(''),
      fechaDesde: new FormControl(new Date()),
      fechaHasta: new FormControl(new Date())
    });
  }

  ngOnInit() {
    this.transaccionDTO = new TransaccionDTO;
    this.dataSource = new MatTableDataSource(this.transaccionDTO.lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.transaccionService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 4000 });
    });
    this.cargarListas();
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
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

  nuevo() {
    this.router.navigate(['aporte', 'nuevo']);
  }

  consultar() {
    let consulta = new TransaccionConsulta();
    consulta.codDocumento = COD_APORTE;
    if (this.socioSeleccionado != null) {
      consulta.idSocio = this.socioSeleccionado.id;
    }
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
        this.snackBar.open("No se encontraron resultados con los parametros ingresados.", null, { duration: 2000 });
      }
    });
  }

  anular(tr: TransaccionStore) {
    if (confirm("¿Está seguro de eliminar el aporte " + tr.numero + "?")) {
      this.transaccionService.eliminar(tr.id).subscribe(data => {
        if (data.codigo != OK) {
          this.snackBar.open(data.mensaje, null, { duration: 4000 });
          return;
        }
        this.consultar();
        this.snackBar.open("Aporte eliminado correctamente", null, { duration: 4000 });
        this.dataSource = new MatTableDataSource(this.transaccionDTO.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
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

}