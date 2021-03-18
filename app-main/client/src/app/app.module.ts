import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthModule } from '@auth0/auth0-angular';

import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { HotelsComponent } from './components/hotels/hotels.component';
import { UsersComponent } from './components/users/users.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticateButtonComponent } from './components/authenticate-button/authenticate-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';




@NgModule({
  declarations: [
    AppComponent,
    
    HotelsComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    
    AuthenticateButtonComponent,
    
    SignupButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'jgsathe.us.auth0.com',
      clientId: 'V27PwwrjJ8sqxSd0wAoBxp4BtOzqJecN',
      audience: 'https://localhost:3000/dashboard',
      httpInterceptor: {
        allowedList: [`https://localhost:3000/api/*`],
      },
    }),
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
