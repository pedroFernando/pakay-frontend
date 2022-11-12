import { HOST_AUTH } from './../_util/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from '../_util/var.constant';
import { Transaccion } from '../_model/aut/transaccion';
import { Menu } from '../_model/menu';
import { ItemMenu } from '../_model/item-menu';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${HOST_AUTH}/oauth/token`;

  menu: Transaccion[];
  nombreUsuario: string = "";
  nombreEmpresa: string = "";
  appitems: any[];

  esLogeado: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    });

    //return true;
  }

  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    this.esLogeado = token != null;
    return this.esLogeado;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.menu = [];
    this.esLogeado = false;
    this.nombreUsuario = "";
    this.nombreEmpresa = "";
    this.router.navigate(['login']);
  }

  getIp() {
    return this.http.get(`https://api.ipify.org/?format=json`);
  }

  iniciarMenu() {
    this.appitems = new Array();
    const padres = new Array();
    const hijos = new Array();
    let item = new ItemMenu();
    let menu = new Menu();
    this.menu.forEach((menuItem) => {
      if (menuItem.idPadre === 0) {
        padres.push(menuItem);
      } else {
        hijos.push(menuItem);
      }
    });

    padres.forEach((padre) => {
      menu = new Menu();
      menu = { ...padre };
      menu.label = padre.nombre;
      menu.icon = padre.icon;
      menu.items = new Array();
      hijos.forEach((hijo) => {
        item = new ItemMenu();
        if (hijo.idPadre === padre.id) {
          item.label = hijo.nombre;
          item.link = hijo.accion;
          item.icon = hijo.icon;
          menu.items.push(item);
        }
      });
      this.appitems.push(menu);
    });
  }

}
