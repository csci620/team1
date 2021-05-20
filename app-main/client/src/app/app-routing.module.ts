import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticateButtonComponent } from './components/authenticate-button/authenticate-button.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent} from './components/logout-button/logout-button.component';
import {FlightsComponent} from './components/flights/flights.component'
import {WanderlustComponent} from './components/wanderlust/wanderlust.component'
import {YoutubeComponent} from './components/youtube/youtube.component'
import { AuthGuard } from '@auth0/auth0-angular';
import { UsersComponent } from './components/users/users.component';
const routes: Routes = [ 
//{ path: 'home', component: HomeComponent},
//{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '', component: DashboardComponent, pathMatch: 'full'},
{ path: 'dashboard', component: DashboardComponent  },
{ path: 'hotels', component: HotelsComponent,  canActivate: [AuthGuard] },
{ path: 'login', component: LoginButtonComponent,  canActivate: [AuthGuard] },
{ path: 'logout', component: LoginButtonComponent },
{ path: 'account',component:UsersComponent,  canActivate: [AuthGuard]},
{ path: 'flight', component: FlightsComponent,  canActivate: [AuthGuard]},
{ path: 'wanderlust', component:WanderlustComponent,  canActivate: [AuthGuard]},
{ path: 'vlog',component:YoutubeComponent,  canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
