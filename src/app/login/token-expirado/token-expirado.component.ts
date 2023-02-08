import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-token-expirado',
  templateUrl: './token-expirado.component.html',
  styleUrls: ['./token-expirado.component.css']
})
export class TokenExpiradoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TokenExpiradoComponent>) { }

  ngOnInit() {
  }

}
