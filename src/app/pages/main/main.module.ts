import { httpInterceptorProviders } from '../../_util/http-interceptors/index';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogoConfirmacionComponent } from '../../pages/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    MultilevelMenuService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class MainModule {}
