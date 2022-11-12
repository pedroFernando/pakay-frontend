import { Socio } from "./socio";
import { Documento } from "./documento";
import { Caja } from "./caja";

export class Transaccion {
    id: number;
    idEmpresa: number;
    socio: Socio;
    documento: Documento;
    caja: Caja;
    numero: string;
    mes: string;
    fecha: Date;
    valor: number;
    descripcion: string;
}