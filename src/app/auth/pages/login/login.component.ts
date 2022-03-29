import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/shared/validators/message.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterCompanyDialogComponent } from './../register-company-dialog/register-company-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [DialogService],
})
export class LoginComponent {
    private ref: DynamicDialogRef;

    constructor(
        private fb: FormBuilder, //
        private authService: AuthService,
        private dialogService: DialogService
    ) {}

    form: FormGroup = this.fb.group({
        companyEin: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        email: ['', [Validators.required, ValidatorsService.emailPattern]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });

    public validateField(field: string): boolean | null {
        return this.form.controls[field].errors && this.form.controls[field].touched;
    }

    public getErrorMessage(field: string): string {
        return MessageService.getErrorMessage(field, this.form);
    }

    private validateForm(): boolean {
        if (this.form.invalid) this.form.markAllAsTouched();
        return this.form.valid;
    }

    public login(): void {
        if (this.validateForm())
            this.authService.authentication(this.form.value).subscribe((result) => {
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
            styleClass: 'dynamicDialog',
        });

        this.ref.onClose.subscribe((result: boolean) => {
            console.log(result);
        });
    }
}
