import { Respuesta } from '../_util/respuesta';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '../_model/transaccion';
import { TransaccionConsulta } from '../_model/dto/transaccion-consulta';
import { TransaccionDTO } from '../_model/dto/transaccion-dto';
import { HOST, EMPRESA, IP, USUARIO, COD_APP } from '../_util/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SocioEmpresaReporte } from '../_model/rep/socio-empresa-reporte';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  url: string = `${HOST}/transaccion`;
  transaccionCambio = new Subject<Transaccion[]>();
  mensaje = new Subject<string>();
  transaccion: Transaccion;
  id: number;
  edit: boolean = false;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Transaccion[]>(`${this.url}`);
  }

  reporteEmpresa() {
    let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    return this.http.get<SocioEmpresaReporte[]>(`${this.url}/reporte-empresa/${empresa.id}`);
  }

  reporteSocio(idSocio: number) {
    return this.http.get<SocioEmpresaReporte[]>(`${this.url}/reporte-socio/${idSocio}`);
  }
  
  listByDocumento(doc: string) {
    let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    return this.http.get<Transaccion[]>(`${this.url}/listar-doc/${empresa.id}&${doc}`);
  }

  filtrar(consulta: TransaccionConsulta) {
    let empresa = JSON.parse(sessionStorage.getItem(EMPRESA));
    consulta.idEmpresa = empresa.id;
    return this.http.post<TransaccionDTO>(`${this.url}/filtrar`, consulta);
  }

  getById() {
    return this.http.get<Transaccion>(`${this.url}/buscar/${this.id}`);
  }

  registrar(transaccion: Transaccion) {
    return this.http.post<Respuesta>(`${this.url}`, transaccion);
  }

  modificar(transaccion: Transaccion) {
    return this.http.put<Respuesta>(`${this.url}/${transaccion.id}`, transaccion);
  }

  eliminar(id: number) {
    return this.http.delete<Respuesta>(`${this.url}/${id}`);
  }
}
