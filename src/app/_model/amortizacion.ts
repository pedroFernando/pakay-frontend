import { Solicitud } from "./solicitud";
import { Caja } from "./caja";

export class Amortizacion {
    id: number;
    solicitud: Solicitud;
    caja: Caja;
    numero: string;
    estado: string;
    fecha: Date;
    fechaPago: Date;
    capital: number;
    interes: number;
    cuota: number;
    saldo: number;
}