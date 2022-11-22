import { AuditoriaComponent } from './../aut/auditoria/auditoria.component';
import { Auditoria } from './../../_model/aut/auditoria';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { USUARIO, OK, COD_APORTE } from './../../_util/var.constant';
import { Router } from '@angular/router';
import { SolicitudService } from '../../_service/solicitud.service';
import { SocioService } from '../../_service/socio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Socio } from './../../_model/socio';
import { Solicitud } from './../../_model/solicitud';
import { TransaccionConsulta } from './../../_model/dto/transaccion-consulta';
import { SolicitudDTO } from './../../_model/dto/solicitud-dto';
import { SolicitudStore } from './../../_model/dto/solicitud-store';
import { AmortizacionService } from '../../_service/amortizacion.service';
import { AmortizacionDialogComponent } from './amortizacion-dialog/amortizacion-dialog.component';
import { AmortizacionDTO } from './../../_model/dto/amortizacion-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  prestamoDTO: SolicitudDTO;
  formConsulta: FormGroup;

  socios: Socio[];
  socioSeleccionado: Socio;
  filteredSocio: Observable<any[]>;

  displayedColumns: string[] = ['numero', 'fecha', 'socio', 'garante', 'tipo', 'amortizacion', 'plazo', 'monto', 'saldo', 'acciones'];
  dataSource: MatTableDataSource<SolicitudStore>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private solicitudService: SolicitudService,
    private amortizacionService: AmortizacionService,
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
    this.prestamoDTO = new SolicitudDTO();
    this.dataSource = new MatTableDataSource(this.prestamoDTO.lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.solicitudService.mensaje.subscribe(data => {
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
    this.router.navigate(['prestamo', 'nuevo']);
  }

  consultar() {
    let consulta = new TransaccionConsulta();
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
    
    this.solicitudService.filtrar(consulta).subscribe(data => {
      this.prestamoDTO = data;
      this.dataSource = new MatTableDataSource(this.prestamoDTO.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.prestamoDTO.lista.length <= 0) {
        this.snackBar.open("No se encontraron resultados con los parametros ingresados.", null, { duration: 2000 });
      }
    });
  }

  anular(sl: Solicitud) {
    if (confirm("¿Está seguro de eliminar el aporte " + sl.numero + "?")) {
      this.solicitudService.eliminar(sl).subscribe(data => {
        if (data.codigo != OK) {
          this.snackBar.open(data.mensaje, null, { duration: 4000 });
          return;
        }
        this.consultar();
        this.snackBar.open("Solicitud eliminada correctamente", null, { duration: 4000 });
        this.dataSource = new MatTableDataSource(this.prestamoDTO.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  showAuditoria(obj: Solicitud) {
    let auditoria = new Auditoria();
    auditoria.tabla = 'solicitud';
    auditoria.idTabla = obj.id;
    auditoria.registro = '  Nro. ' + obj.numero;
    this.dialog.open(AuditoriaComponent, {
      data: auditoria
    });
  }

  showAmortizacion(sl: SolicitudStore) {
    let amtDTO = new AmortizacionDTO();
    this.amortizacionService.listBySolicitud(sl.id).subscribe(data => {
      amtDTO.lista = data;
      amtDTO.cliente = sl.socio;
      amtDTO.numeroPrestamo = sl.numero;
      this.dialog.open(AmortizacionDialogComponent, {
        data: amtDTO
      });
    });
  }

}