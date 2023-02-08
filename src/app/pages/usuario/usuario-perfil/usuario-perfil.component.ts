import { CatalogoItem } from './../../../_model/catalogo-item';
import { CatalogoItemService } from './../../../_service/catalogo-item.service';
import { USUARIO, OK } from './../../../_util/var.constant';
import { RegistroService } from './../../../_service/aut/registro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioRegistro } from './../../../_model/aut/usuario-registro';
import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {
  usuario: UsuarioRegistro;
  form: FormGroup;
  estado: string = '';
  estados: CatalogoItem[];
  constructor(private registroService: RegistroService,
    private catalogoItemService: CatalogoItemService,
    private snackBar: MatSnackBar) {
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

  private initForm() {
    var user = JSON.parse(sessionStorage.getItem(USUARIO));
    this.registroService.id = user.id;
    this.registroService.getById().subscribe(data => {
      this.usuario = data;
      for (var i = 0; i < this.estados.length; i++) {
        if (this.usuario.estado == this.estados[i].cod) {
          this.estado = this.estados[i].nombre;
          break;
        }
      }
      this.form = new FormGroup({
        'nombre': new FormControl(data.nombre),
        'apellido': new FormControl(data.apellido),
        'identificacion': new FormControl(data.identificacion),
        'usuario': new FormControl(data.username),
        'email': new FormControl(data.email),
        'estado': new FormControl(data.estado)
      });
    });
  }

  operar() {
    this.usuario.nombre = this.form.value['nombre'];
    this.usuario.apellido = this.form.value['apellido'];
    this.usuario.identificacion = this.form.value['identificacion'];
    this.usuario.email = this.form.value['email'];

    this.registroService.modificar(this.usuario).subscribe(data => {
      if (data.codigo === OK) {
        this.snackBar.open(data.mensaje, null, { duration: 2000 });
        return;
      }
      this.snackBar.open(data.mensaje, null, { duration: 2000 });
    });
  }

  cargarCatalogos() {
    this.catalogoItemService.listByCatalogo('ESTADOS_USER').subscribe(data => {
      this.estados = data;
    })
  }

}
