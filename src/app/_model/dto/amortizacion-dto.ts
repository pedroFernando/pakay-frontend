import { Amortizacion } from "../amortizacion";


export class AmortizacionDTO {
    lista: Amortizacion[];
    numeroPrestamo: string;
    cliente: string;
    totalCapital: number;
    totalInteres: number;
    totalCuota:number;
    totalSaldo: number;
    constructor(){
        this.lista = [];
        this.numeroPrestamo = '';
        this.cliente = '';
        this.totalCapital = 0;
        this.totalInteres = 0;
        this.totalCuota = 0;
        this.totalSaldo = 0;
    }
}