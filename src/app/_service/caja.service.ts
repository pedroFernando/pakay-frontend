import { Respuesta } from '../_util/respuesta';
import { HttpClient } from '@angular/common/http';
import { Caja } from '../_model/caja';
import { CajaDTO } from '../_model/dto/caja-dto';
import { HOST, EMPRESA, IP, USUARIO, COD_APP } from '../_util/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  url: string = `${HOST}/caja`;
  cajaCambio = new Subject<Caja[]>();
  mensaje = new Subject<string>();
  caja: Caja;
  id: number;
  edit: boolean = false;
  tipo: string = '';
  constructor(private http: HttpClient) { }

  listByEmpresa() {
    //let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    let empresa = 50;
    return this.http.get<Caja[]>(`${this.url}/listar/${empresa}`);
  }

  getById() {
    return this.http.get<Caja>(`${this.url}/buscar/${this.id}`);
  }

  registrar(caja: Caja) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.post<Respuesta>(`${this.url}/registrar/${usuario.idUsuario}&${ip}&${COD_APP}`, caja);
  }

  modificar(caja: Caja) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    caja.idEmpresa = 50;
    return this.http.put<Respuesta>(`${this.url}/actualizar/${usuario.idUsuario}&${ip}&${COD_APP}`, caja);
  }

  transferir(cajaDTO: CajaDTO) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.put<Respuesta>(`${this.url}/transferir/${usuario.idUsuario}&${ip}&${COD_APP}`, cajaDTO);
  }

  egresoIngreso(cajaDTO: CajaDTO) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.put<Respuesta>(`${this.url}/egreso-ingreso/${usuario.idUsuario}&${ip}&${COD_APP}`, cajaDTO);
  }

  eliminar(caja: Caja) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.delete<Respuesta>(`${this.url}/eliminar/${caja.id}&${usuario.idUsuario}&${ip}&${COD_APP}`);
  }
}
