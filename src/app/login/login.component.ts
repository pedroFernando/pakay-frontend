import { Idle } from '@ng-idle/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MENU, IP } from './../_util/var.constant';
import { TransaccionService } from './../_service/aut/transaccion.service';
import { UsuarioService } from '../_service/aut/usuario.service';
import { TOKEN_NAME, USUARIO, EMPRESA } from '../_util/var.constant';
import { LoginService } from '../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu } from '../_model/item-menu';
import { Menu } from '../_model/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  hide = true;

  constructor(private loginService: LoginService, private usuarioService: UsuarioService,
    private transaccionService: TransaccionService, private snackBar: MatSnackBar,
    private router: Router, private idle: Idle) { }

  ngOnInit() {
    this.loginService.menu = new Array();
    this.formLogin = new FormGroup({
      usuario: new FormControl(''),
      contrasena: new FormControl('')
    });
  }

  iniciarSesion() {
    let usuario = this.formLogin.value['usuario']
    let contrasena = this.formLogin.value['contrasena'];
    this.loginService.login(usuario, contrasena).subscribe(data => {
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.loginService.esLogeado = true;
        this.usuarioService.getByUsuario(usuario).subscribe(user => {
          sessionStorage.setItem(USUARIO, JSON.stringify(user));
          sessionStorage.setItem(EMPRESA, JSON.stringify(user.empresa));
          this.loginService.nombreUsuario = user.nombre + " " + user.apellido;
          this.loginService.nombreEmpresa = user.empresa.nombreComercial;
          this.transaccionService.getMenu().subscribe(menu => {
            sessionStorage.setItem(MENU, JSON.stringify(Array.from(menu)));
            this.loginService.menu = Array.from(menu);
            this.loginService.menu = menu;
            this.iniciarMenu();
            this.idle.watch();
          });
          this.loginService.getIp().subscribe(data => {
            sessionStorage.setItem(IP, JSON.stringify(data));
          });
        });
        this.router.navigate(['inicio']);
      }
    }, error => {
      if (error.status == "401" || error.status == "400")
        this.snackBar.open("Usuario y/o contraseña son incorrectos.", null, { duration: 3000 });
    });
  }

  registrarse() {
    this.router.navigate(['registro']);
  }

  iniciarMenu() {
    this.loginService.appitems = new Array();
    let padres = new Array();
    let hijos = new Array();
    let item = new ItemMenu();
    let menu = new Menu();
    this.loginService.menu.forEach(function(menuItem){
      if(menuItem.idPadre == 0) {
        padres.push(menuItem);
      }else{
        hijos.push(menuItem);
      }
    });
    for (var i = 0; i < padres.length; i++) {
      menu = new Menu();
      menu.label = padres[i].nombre;
      menu.icon = padres[i].icon;
      menu.items = new Array();
      for (var j = 0; j < hijos.length; j++) {
        item = new ItemMenu();
        if(hijos[j].idPadre == padres[i].id){
          item.label = hijos[j].nombre;
          item.link = hijos[j].accion;
          item.icon = hijos[j].icon;
          menu.items.push(item);
        }
      }
      this.loginService.appitems.push(menu);
    }
  }

}
