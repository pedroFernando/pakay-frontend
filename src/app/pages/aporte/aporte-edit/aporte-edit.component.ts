import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Socio } from '../../../_model/socio';
import { Caja } from '../../../_model/caja';
import { Transaccion } from '../../../_model/transaccion';
import { SocioService } from '../../../_service/socio.service';
import { CajaService } from '../../../_service/caja.service';
import { COD_APORTE, OK } from '../../../_util/var.constant';
import { TransaccionService } from '../../../_service/transaccion.service';
import { Documento } from '../../../_model/documento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-aporte-edit',
  templateUrl: './aporte-edit.component.html',
  styleUrls: ['./aporte-edit.component.css']
})
export class AporteEditComponent implements OnInit {
  formSocio: FormControl = new FormControl('');
  formCaja: FormControl = new FormControl('');
  formMes: FormControl = new FormControl('');
  fecha: Date = new Date();
  monto: number;
  socios: Socio[];
  meses: string[] = ['01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'];

  socioSeleccionado: Socio;
  cajaSeleccionada: Caja;
  mesSeleccionado: string;
  anio: number;
  filteredSocio: Observable<any[]>;
  cajas: Caja[];

  transaccion: Transaccion;

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private socioService: SocioService,
    private transaccionService: TransaccionService,
    private cajaService: CajaService) {
  }

  ngOnInit() {
    this.cargarListas();
    this.fecha.setHours(0);
    this.fecha.setMinutes(0);
    this.fecha.setSeconds(0);
    this.fecha.setMilliseconds(0);
    this.anio = new Date().getFullYear();
  }

  cargarListas() {
    this.socioService.listByEmpresa('S').subscribe(data => {
      this.socios = data;
      this.filteredSocio = this.formSocio.valueChanges
        .pipe(
          startWith(null),
          map(val => this.filterSocio(val))
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

  changeMes($event: EventEmitter<MatSelectChange>) {
    this.mesSeleccionado = this.formMes.value;
  }

  compareMeses(f1: string, f2: string): boolean {
    return f1 == f2;
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

  crearAporte() {
    let transaccion = new Transaccion();
    transaccion.caja = this.cajaSeleccionada;
    transaccion.documento = new Documento();
    transaccion.documento.id = COD_APORTE;
    transaccion.fecha = this.fecha;
    transaccion.socio = this.socioSeleccionado;
    transaccion.mes = this.mesSeleccionado+"/"+this.anio;
    transaccion.valor = this.monto;
    transaccion.descripcion = "Aporte " + this.socioSeleccionado.cedula + " " + transaccion.mes;
    this.transaccionService.registrar(transaccion).subscribe(data => {
      if (data.codigo === OK) {
        this.transaccionService.listByEmpresa().subscribe(aportes => {
          this.transaccionService.transaccionCambio.next(aportes);
          this.transaccionService.mensaje.next(data.mensaje);
        });
        this.router.navigate(['aporte'])
      } else {
        this.snackBar.open(data.mensaje, null, { duration: 2000 });
      }
    });
  }

}