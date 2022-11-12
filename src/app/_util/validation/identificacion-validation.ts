import { AbstractControl } from '@angular/forms';
export class IdentificacionValidation {
    private static NUM_PROVINCIAS: number = 24;
    private static COEFICIENTES: number[] = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    private static CONSTANTE: number = 11;

    static validar(AC: AbstractControl) {
        let identificacion = AC.get('identificacion').value;
        let tipoIdent = AC.get('tipoIdent').value;
        if (tipoIdent.cod == '06') {
            return null;
        }
        if(!IdentificacionValidation.valida(identificacion)){
            AC.get('identificacion').setErrors({ identificacionValida: true })
        }else{
            return null;
        }
    }

    static validarRuc(control: AbstractControl) {
        if(!IdentificacionValidation.validaRuc(control.value)){
            return { rucValido: true }
        }else{
            return null;
        }
    }

    static validarIdentificacion(control: AbstractControl) {
        if(!IdentificacionValidation.valida(control.value)){
            return { identificacionValida: true }
        }else{
            return null;
        }
    }

    private static valida(identificacion: string): boolean {
        identificacion = identificacion.trim();
        if (identificacion.length < 10) {
            return false;
        }
        if (identificacion.length == 10) {
            return IdentificacionValidation.validaCedula(identificacion);
        }

        switch (identificacion.substr(2,1)) {
            case '6':
                if (IdentificacionValidation.validaRucP(identificacion)) {
                    return true;
                } else {
                    return IdentificacionValidation.validaCedula(identificacion);
                }
            case '9':
                return IdentificacionValidation.validaRucSoc(identificacion);
            default:
                return IdentificacionValidation.validaCedula(identificacion);
        }
    }

    private static validaRuc(ruc: string): boolean {
        ruc = ruc.trim();
        if(ruc.length != 13){
            return false;
        }
        switch (ruc.substr(2,1)) {
            case '6':
                if (IdentificacionValidation.validaRucP(ruc)) {
                    return true;
                } else {
                    return IdentificacionValidation.validaRucP(ruc);
                }
            case '9':
                return IdentificacionValidation.validaRucSoc(ruc);
            default:
                return IdentificacionValidation.validaCedula(ruc);
        }
    }

    private static validaRucSoc(ruc: string): boolean {
        if(ruc.length != 13){
            return false;
        }
        var prov = Number(ruc.substring(0, 2));
        if (!(((prov > 0) && (prov <= IdentificacionValidation.NUM_PROVINCIAS)) || prov == 30)) {
            return false;
        }
        var d: number[] = [];
        var suma = 0;
        for (var i = 0; i < 10; i++) {
            d[i] = Number(ruc.charAt(i));
        }
        for (var i = 0; i < 10 - 1; i++) {
            d[i] = d[i] * IdentificacionValidation.COEFICIENTES[i];
            suma += d[i];
        }
        var aux, resp;
        aux = suma % IdentificacionValidation.CONSTANTE;
        resp = IdentificacionValidation.CONSTANTE - aux;
        resp = (resp == 11) ? 0 : resp;
        return resp == d[9];
    }

    private static validaRucP(ruc: string): boolean {
        if(ruc.length != 13){
            return false;
        }
        var prov: number = Number(ruc.substring(0, 2));
        var val: boolean = false;
        if (!(((prov > 0) && (prov <= IdentificacionValidation.NUM_PROVINCIAS)) || prov == 30)) {
            return val;
        }
        var v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number;
        var sumatoria:number;
        var modulo:number;
        var digito:number;
        var d:number[] = [];
        for (var i = 0; i < ruc.length; i++) {
            d[i] = Number(ruc.charAt(i));
        }
        v1 = d[0] * 3;
        v2 = d[1] * 2;
        v3 = d[2] * 7;
        v4 = d[3] * 6;
        v5 = d[4] * 5;
        v6 = d[5] * 4;
        v7 = d[6] * 3;
        v8 = d[7] * 2;
        v9 = d[8];
        sumatoria = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
        modulo = sumatoria % 11;
        digito = 11 - modulo;
        digito = (digito == 11) ? 0 : digito;
        val = digito == v9;
        return val;
    }

    private static validaCedula(cedula:string):boolean {
        if(cedula.length != 10 && cedula.length != 13){
            return false;
        }
        var prov:number = Number(cedula.substring(0, 2));
        if (!(((prov > 0) && (prov <= IdentificacionValidation.NUM_PROVINCIAS)) || prov == 30)) {
            return false;
        }
        var d:number[] = [];
        for (var i = 0; i < 10; i++) {
            d[i] = Number(cedula.charAt(i));
        }
        var imp:number = 0;
        var par:number = 0;
        for (var i = 0; i < 10; i += 2) {
            d[i] = ((d[i] * 2) > 9) ? ((d[i] * 2) - 9) : (d[i] * 2);
            imp += d[i];
        }
        for (var i = 1; i < (10 - 1); i += 2) {
            par += d[i];
        }
        var suma:number = imp + par;
        var d10:number = Number(String(suma + 10).substring(0, 1) + "0") - suma;
        d10 = (d10 == 10) ? 0 : d10;
        return d10 == d[9];
    }

}
