import { HttpClient } from '@angular/common/http';
import { CatalogoItem } from './../_model/catalogo-item';
import { HOST } from './../_util/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogoItemService {
  url: string = `${HOST}/catalogo-item`;

  constructor(private http: HttpClient) { }

  listByCatalogo(cod: string) {
    return this.http.get<CatalogoItem[]>(`${this.url}/listar/${cod}`);
  }
}
