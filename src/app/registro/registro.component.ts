import { PasswordValidation } from './../_util/validation/password-validation';
import { IdentificacionValidation } from './../_util/validation/identificacion-validation';
import { RegistroService } from './../_service/aut/registro.service';
import { OK } from './../_util/var.constant';
import { Router } from '@angular/router';
import { UsuarioRegistro } from './../_model/aut/usuario-registro';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Empresa } from '../_model/aut/empresa';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isLinear = true;
  formUsuario: FormGroup;
  formEmpresa: FormGroup;
  usuario: UsuarioRegistro;
  ip: string;

  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['(No segura)', '(Débil)', '(Normal)', '(Fuerte)', '(Muy Segura!)'];

  constructor(private registroService: RegistroService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usuario = new UsuarioRegistro;
    this.formEmpresa = new FormGroup({
      ruc: new FormControl('', IdentificacionValidation.validarRuc),
      razonSocial: new FormControl(''),
      nombreComercial: new FormControl(''),
      dirMatriz: new FormControl(''),
      contribuyenteEspecial: new FormControl(''),
      obligadoContabilidad: new FormControl(false)
    });

    this.formUsuario = new FormGroup({
      'nombre': new FormControl(''),
      'apellido': new FormControl(''),
      'identificacion': new FormControl('',IdentificacionValidation.validarIdentificacion),
      'usuario': new FormControl(''),
      'email': new FormControl('', Validators.email),
      'password': new FormControl(''),
      'confirmPassword': new FormControl('')
    }, PasswordValidation.MatchPassword);
    this.registroService.getIp().subscribe(data => {
      this.ip = JSON.parse(JSON.stringify(data)).ip;
    });
  }

  get password() {
    return this.formUsuario.get('password');
  }

  operar() {
    this.usuario.nombre = this.formUsuario.value['nombre'];
    this.usuario.apellido = this.formUsuario.value['apellido'];
    this.usuario.identificacion = this.formUsuario.value['identificacion'];
    this.usuario.username = this.formUsuario.value['usuario'];
    this.usuario.email = this.formUsuario.value['email'];
    this.usuario.password = this.formUsuario.value['password'];

    this.usuario.empresa = new Empresa();
    this.usuario.empresa.ruc = this.formEmpresa.value['ruc'];
    this.usuario.empresa.razonSocial = this.formEmpresa.value['razonSocial'];
    this.usuario.empresa.nombreComercial = this.formEmpresa.value['nombreComercial'];
    this.usuario.empresa.dirMatriz = this.formEmpresa.value['dirMatriz'];
    this.usuario.empresa.contribuyenteEspecial = this.formEmpresa.value['contribuyenteEspecial'];
    this.usuario.empresa.obligadoContabilidad = this.formEmpresa.value['obligadoContabilidad'];


    //insert

    this.registroService.registrar(this.usuario, this.ip).subscribe(data => {
      this.snackBar.open(data.mensaje, null, { duration: 2000 });
      if (data.codigo === OK) {
        this.router.navigate(['login'])
      }
    });

  }

}
