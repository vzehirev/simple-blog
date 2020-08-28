import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material-module/material.module';
import { SharedLayoutModule } from '../shared-layout-module/shared-layout.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedLayoutModule
  ]
})
export class UsersModule { }