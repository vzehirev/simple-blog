import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoggedUserGuard } from './guards/logged-user.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [LoggedUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedUserGuard] },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
