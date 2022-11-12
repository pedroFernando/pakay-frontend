import { OK } from '../../../_util/var.constant';
import { CajaService } from '../../../_service/caja.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../_model/caja';
import { CajaDTO } from '../../../_model/dto/caja-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-caja-ingreso-egreso',
  templateUrl: './caja-ingreso-egreso.component.html',
  styleUrls: ['./caja-ingreso-egreso.component.css']
})
export class CajaIngresoEgresoComponent implements OnInit {
  formCaja: FormControl = new FormControl('');
  caja: Caja;
  monto: number;
  motivo: string;
  tipo: string;
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
      if(this.cajaService.tipo == 'E'){
        this.tipo = 'Egreso';
      }else{
        this.tipo = 'Ingreso';
      }
    }
  }

  guardar() {
    let cajaDTO = new CajaDTO();
    cajaDTO.monto = this.monto;
    if(this.tipo == 'Egreso'){
      cajaDTO.cajaEgreso = this.caja;
      cajaDTO.tipo = 'E';
    }else{
      cajaDTO.cajaIngreso = this.caja;
      cajaDTO.tipo = 'I';
    }
    cajaDTO.motivo = this.motivo;
    this.cajaService.egresoIngreso(cajaDTO).subscribe(data => {
      if (data.codigo === OK) {
        this.cajaService.listByEmpresa().subscribe(caj => {
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