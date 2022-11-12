import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroComponent } from './registro.component';
import { NoLoginService } from '../_service/noLogin.service';

const routes: Routes = [
  {
    path: '',
    component: RegistroComponent,
    canActivate: [NoLoginService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroRoutingModule { }
