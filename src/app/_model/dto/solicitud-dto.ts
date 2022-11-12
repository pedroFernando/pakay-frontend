import { SolicitudStore } from "./solicitud-store";

export class SolicitudDTO {
    lista: SolicitudStore[];
    totalMonto: number;
    totalSaldo: number;
    constructor(){
        this.lista = [];
        this.totalMonto = 0.0;
        this.totalSaldo = 0.0;
    }
}