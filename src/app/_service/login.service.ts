import { HOST_AUTH } from './../_util/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from '../_util/var.constant';
import { Transaccion } from '../_model/aut/transaccion';
import { AuthResponse } from '../_model/aut/auth-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${HOST_AUTH}`;

  menu: Transaccion[];
  nombreUsuario: string = "";
  nombreEmpresa: string = "";
  appitems: any[];

  esLogeado: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(usuario: string, contrasena: string) {
    const body = {
      username:usuario,
      password:contrasena
    };
    return this.http.post<AuthResponse>(this.url, body);
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

}
