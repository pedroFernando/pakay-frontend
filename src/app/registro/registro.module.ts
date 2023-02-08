import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
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
