import { IP, USUARIO, COD_APP, HOST_AUTH } from './../../_util/var.constant';
import { Respuesta } from './../../_util/respuesta';
import { Usuario } from './../../_model/aut/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    url: string = `${HOST_AUTH}/usuario`;
    usuarioCambio = new Subject<Usuario[]>();
    mensaje = new Subject<string>();
    edit: boolean = false;
    id: number;

    constructor(private http: HttpClient) {
    }

    getByUsuario(usuario: string) {
        return this.http.get<Usuario>(`${this.url}/buscar/${usuario}`);
    }

    getById() {
        return this.http.get<Usuario>(`${this.url}/buscar-por-id/${this.id}`);
    }

    crearPtoEmiUsuario(idPtoEmi: number) {
        let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
        let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
        return this.http.get<Respuesta>(`${this.url}/agregar-ptoemi/${idPtoEmi}&${this.id}&${usuario.id}&${ip}&${COD_APP}`);
    }

    eliminarPtoEmiUsuario(idPtoEmi: number) {
        let ip = JSON.parse(sessionStorage.getItem(IP)).ip;
        let usuario = JSON.parse(sessionStorage.getItem(USUARIO));
        return this.http.get<Respuesta>(`${this.url}/eliminar-ptoemi/${idPtoEmi}&${this.id}&${usuario.id}&${ip}&${COD_APP}`);
    }

}