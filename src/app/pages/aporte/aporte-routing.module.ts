import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AporteEditComponent } from './aporte-edit/aporte-edit.component';
import { AporteComponent } from './aporte.component';

const routes: Routes = [
  {
    path: '',
    component: AporteComponent,
  },
  {
    path: 'nuevo',
    component: AporteEditComponent,
  },
  {
    path: 'editar',
    component: AporteEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AporteRoutingModule {}
