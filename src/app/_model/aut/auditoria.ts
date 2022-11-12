import { UsuarioAuditoria } from './usuario-auditoria';
import { Aplicacion } from './aplicacion';
export class Auditoria {
    id: number;
    tabla: string;
    entidad: string;
    idTabla: number;
    accion: string;
    registro: string;
    ip: string;
    aplicacion: Aplicacion;
    usuario: UsuarioAuditoria;
    fecha: Date;
}
