import { CatalogoItemService } from '../../../_service/catalogo-item.service';
import { CatalogoItem } from '../../../_model/catalogo-item';
import { OK, EMPRESA } from '../../../_util/var.constant';
import { SocioService } from '../../../_service/socio.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Socio } from '../../../_model/socio';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-socio-edit',
  templateUrl: './socio-edit.component.html',
  styleUrls: ['./socio-edit.component.css']
})
export class SocioEditComponent implements OnInit {
  socio: Socio;
  form: FormGroup;
  tipo: CatalogoItem[];
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private socioService: SocioService,
    private catalogoItemService: CatalogoItemService) {
    this.socio = new Socio();
    this.form = new FormGroup({
      id: new FormControl(0),
      cedula: new FormControl(''),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl('')
    });
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this.socioService.edit) {
      this.socioService.getById().subscribe(data => {
        this.socio = data;
        this.form = new FormGroup({
          id: new FormControl(data.id),
          cedula: new FormControl(data.cedula),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          direccion: new FormControl(data.direccion),
          telefono: new FormControl(data.telefono)
        });
      });
    }
  }

  operar() {
    this.socio.id = this.form.value['id'];
    this.socio.cedula = this.form.value['cedula'];
    this.socio.nombres = this.form.value['nombres'];
    this.socio.apellidos = this.form.value['apellidos'];
    this.socio.direccion = this.form.value['direccion'];
    this.socio.telefono = this.form.value['telefono'];
  
    if (this.socioService.edit) {
      //update
      this.socioService.modificar(this.socio).subscribe(data => {
        if (data.codigo === OK) {
          this.socioService.getAll().subscribe(cajas => {
            this.socioService.socioCambio.next(cajas);
            this.socioService.mensaje.next(data.mensaje);
          });
          this.router.navigate(['socio'])
        } else {
          this.snackBar.open(data.mensaje, null, { duration: 2000 });
        }
      });
    } else {
      //insert
      let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
      this.socio.idEmpresa = empresa.id;
      this.socio.tipo = 'S';
      this.socioService.registrar(this.socio).subscribe(data => {
        if (data.codigo === OK) {
          this.socioService.getAll().subscribe(cajas => {
            this.socioService.socioCambio.next(cajas);
            this.socioService.mensaje.next(data.mensaje);
          });
          this.router.navigate(['socio'])
        } else {
          this.snackBar.open(data.mensaje, null, { duration: 2000 });
        }
      });
    } 
  }
  
}