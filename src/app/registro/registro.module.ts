import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatStepperModule } from '@angular/material/stepper';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';

@NgModule({
  imports: [
    RegistroRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    PasswordStrengthMeterModule,
    NgMaterialMultilevelMenuModule,
    MatStepperModule,
  ],
  declarations: [
    RegistroComponent,
  ],
})
export class RegistroModule {}
