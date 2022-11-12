import { Amortizacion } from '../../../_model/amortizacion';
import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { AmortizacionService } from '../../../_service/amortizacion.service';
import { OK } from '../../../_util/var.constant';
import { AmortizacionDTO } from '../../../_model/dto/amortizacion-dto';
import { FormControl } from '@angular/forms';
import { Caja } from '../../../_model/caja';
import { CajaService } from '../../../_service/caja.service';
import { Auditoria } from '../../../_model/aut/auditoria';
import { AuditoriaComponent } from '../../aut/auditoria/auditoria.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-amortizacion-dialog',
  templateUrl: './amortizacion-dialog.component.html',
  styleUrls: ['./amortizacion-dialog.component.css']
})
export class AmortizacionDialogComponent implements OnInit {
  documento = '';
  cliente = '';
  fecha: Date = new Date();
  cajaSeleccionada: Caja;
  cajas: Caja[];
  formCaja: FormControl = new FormControl('');
  displayedColumns: string[] = ['fecha', 'estado', 'capital', 'interes', 'cuota', 'saldo', 'acciones'];
  dataSource: MatTableDataSource<Amortizacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private amortizacionService: AmortizacionService,
    private cajaService: CajaService,
    private snackBar: MatSnackBar, public dialog: MatDialog,
    public dialogRef: MatDialogRef<AmortizacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dto: AmortizacionDTO) { }

  ngOnInit() {
    this.documento = this.dto.numeroPrestamo;
    this.cliente = this.dto.cliente;
    this.totales();
    this.dataSource = new MatTableDataSource(this.dto.lista);
    this.dataSource.paginator = this.paginator;
    this.fecha.setHours(0);
    this.fecha.setMinutes(0);
    this.fecha.setSeconds(0);
    this.fecha.setMilliseconds(0);
    this.cajaService.listByEmpresa().subscribe(data => {
      this.cajas = data;
    });
  }

  totales(){
    let sumaCapital: number = 0;
    let sumaInteres: number = 0;
    let sumaCuota: number = 0;
    for (var i = 0; i < this.dto.lista.length; i++) {
      if(this.dto.lista[i].estado == 'P'){
        this.dto.totalSaldo = this.dto.lista[i].saldo;
      }
      sumaCapital += this.dto.lista[i].capital;
      sumaInteres += this.dto.lista[i].interes;
      sumaCuota += this.dto.lista[i].cuota;
    }
    this.dto.totalCapital = sumaCapital;
    this.dto.totalInteres = sumaInteres;
    this.dto.totalCuota = sumaCuota;
  }

  changeCaja($event: EventEmitter<MatSelectChange>) {
    this.cajaSeleccionada = this.formCaja.value;
  }

  compareCajas(f1: Caja, f2: Caja): boolean {
    return f1.id == f2.id && f1.nombre == f2.nombre;
  }

  pagar(amt: Amortizacion) {
    if (confirm("¿Está seguro de registrar el pago de la cuota?")) {
      amt.estado = 'P';
      amt.caja = this.cajaSeleccionada;
      amt.fechaPago = this.fecha;
      this.amortizacionService.pagar(amt).subscribe(data => {
        if (data.codigo != OK) {
          this.snackBar.open(data.mensaje, null, { duration: 4000 });
          return;
        }
        this.cajaService.listByEmpresa().subscribe(data => {
          this.cajas = data;
        });
        this.totales();
        this.snackBar.open("Pago realizado con éxito", null, { duration: 4000 });
        this.dataSource = new MatTableDataSource(this.dto.lista);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  showAuditoria(obj: Amortizacion) {
    let auditoria = new Auditoria();
    auditoria.tabla = 'amortizacion';
    auditoria.idTabla = obj.id;
    auditoria.registro = '  Nro. ' + obj.numero;
    this.dialog.open(AuditoriaComponent, {
      data: auditoria
    });
  }

}