import { AbstractControl, ValidatorFn } from '@angular/forms';

export const EXP_NUM_DOC: RegExp = /[0-9]{3}-[0-9]{3}-[0-9]{9}/;

export function ExpresionValidator(expresion: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const ok = expresion.test(control.value);
        return !ok ? { 'expresionRegular': { value: control.value } } : null;
    };
}