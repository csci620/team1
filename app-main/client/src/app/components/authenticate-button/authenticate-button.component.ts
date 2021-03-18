import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authenticate-button',
  templateUrl: './authenticate-button.component.html',
  styleUrls: ['./authenticate-button.component.css']
})
export class AuthenticateButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
