import { TransaccionStore } from "./transaccion-store";

export class TransaccionDTO {
    lista: TransaccionStore[];
    totalIngreso: number;
    totalEgreso: number;
    total: number;
    constructor(){
        this.lista = [];
        this.totalIngreso = 0.0;
        this.totalEgreso = 0.0;
        this.total = 0.0;
    }
}