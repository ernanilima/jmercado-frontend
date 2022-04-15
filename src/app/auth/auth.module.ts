import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterCompanyDialogComponent } from './pages/register-company-dialog/register-company-dialog.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
    declarations: [
        MainComponent,
        LoginComponent,
        RegisterCompanyDialogComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        PrimeNgModule,
        SharedModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
    ],
    providers: [
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.recaptcha.siteKey,
        },
    ],
})
export class AuthModule { }
