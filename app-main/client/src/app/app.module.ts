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
import { AgmCoreModule } from '@agm/core';
import { FlightsComponent } from './components/flights/flights.component';
import { WanderlustComponent } from './components/wanderlust/wanderlust.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { TourpanelComponent } from './components/tourpanel/tourpanel.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    SignupButtonComponent,
    FlightsComponent,
    WanderlustComponent,
    YoutubeComponent,
    TourpanelComponent,
    LoaderComponent,
    //BrowserModule,
   // ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_nEmhoZpJGym0Tz2e-oapv7L-Ts7S5eI',
      libraries: ['places']
    }),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'jgsathe.us.auth0.com',
      clientId: 'V27PwwrjJ8sqxSd0wAoBxp4BtOzqJecN',
      audience: 'https://csci620-team1-ui.azurewebsites.net:3000/dashboard' ,
      httpInterceptor: {
        allowedList: [`https://csci620-team1-ui.azurewebsites.net:3000/api/*`],
      },
      redirectUri: "https://csci620-team1-ui.azurewebsites.net:4200/hotels"
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
