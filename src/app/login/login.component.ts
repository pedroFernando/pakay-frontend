import { Idle } from '@ng-idle/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MENU, IP } from './../_util/var.constant';
import { TransaccionService } from './../_service/aut/transaccion.service';
import { UsuarioService } from '../_service/aut/usuario.service';
import { TOKEN_NAME, USUARIO } from '../_util/var.constant';
import { LoginService } from '../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  hide = true;

  constructor(private loginService: LoginService, private usuarioService: UsuarioService,
    private transaccionService: TransaccionService, private snackBar: MatSnackBar,
    private router: Router, private idle: Idle) { }

  ngOnInit() {
    this.loginService.menu = new Array();
    this.formLogin = new FormGroup({
      usuario: new FormControl(''),
      contrasena: new FormControl('')
    });
  }

  iniciarSesion() {
    let usuario = this.formLogin.value['usuario']
    let contrasena = this.formLogin.value['contrasena'];
    this.loginService.login(usuario, contrasena).subscribe(data => {
      if (data) {
        let token = JSON.stringify(data.jwt);
        console.log(token);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.loginService.esLogeado = true;
        sessionStorage.setItem(USUARIO, JSON.stringify(usuario));
        this.loginService.nombreUsuario = usuario;
        this.loginService.getIp().subscribe(data => {
          sessionStorage.setItem(IP, JSON.stringify(data));
        });
        this.router.navigate(['']);
      }
    }, error => {
      if (error.status == "401" || error.status == "400")
        this.snackBar.open("Usuario y/o contraseña son incorrectos.", null, { duration: 3000 });
    });
  }

}
