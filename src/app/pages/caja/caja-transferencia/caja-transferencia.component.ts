import { OK } from '../../../_util/var.constant';
import { CajaService } from '../../../_service/caja.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Caja } from '../../../_model/caja';
import { CajaDTO } from '../../../_model/dto/caja-dto';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatLegacySelectChange as MatSelectChange } from '@angular/material/legacy-select';

@Component({
  selector: 'app-caja-transferencia',
  templateUrl: './caja-transferencia.component.html',
  styleUrls: ['./caja-transferencia.component.css']
})
export class CajaTransferenciaComponent implements OnInit {
  formCaja: FormControl = new FormControl('');
  caja: Caja;
  cajaSeleccionada: Caja;
  cajas: Caja[];
  monto: number;
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private cajaService: CajaService) {
    this.caja = new Caja();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this.cajaService.edit) {
      this.cajaService.getById().subscribe(data => {
        this.caja = data;
      });
    }
    this.cajaService.getAll().subscribe(data => {
      this.cajas = data;
    });
  }

  changeCaja($event: EventEmitter<MatSelectChange>) {
    this.cajaSeleccionada = this.formCaja.value;
  }

  compareCajas(f1: Caja, f2: Caja): boolean {
    return f1.id == f2.id && f1.nombre == f2.nombre;
  }

  transferir() {
    let cajaDTO = new CajaDTO();
    cajaDTO.cajaEgreso = this.caja;
    cajaDTO.cajaIngreso = this.cajaSeleccionada;
    cajaDTO.monto = this.monto;
    this.cajaService.transferir(cajaDTO).subscribe(data => {
      if (data.codigo === OK) {
        this.cajaService.getAll().subscribe(caj => {
          this.cajaService.cajaCambio.next(caj);
          this.cajaService.mensaje.next(data.mensaje);
        });
        this.router.navigate(['caja'])
      } else {
        this.snackBar.open(data.mensaje, null, { duration: 2000 });
      }
    });
  }

}