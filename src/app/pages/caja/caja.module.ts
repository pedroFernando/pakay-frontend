import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';

import { CajaRoutingModule } from './caja-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CajaComponent } from './caja.component';
import { CajaEditComponent } from './caja-edit/caja-edit.component';
import { CajaTransferenciaComponent } from './caja-transferencia/caja-transferencia.component';
import { CajaIngresoEgresoComponent } from './caja-ingreso-egreso/caja-ingreso-egreso.component';

@NgModule({
  imports: [
    CajaRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
  ],
  declarations: [
    CajaComponent,
    CajaEditComponent,
    CajaTransferenciaComponent,
    CajaIngresoEgresoComponent,
  ],
})
export class CajaModule {}
