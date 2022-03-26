import { PrimeNgModule } from './../prime-ng/prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MainComponent, LoginComponent],
    imports: [CommonModule, AuthRoutingModule, PrimeNgModule, ReactiveFormsModule],
})
export class AuthModule {}
