import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CajaComponent } from './caja.component';
import { CajaEditComponent } from './caja-edit/caja-edit.component';
import { CajaTransferenciaComponent } from './caja-transferencia/caja-transferencia.component';
import { CajaIngresoEgresoComponent } from './caja-ingreso-egreso/caja-ingreso-egreso.component';

const routes: Routes = [
  {
    path: '',
    component: CajaComponent,
  },
  {
    path: 'nuevo',
    component: CajaEditComponent,
  },
  {
    path: 'editar',
    component: CajaEditComponent,
  },
  {
    path: 'transferencia',
    component: CajaTransferenciaComponent,
  },
  {
    path: 'ingreso-egreso',
    component: CajaIngresoEgresoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajaRoutingModule {}
