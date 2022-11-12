export class Numero {

    public static redondear(numero, decimales = 2, usarComa = false): number{
        var opciones = {
            maximumFractionDigits: decimales,
            useGrouping: false
          };
          return Number(new Intl.NumberFormat((usarComa ? "es" : "en"), opciones).format(numero));
    }

}
