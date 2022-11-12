import { Auditoria } from './../../_model/aut/auditoria';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../../_util/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  url: string = `${HOST}/auditoria`;
  constructor(private http: HttpClient) { }

  listar(tabla: string, idTabla: number) {
    return this.http.get<Auditoria[]>(`${this.url}/listar/${tabla}&${idTabla}`);
  }
}