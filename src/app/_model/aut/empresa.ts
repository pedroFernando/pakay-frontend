export class Empresa {
    id: number;
    ruc: string;
    razonSocial: string;
    nombreComercial: string;
    dirMatriz: string;
    contribuyenteEspecial: string;
    obligadoContabilidad: boolean;
    ambiente: string;
    creado: Date;
    modificado: Date;

    constructor() {
        this.id = 0;
    }

}