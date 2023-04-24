import { IdentificacionValidation } from './../../../_util/validation/identificacion-validation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EMPRESA } from '../../../_util/var.constant';
import { EmpresaService } from '../../../_service/aut/empresa.service';
import { Empresa } from '../../../_model/aut/empresa';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  id: number;
  empresa: Empresa;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private empresaService: EmpresaService,
    private snackBar: MatSnackBar) {
    this.empresa = new Empresa();
    this.form = new FormGroup({
      id: new FormControl(0),
      ruc: new FormControl('', IdentificacionValidation.validarRuc), 
      razonSocial: new FormControl(''),
      nombreComercial: new FormControl(''),
      dirMatriz: new FormControl(''),
      contribuyenteEspecial: new FormControl(''),
      obligadoContabilidad: new FormControl(false),
      creado: new FormControl('')
    });
  }

  ngOnInit() {
    this.empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    this.id = this.empresa.id;
    this.initForm();
    this.empresaService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000 });
    });
  }

  private initForm() {
    this.empresaService.getPorId(this.id).subscribe(data => {
      this.form = new FormGroup({
        'id': new FormControl(data.id),
        'ruc': new FormControl(data.ruc, IdentificacionValidation.validarRuc),
        'razonSocial': new FormControl(data.razonSocial),
        'nombreComercial': new FormControl(data.nombreComercial),
        'dirMatriz': new FormControl(data.dirMatriz),
        'contribuyenteEspecial': new FormControl(data.contribuyenteEspecial),
        'obligadoContabilidad': new FormControl(data.obligadoContabilidad),
        'creado': new FormControl(data.creado)
      });
    });
  }

  operar() {
    this.empresa.id = this.form.value['id'];
    this.empresa.ruc = this.form.value['ruc'];
    this.empresa.razonSocial = this.form.value['razonSocial'];
    this.empresa.nombreComercial = this.form.value['nombreComercial'];
    this.empresa.dirMatriz = this.form.value['dirMatriz'];
    this.empresa.contribuyenteEspecial = this.form.value['contribuyenteEspecial'];
    this.empresa.obligadoContabilidad = this.form.value['obligadoContabilidad'];

    //update
    this.empresaService.modificar(this.empresa).subscribe(data => {
      if (data === 1) {
        this.empresaService.mensaje.next('Se modificó');
      } else {
        this.empresaService.mensaje.next('No se modificó');
      }
    });
  }

}
