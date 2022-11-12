import { Transaccion } from './../../_model/aut/transaccion';
import { HttpClient } from '@angular/common/http';
import { USUARIO, HOST_AUTH } from './../../_util/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  url: string = `${HOST_AUTH}/transaccion`;
  constructor(private http: HttpClient) { }

  getMenu() {
    let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
    return this.http.get<Transaccion[]>(`${this.url}/listar/${usuario.username}&002`);
  }

}
