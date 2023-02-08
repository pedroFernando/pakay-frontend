import { httpInterceptorProviders } from '../../_util/http-interceptors/index';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';

import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditoriaComponent } from '../../pages/aut/auditoria/auditoria.component';
import {
  LocationStrategy,
  HashLocationStrategy,
  CommonModule,
} from '@angular/common';
import {
  MultilevelMenuService,
  NgMaterialMultilevelMenuModule,
} from 'ng-material-multilevel-menu';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TokenExpiradoComponent } from '../../login/token-expirado/token-expirado.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { DialogoConfirmacionComponent } from '../../pages/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { PdfComponent } from '../../pages/pdf/pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { TourMatMenuModule } from 'ngx-ui-tour-md-menu';

@NgModule({
  declarations: [
    MainComponent,
    AuditoriaComponent,
    TokenExpiradoComponent,
    PdfComponent,
    DialogoConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgMaterialMultilevelMenuModule,
    MatProgressBarModule,
    PdfViewerModule,
    NgIdleKeepaliveModule.forRoot(),
    TourMatMenuModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
    MultilevelMenuService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class MainModule {}
