import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { authorizationGuard } from './services/auth/authorization.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'utenti',
    component: UtentiComponent,
    canActivate: [authorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
