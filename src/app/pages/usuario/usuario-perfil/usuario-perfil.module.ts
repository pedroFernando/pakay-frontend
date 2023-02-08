import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UsuarioPerfilRoutingModule } from './usuario-perfil-routing.module';
import { UsuarioPerfilComponent } from './usuario-perfil.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [
    UsuarioPerfilRoutingModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    UsuarioPerfilComponent,
  ],
})
export class UsuarioPerfilModule {}
