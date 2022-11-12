import { Subject } from 'rxjs';
import { EMPRESA, COD_APP, USUARIO, IP, HOST_AUTH } from './../../_util/var.constant';
import { Respuesta } from './../../_util/respuesta';
import { UsuarioRegistro } from './../../_model/aut/usuario-registro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url: string = `${HOST_AUTH}/registro`;
  usuarioCambio = new Subject<UsuarioRegistro[]>();
  mensaje = new Subject<string>();
  edit: boolean = false;
  id: number;

  constructor(private http: HttpClient) { }

  listByEmpresa() {
    let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    return this.http.get<UsuarioRegistro[]>(`${this.url}/listar/${empresa.id}`);
  }

  registrar(usuario: UsuarioRegistro, ip: string) {
    return this.http.post<Respuesta>(`${this.url}/registrar/${ip}&${COD_APP}`, usuario
    );
  }

  getById() {
    return this.http.get<UsuarioRegistro>(`${this.url}/buscar-por-id/${this.id}`);
  }

  registrar2(usuario: UsuarioRegistro) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let user = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.post<Respuesta>(`${this.url}/registrar2/${user.id}&${ip}&${COD_APP}`, usuario);
  }

  modificar(usuario: UsuarioRegistro) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let user = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.put<Respuesta>(`${this.url}/actualizar/${user.id}&${ip}&${COD_APP}`, usuario);
  }

  getIp() {
    return this.http.get(`https://api.ipify.org/?format=json`);
  }
}
