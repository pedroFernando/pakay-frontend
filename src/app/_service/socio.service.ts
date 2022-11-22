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

  getAll() {
    return this.http.get<Socio[]>(`${this.url}`);
  }

  getById() {
    return this.http.get<Socio>(`${this.url}/${this.id}`);
  }

  registrar(socio: Socio) {
    return this.http.post<Respuesta>(`${this.url}`, socio);
  }

  modificar(socio: Socio) {
    return this.http.put<Respuesta>(`${this.url}/actualizar/${socio.id}`, socio);
  }

  eliminar(socio: Socio) {
    return this.http.delete<Respuesta>(`${this.url}/${socio.id}`);
  }
}
