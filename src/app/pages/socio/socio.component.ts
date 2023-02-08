import { AuditoriaComponent } from '../aut/auditoria/auditoria.component';
import { Auditoria } from '../../_model/aut/auditoria';
import { OK } from '../../_util/var.constant';
import { Router } from '@angular/router';
import { SocioService } from '../../_service/socio.service';
import { Socio } from './../../_model/socio';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css']
})
export class SocioComponent implements OnInit {
  lista: Socio[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'direccion', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<Socio>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private socioService: SocioService,
    private snackBar: MatSnackBar,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.socioService.getAll().subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.socioService.socioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.socioService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000 });
    });
  }

  eliminar(socio: Socio): void {
    if (confirm("¿Está seguro de eliminar el socio " + socio.cedula + "?")) {
      this.socioService.eliminar(socio).subscribe(data => {
        console.log(data);
        if (data.codigo === OK) {
          this.socioService.getAll().subscribe(data => {
            this.lista = data;
            this.dataSource = new MatTableDataSource(this.lista);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.socioService.mensaje.next("Se eliminó correctamente");
          });
        } else {
          this.socioService.mensaje.next("No se pudo eliminar");
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
    this.socioService.id = id;
    this.socioService.edit = true;
    this.router.navigate(['socio', 'editar'])
  }

  nuevo() {
    this.socioService.edit = false;
    this.router.navigate(['socio', 'nuevo'])
  }

  showAuditoria(obj: Socio) {
    let auditoria = new Auditoria();
    auditoria.tabla = 'socio';
    auditoria.idTabla = obj.id;
    auditoria.registro = obj.id + ' - ' + obj.nombres + ' ' + obj.apellidos;
    this.dialog.open(AuditoriaComponent, {
      data: auditoria
    });
  }

}
