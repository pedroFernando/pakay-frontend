import { UsuarioService } from './../../_service/aut/usuario.service';
import { Router } from '@angular/router';
import { UsuarioRegistro } from './../../_model/aut/usuario-registro';
import { RegistroService } from './../../_service/aut/registro.service';
import { OK } from './../../_util/var.constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  lista: UsuarioRegistro[] = [];

  displayedColumns: string[] = ['nombre', 'usuario', 'identificacion', 'acciones'];
  dataSource: MatTableDataSource<UsuarioRegistro>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showOutlet: boolean = false;
  constructor(private registroService: RegistroService, 
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.registroService.listByEmpresa().subscribe(data => {
      this.lista = data;

      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.registroService.usuarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.registroService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000 });
    });

  }

  eliminar(usuario: UsuarioRegistro): void {
    usuario.estado = 'E';
    this.registroService.modificar(usuario).subscribe(data => {

      if (data.codigo === OK) {
        this.registroService.listByEmpresa().subscribe(data => {
          this.registroService.usuarioCambio.next(data);
          this.registroService.mensaje.next("Se elimino correctamente");
        });
      } else {
        this.registroService.mensaje.next("No se pudo eliminar");
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  editar(id: number){
    this.registroService.id = id;
    this.registroService.edit = true;
    this.router.navigate(['usuario','editar'])
  }

  nuevo(){
    this.registroService.edit = false;
    this.router.navigate(['usuario','nuevo'])
  }

  ptoEmi(id: number){
    this.usuarioService.id = id;
    this.usuarioService.edit = true;
    this.router.navigate(['usuario','punto-emision'])
  }

}
