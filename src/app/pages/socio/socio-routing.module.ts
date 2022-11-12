import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocioEditComponent } from './socio-edit/socio-edit.component';
import { SocioComponent } from './socio.component';

const routes: Routes = [
  {
    path: '',
    component: SocioComponent,
  },
  {
    path: 'nuevo',
    component: SocioEditComponent,
  },
  {
    path: 'editar',
    component: SocioEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocioRoutingModule {}
