import { RegistroService } from './../../../_service/aut/registro.service';
import { UsuarioRegistro } from './../../../_model/aut/usuario-registro';
import { OK, EMPRESA } from './../../../_util/var.constant';
import { CatalogoItemService } from './../../../_service/catalogo-item.service';
import { CatalogoItem } from './../../../_model/catalogo-item';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  usuario: UsuarioRegistro;
  form: FormGroup;
  estados: CatalogoItem[];

  constructor(private registroService: RegistroService,
    private catalogoItemService: CatalogoItemService,
    private router: Router) {
    this.usuario = new UsuarioRegistro();
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'apellido': new FormControl(''),
      'identificacion': new FormControl(''),
      'usuario': new FormControl(''),
      'email': new FormControl(''),
      'estado': new FormControl('')
    });
  }

  ngOnInit() {
    this.cargarCatalogos();
    this.initForm();
  }

  compareFn(f1: string, f2: string): boolean {
    return f1 == f2;
  }

  private initForm() {
    if (this.registroService.edit) {
      this.registroService.getById().subscribe(data => {
        this.usuario = data;
        this.form = new FormGroup({
          'id': new FormControl(data.idUsuario),
          'nombre': new FormControl(data.nombre),
          'apellido': new FormControl(data.apellido),
          'identificacion': new FormControl(data.identificacion),
          'usuario': new FormControl(data.username),
          'email': new FormControl(data.email),
          'estado': new FormControl(data.estado)
        });
      });
    }
  }

  operar() {
    this.usuario.idUsuario = this.form.value['id'];
    this.usuario.nombre = this.form.value['nombre'];
    this.usuario.apellido = this.form.value['apellido'];
    this.usuario.identificacion = this.form.value['identificacion'];
    this.usuario.username = this.form.value['usuario'];
    this.usuario.email = this.form.value['email'];
    this.usuario.estado = this.form.value['estado'];

    if (this.registroService.edit) {
      //update
      this.registroService.modificar(this.usuario).subscribe(data => {
        if (data.codigo === OK) {
          this.registroService.listByEmpresa().subscribe(usuarios => {
            this.registroService.usuarioCambio.next(usuarios);
            this.registroService.mensaje.next(data.mensaje);
          });
        } else {
          this.registroService.mensaje.next(data.mensaje);
        }
      });
    } else {
      //insert
      let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
      this.usuario.empresa = empresa;
      this.registroService.registrar2(this.usuario).subscribe(data => {
        if (data.codigo === OK) {
          this.registroService.listByEmpresa().subscribe(usuarios => {
            this.registroService.usuarioCambio.next(usuarios);
            this.registroService.mensaje.next(data.mensaje);
          });
        } else {
          this.registroService.mensaje.next(data.mensaje);
        }
      });
    }

    this.router.navigate(['usuario'])
  }

  cargarCatalogos() {
    this.catalogoItemService.listByCatalogo('ESTADOS_USER').subscribe(data => {
      this.estados = data;
    })
  }

}
