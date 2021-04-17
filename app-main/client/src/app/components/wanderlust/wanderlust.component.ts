import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-wanderlust',
  templateUrl: './wanderlust.component.html',
  styles: [
  ]
})
export class WanderlustComponent implements OnInit {
  safeSrc: SafeResourceUrl;
  constructor(public auth: AuthService, private sanitizer: DomSanitizer) { 
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl
    ("https://www.youtube.com/embed/rpUbfnMls3U");
  }

  ngOnInit(): void {
  }

}
