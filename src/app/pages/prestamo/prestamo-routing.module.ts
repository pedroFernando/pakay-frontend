import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestamoComponent } from './prestamo.component';
import { PrestamoEditComponent } from './prestamo-edit/prestamo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PrestamoComponent,
  },
  {
    path: 'nuevo',
    component: PrestamoEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestamoRoutingModule {}
