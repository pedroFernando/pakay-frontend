import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Not403Component } from './not403.component';

const routes: Routes = [
  {
    path: '',
    component: Not403Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Not403RoutingModule {}
