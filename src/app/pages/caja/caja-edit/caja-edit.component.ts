import { CatalogoItemService } from '../../../_service/catalogo-item.service';
import { CatalogoItem } from '../../../_model/catalogo-item';
import { OK, EMPRESA } from '../../../_util/var.constant';
import { CajaService } from '../../../_service/caja.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../_model/caja';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-caja-edit',
  templateUrl: './caja-edit.component.html',
  styleUrls: ['./caja-edit.component.css']
})
export class CajaEditComponent implements OnInit {
  caja: Caja;
  form: FormGroup;
  tipo: CatalogoItem[];
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private cajaService: CajaService,
    private catalogoItemService: CatalogoItemService) {
    this.caja = new Caja();
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(''),
      monto: new FormControl('')
    });
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this.cajaService.edit) {
      this.cajaService.getById().subscribe(data => {
        this.caja = data;
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          monto: new FormControl(data.monto)
        });
      });
    }
  }

  operar() {
    this.caja.id = this.form.value['id'];
    this.caja.nombre = this.form.value['nombre'];
    this.caja.monto = this.form.value['monto'];
  
    if (this.cajaService.edit) {
      //update
      this.cajaService.modificar(this.caja).subscribe(data => {
        if (data.codigo === OK) {
          this.cajaService.getAll().subscribe(cajas => {
            this.cajaService.cajaCambio.next(cajas);
            this.cajaService.mensaje.next(data.mensaje);
          });
          this.router.navigate(['caja'])
        } else {
          this.snackBar.open(data.mensaje, null, { duration: 2000 });
        }
      });
    } else {
      //insert
      let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
      this.caja.idEmpresa = empresa.id;
      this.cajaService.registrar(this.caja).subscribe(data => {
        if (data.codigo === OK) {
          this.cajaService.getAll().subscribe(cajas => {
            this.cajaService.cajaCambio.next(cajas);
            this.cajaService.mensaje.next(data.mensaje);
          });
          this.router.navigate(['caja'])
        } else {
          this.snackBar.open(data.mensaje, null, { duration: 2000 });
        }
      });
    }

    
  }

}
