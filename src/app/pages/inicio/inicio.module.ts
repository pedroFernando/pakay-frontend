import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

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
