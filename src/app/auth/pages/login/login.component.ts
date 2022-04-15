import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterCompanyDialogComponent } from './../register-company-dialog/register-company-dialog.component';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [DialogService],
})
export class LoginComponent extends BaseComponent implements OnInit {

    private ref: DynamicDialogRef;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private dialogService: DialogService
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = this.getNewForm();
    }

    private getNewForm(): FormGroup {
        return this.fb.group({
            companyEin: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            email: ['', [Validators.required, ValidatorsService.emailPattern]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        });
    }

    public login(): void {
        if (this.validateForm())
            this.authService
                .authentication(this.form.value)
                .subscribe((result) => {
                    console.log(result);
                });
    }

    public registerCompany(): void {
        this.ref = this.dialogService.open(RegisterCompanyDialogComponent, {
            header: 'Cadastrar Empresa',
            closeOnEscape: false,
            width: '70%',
            contentStyle: { 'max-height': '500px', overflow: 'auto' },
            baseZIndex: 10000,
            style: { 'padding-bottom': '65px' },
        });

        this.ref.onClose.subscribe((result: boolean) => {
            console.log(result);
        });
    }
}
