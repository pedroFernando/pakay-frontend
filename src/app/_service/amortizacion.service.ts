import { Respuesta } from '../_util/respuesta';
import { HttpClient } from '@angular/common/http';
import { HOST, IP, USUARIO, COD_APP } from '../_util/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Amortizacion } from '../_model/amortizacion';
import { AmortizacionConsulta } from '../_model/dto/amortizacion-consulta';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {
  url: string = `${HOST}/amortizacion`;
  amortizacionCambio = new Subject<Amortizacion[]>();
  mensaje = new Subject<string>();
  amortizacion: Amortizacion;
  id: number;
  edit: boolean = false;
  constructor(private http: HttpClient) { }

  listBySolicitud(solicitud: number) {
    return this.http.get<Amortizacion[]>(`${this.url}/solicitud/${solicitud}`);
  }

  simular(consulta: AmortizacionConsulta) {
    return this.http.post<Amortizacion[]>(`${this.url}/simular`, consulta);
  }

  getById() {
    return this.http.get<Amortizacion>(`${this.url}/buscar/${this.id}`);
  }

  modificar(amortizacion: Amortizacion) {
    let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.put<Respuesta>(`${this.url}/actualizar/${usuario.idUsuario}&${ip}&${COD_APP}`, amortizacion);
  }

  pagar(amortizacion: Amortizacion) {
    return this.http.put<Respuesta>(`${this.url}/pagar`, amortizacion);
  }

  eliminar(id: number) {
    return this.http.delete<Respuesta>(`${this.url}/${id}`);
  }
}
