import { TOKEN_NAME, HOST_AUTH } from './_util/var.constant';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './_util/http-interceptors';

// eslint-disable-next-line arrow-body-style
const tokenGetter = () => {
  return localStorage.getItem(TOKEN_NAME);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        disallowedRoutes: [
          `${HOST_AUTH}`,
          `${HOST_AUTH}/registro/nuevo`,
          'https://api.ipify.org/?format=json',
        ],
      },
    }),
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
    MultilevelMenuService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
