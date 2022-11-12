import { Caja } from "../caja";

export class CajaDTO {
    cajaEgreso: Caja;
    cajaIngreso: Caja;
    monto: number;
    motivo: string;
    tipo: string;
    constructor(){
        this.cajaEgreso = new Caja();
        this.cajaIngreso = new Caja();
        this.monto = 0.0;
        this.motivo = '';
        this.tipo = '';
    }
}