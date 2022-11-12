import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Socio } from '../../../_model/socio';
import { Caja } from '../../../_model/caja';
import { SocioService } from '../../../_service/socio.service';
import { CajaService } from '../../../_service/caja.service';
import { OK } from '../../../_util/var.constant';
import { Solicitud } from '../../../_model/solicitud';
import { SolicitudService } from '../../../_service/solicitud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-prestamo-edit',
  templateUrl: './prestamo-edit.component.html',
  styleUrls: ['./prestamo-edit.component.css']
})
export class PrestamoEditComponent implements OnInit {
  formSocio: FormControl = new FormControl('');
  formGarante: FormControl = new FormControl('');
  formCaja: FormControl = new FormControl('');
  formClase: FormControl = new FormControl('');
  formTipo: FormControl = new FormControl('');
  fecha: Date = new Date();
  monto: number;
  plazo: number;
  interes: number;
  socios: Socio[];
  garantes: Socio[];
  clases: string[] = ['Alemana', 'Francesa'];
  tipos: string[] = ['Días', 'Quincenas', 'Meses',];

  socioSeleccionado: Socio;
  garanteSeleccionado: Socio;
  cajaSeleccionada: Caja;
  claseSeleccionada: string;
  tipoSeleccionado: string;
  filteredSocio: Observable<any[]>;
  filteredGarante: Observable<any[]>;
  cajas: Caja[];

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private socioService: SocioService,
    private solicitudService: SolicitudService,
    private cajaService: CajaService) {
  }

  ngOnInit() {
    this.cargarListas();
    this.fecha.setHours(0);
    this.fecha.setMinutes(0);
    this.fecha.setSeconds(0);
    this.fecha.setMilliseconds(0);
  }

  cargarListas() {
    this.socioService.listByEmpresa('S').subscribe(data => {
      this.socios = data;
      this.garantes = data;
      this.filteredSocio = this.formSocio.valueChanges
        .pipe(
          startWith(null),
          map(val => this.filterSocio(val))
        );
      this.filteredGarante = this.formGarante.valueChanges
        .pipe(
          startWith(null),
          map(val => this.filterGarante(val))
        );
    });
    
    this.cajaService.listByEmpresa().subscribe(data => {
      this.cajas = data;
    });
    
  }

  changeCaja($event: EventEmitter<MatSelectChange>) {
    this.cajaSeleccionada = this.formCaja.value;
  }

  compareCajas(f1: Caja, f2: Caja): boolean {
    return f1.id == f2.id && f1.nombre == f2.nombre;
  }

  changeClase($event: EventEmitter<MatSelectChange>) {
    this.claseSeleccionada = this.formClase.value;
  }

  compareClases(f1: string, f2: string): boolean {
    return f1 == f2;
  }

  changeTipo($event: EventEmitter<MatSelectChange>) {
    this.tipoSeleccionado = this.formTipo.value;
  }

  compareTipos(f1: string, f2: string): boolean {
    return f1 == f2;
  }

  amortizacion(amt: string): string {
    if(amt == 'Francesa'){
      return 'F';
    } else {
      return 'A';
    }
  }

  periodicidad(pd: string): string {
    if(pd == 'Días') {
      return 'D';
    } else if(pd == 'Quincenas') {
      return 'Q';
    } else {
      return 'M';
    }
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

  filterGarante(val: any) {
    if (val != null)
      if (val.id > 0) {
        return this.garantes.filter(option =>
          option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.cedula.toLowerCase().includes(val.cedula.toLowerCase()));
      } else {
        return this.garantes.filter(option =>
          option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.nombres.toLowerCase().includes(val.toLowerCase()) || option.cedula.toLowerCase().includes(val.toLowerCase()));
      }
  }

  seleccionarSocio(e) {
    this.socioSeleccionado = e.option.value;
  }

  displayFnSocio(val: Socio) {
    return val ? `${val.cedula} - ${val.apellidos} ${val.nombres}` : val;
  }

  seleccionarGarante(e) {
    this.garanteSeleccionado = e.option.value;
  }

  displayFnGarante(val: Socio) {
    return val ? `${val.cedula} - ${val.apellidos} ${val.nombres}` : val;
  }

  crearPrestamo() {
    let prestamo = new Solicitud();
    prestamo.caja = this.cajaSeleccionada;
    prestamo.socio = this.socioSeleccionado;
    prestamo.garante = this.garanteSeleccionado;
    prestamo.interes = this.interes;
    prestamo.fechaSolicitud = this.fecha;
    prestamo.fechaAprobacion = this.fecha;
    prestamo.monto = this.monto;
    prestamo.estado = 'A';
    prestamo.plazo = this.plazo;
    prestamo.amortizacion = this.amortizacion(this.claseSeleccionada);
    prestamo.tipo = this.periodicidad(this.tipoSeleccionado);
    prestamo.saldoFavor = 0;
    prestamo.saldoContra = 0;
    this.solicitudService.registrar(prestamo).subscribe(data => {
      if (data.codigo === OK) {
        this.solicitudService.listByEmpresa().subscribe(prest => {
          this.solicitudService.solicitudCambio.next(prest);
          this.solicitudService.mensaje.next(data.mensaje);
        });
        this.router.navigate(['prestamo'])
      } else {
        this.snackBar.open(data.mensaje, null, { duration: 2000 });
      }
    });
  }

}