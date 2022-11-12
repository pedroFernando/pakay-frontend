import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { TokenExpiradoComponent } from '../../login/token-expirado/token-expirado.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MENU, USUARIO, EMPRESA } from '../../_util/var.constant';
import { LoginService } from '../../_service/login.service';
import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Title, Meta } from '@angular/platform-browser';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TourService } from 'ngx-ui-tour-md-menu';
import { LoadingService } from '../../_service/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy, OnInit {
  title = 'PAKAY App Web';
  mobileQuery: MediaQueryList;

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'rgb(255, 255, 255)',
    fontColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
    selectedListFontColor: 'rgb(75, 138, 204)',
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: true,
    rtlLayout: false,
  };

  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private titleService: Title, private metaService: Meta,
    public loginService: LoginService,
    private idle: Idle, public dialog: MatDialog, /* private keepalive: Keepalive, */
    private jwtHelper: JwtHelperService, private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public loadingService: LoadingService,
    private tourService: TourService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => { });
    idle.onTimeout.subscribe(() => {
      if (!this.jwtHelper.isTokenExpired()) {
        this.idle.watch();
      }
    });
    idle.onIdleStart.subscribe(() => { });
    idle.onTimeoutWarning.subscribe((countdown) => {
      if (this.jwtHelper.isTokenExpired()) {
        if (this.loginService.estaLogeado()) {
          this.dialog.open(TokenExpiradoComponent);
          this.loginService.cerrarSesion();
        }
      }
    });


    /*Iconos Personalizados */
    this.iconosPersonalizados();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'keywords', content: 'PAKAY, App, Web' },
      { name: 'description', content: 'PAKAY App Web' },
      { name: 'robots', content: 'index, follow' },
    ]);
    this.getMenu();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getMenu() {
    sessionStorage.setItem(USUARIO, JSON.stringify(1));
    sessionStorage.setItem(EMPRESA, JSON.stringify(50));
    if (this.loginService.estaLogeado()) {
      this.loginService.menu = JSON.parse(localStorage.getItem(MENU));
      const usuario = JSON.parse(localStorage.getItem(USUARIO));
      const empresa = JSON.parse(localStorage.getItem(EMPRESA));
      this.loginService.nombreUsuario = usuario.nombre + ' ' + usuario.apellido;
      this.loginService.nombreEmpresa = empresa.nombreComercial;
      this.loginService.iniciarMenu();
    }
  }

  selectedItem(event: Event) {
    this.router.navigate([event['link']]);
  }

  aporte() {
    this.router.navigate(['aporte'])
  }

  amortizacion() {
    this.router.navigate(['amortizacion'])
  }

  caja() {
    this.router.navigate(['caja'])
  }

  prestamo() {
    this.router.navigate(['prestamo'])
  }

  socio() {
    this.router.navigate(['socio'])
  }

  transaccion() {
    this.router.navigate(['transaccion'])
  }

  iconosPersonalizados() {
    this.matIconRegistry.addSvgIcon(
      'file-xls',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/file-xls.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'file-pdf',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/file-pdf.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'nas',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/nas.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'file-search-outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/file-search-outline.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'file-replace',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/file-replace.svg'),
    );
  }

}
