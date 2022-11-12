import { Respuesta } from '../_util/respuesta';
import { HttpClient } from '@angular/common/http';
import { HOST, EMPRESA, IP, USUARIO, COD_APP } from '../_util/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socio } from '../_model/socio';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  url: string = `${HOST}/socio`;
  socioCambio = new Subject<Socio[]>();
  mensaje = new Subject<string>();
  socio: Socio;
  id: number;
  edit: boolean = false;
  constructor(private http: HttpClient) { }

  listByEmpresa(tipo: string) {
    let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    return this.http.get<Socio[]>(`${this.url}/listar/${empresa.id}&${tipo}`);
  }

  getById() {
    return this.http.get<Socio>(`${this.url}/buscar/${this.id}`);
  }

  registrar(socio: Socio) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.post<Respuesta>(`${this.url}/registrar/${usuario.idUsuario}&${ip}&${COD_APP}`, socio);
  }

  modificar(socio: Socio) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.put<Respuesta>(`${this.url}/actualizar/${usuario.idUsuario}&${ip}&${COD_APP}`, socio);
  }

  eliminar(socio: Socio) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.delete<Respuesta>(`${this.url}/eliminar/${socio.id}&${usuario.idUsuario}&${ip}&${COD_APP}`);
  }
}
