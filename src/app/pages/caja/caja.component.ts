import { AuditoriaComponent } from '../aut/auditoria/auditoria.component';
import { Auditoria } from '../../_model/aut/auditoria';
import { OK } from '../../_util/var.constant';
import { Router } from '@angular/router';
import { CajaService } from '../../_service/caja.service';
import { Caja } from './../../_model/caja';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  lista: Caja[] = [];

  displayedColumns: string[] = ['nombre', 'monto', 'acciones'];
  dataSource: MatTableDataSource<Caja>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private cajaService: CajaService,
    private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.cajaService.getAll().subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.cajaService.cajaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.cajaService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000 });
    });
  }

  eliminar(caja: Caja): void {
    if (confirm("¿Está seguro de eliminar la caja " + caja.nombre + "?")) {
      this.cajaService.eliminar(caja).subscribe(data => {
        console.log(data);
        if (data.codigo === OK) {
          this.cajaService.getAll().subscribe(data => {
            this.cajaService.cajaCambio.next(data);
            this.cajaService.mensaje.next("Se eliminó correctamente");
          });
        } else {
          this.cajaService.mensaje.next("No se pudo eliminar");
        }
      });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  editar(id: number) {
    this.cajaService.id = id;
    this.cajaService.edit = true;
    this.router.navigate(['caja', 'editar'])
  }

  transferir(id: number) {
    this.cajaService.id = id;
    this.cajaService.edit = true;
    this.router.navigate(['caja', 'transferencia'])
  }

  egreso(id: number) {
    this.cajaService.id = id;
    this.cajaService.edit = true;
    this.cajaService.tipo = 'E';
    this.router.navigate(['caja', 'ingreso-egreso'])
  }

  ingreso(id: number) {
    this.cajaService.id = id;
    this.cajaService.edit = true;
    this.cajaService.tipo = 'I';
    this.router.navigate(['caja', 'ingreso-egreso'])
  }

  nuevo() {
    this.cajaService.edit = false;
    this.router.navigate(['caja', 'nuevo'])
  }

  showAuditoria(obj: Caja) {
    let auditoria = new Auditoria();
    auditoria.tabla = 'caja';
    auditoria.idTabla = obj.id;
    auditoria.registro = obj.id + ' - ' + obj.nombre;
    this.dialog.open(AuditoriaComponent, {
      data: auditoria
    });
  }

}
