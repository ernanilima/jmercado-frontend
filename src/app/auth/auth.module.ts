import { PrimeNgModule } from './../prime-ng/prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterCompanyDialogComponent } from './pages/register-company-dialog/register-company-dialog.component';

@NgModule({
    declarations: [
        MainComponent, //
        LoginComponent,
        RegisterCompanyDialogComponent,
    ],
    imports: [
        CommonModule, //
        AuthRoutingModule,
        PrimeNgModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule {}
