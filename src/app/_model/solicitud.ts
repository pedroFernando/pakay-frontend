import { Socio } from "./socio";
import { Caja } from "./caja";

export class Solicitud {
    id: number;
    numero: string;
    idEmpresa: number;
    socio: Socio;
    garante: Socio;
    caja: Caja;
    fechaSolicitud: Date;
    fechaAprobacion: Date;
    plazo: number;
    amortizacion: string;
    tipo: string;
    estado: string;
    monto: number;
    interes: number;
    saldo: number;
    saldoFavor: number;
    saldoContra: number;
}