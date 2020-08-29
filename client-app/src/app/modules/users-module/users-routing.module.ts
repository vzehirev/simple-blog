import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoggedUserGuard } from 'src/app/guards/logged-user/logged-user.guard';
import { NotLoggedUserGuard } from 'src/app/guards/not-logged-user/not-logged-user.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [LoggedUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedUserGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [NotLoggedUserGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [NotLoggedUserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
