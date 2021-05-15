import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wanderlust!!';
  checkHeaderFooter: boolean;
  constructor(
    private router: Router,
    public auth: AuthService
  ) { }
  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url == '/') {
            this.router.navigate(['dashboard' ]);
           // this.router.navigate(['hotels' ]);
          }

          
          this.checkHeaderFooter = (event.url !== '/')
        }
      });
  }

  
}
