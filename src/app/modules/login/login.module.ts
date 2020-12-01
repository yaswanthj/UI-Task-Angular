import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,    
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule { }
