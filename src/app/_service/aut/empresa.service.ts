import { IP, USUARIO, COD_APP, HOST_AUTH } from './../../_util/var.constant';
import { Empresa } from '../../_model/aut/empresa';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url: string = `${HOST_AUTH}/empresa`;
    empresaCambio = new Subject<Empresa[]>();
    mensaje = new Subject<string>();
    constructor(private http: HttpClient) {
    }

    getPorId(id: number) {
        return this.http.get<Empresa>(`${this.url}/listar/${id}`);
    }

    modificar(empresa: Empresa) {
        let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
        let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
        return this.http.put(`${this.url}/actualizar/${usuario.id}&${ip}&${COD_APP}`, empresa);
    }

}
