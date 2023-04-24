import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    InicioRoutingModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
  ],
  declarations: [
    InicioComponent,
  ],
})
export class InicioModule {}
