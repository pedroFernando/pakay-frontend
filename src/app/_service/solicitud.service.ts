import { Respuesta } from '../_util/respuesta';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '../_model/solicitud';
import { HOST, EMPRESA, IP, USUARIO, COD_APP } from '../_util/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TransaccionConsulta } from '../_model/dto/transaccion-consulta';
import { SolicitudDTO } from '../_model/dto/solicitud-dto';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  url: string = `${HOST}/solicitud`;
  solicitudCambio = new Subject<Solicitud[]>();
  mensaje = new Subject<string>();
  solicitud: Solicitud;
  id: number;
  edit: boolean = false;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Solicitud[]>(`${this.url}`);
  }

  filtrar(consulta: TransaccionConsulta) {
    return this.http.post<SolicitudDTO>(`${this.url}/filtrar`, consulta);
  }

  getById() {
    return this.http.get<Solicitud>(`${this.url}/${this.id}`);
  }

  registrar(solicitud: Solicitud) {
    return this.http.post<Respuesta>(`${this.url}`, solicitud);
  }

  modificar(solicitud: Solicitud) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.put<Respuesta>(`${this.url}/actualizar/${usuario.idUsuario}&${ip}&${COD_APP}`, solicitud);
  }

  eliminar(solicitud: Solicitud) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.delete<Respuesta>(`${this.url}/eliminar/${solicitud.id}&${usuario.idUsuario}&${ip}&${COD_APP}`);
  }
}