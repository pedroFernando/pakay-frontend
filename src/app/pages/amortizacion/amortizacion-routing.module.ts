import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmortizacionComponent } from './amortizacion.component';

const routes: Routes = [
  {
    path: '',
    component: AmortizacionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmortizacionRoutingModule {}
