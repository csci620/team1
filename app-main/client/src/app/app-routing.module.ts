import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticateButtonComponent } from './components/authenticate-button/authenticate-button.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent} from './components/logout-button/logout-button.component';
import {FlightsComponent} from './components/flights/flights.component'

const routes: Routes = [ 
{ path: 'home', component: HomeComponent},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent},
{ path: 'hotels', component: HotelsComponent },
{ path: 'login', component: LoginButtonComponent },
{ path: 'logout', component: LogoutButtonComponent },
{ path: 'authenticate', component: AuthenticateButtonComponent },
{ path: 'flight', component: FlightsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
