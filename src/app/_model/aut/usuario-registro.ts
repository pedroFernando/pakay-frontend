import { Empresa } from './empresa';
export class UsuarioRegistro {
    idUsuario: number;
    empresa: Empresa;
    nombre: string;
    apellido: string;
    identificacion: string;
    username: string;
    password: string;
    email: string;
    estado: string;

    constructor() {
        this.idUsuario = 0;
    }
}
