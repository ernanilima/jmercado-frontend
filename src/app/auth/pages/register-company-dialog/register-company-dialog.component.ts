import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
    templateUrl: './register-company-dialog.component.html',
    styleUrls: ['./../main/main.component.css'],
})
export class RegisterCompanyDialogComponent extends BaseComponent implements OnInit {
    constructor(
        private fb: FormBuilder //
    ) {
        super();
    }
    ngOnInit(): void {
        this.form = this.getNewForm();
    }

    private getNewForm(): FormGroup {
        return this.fb.group({
            companyName: [
                '',
                [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
            ],
            tradingName: [
                '',
                [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
            ],
            ein: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            email: ['', [Validators.required, ValidatorsService.emailPattern]],
            telephone: this.fb.group({
                telephone: ['', [Validators.minLength(10), Validators.maxLength(15)]],
                cellPhone: ['', [Validators.minLength(11), Validators.maxLength(15)]],
                whatsappCellPhone: [false],
            }),
            address: this.fb.group({
                zipCode: [
                    '',
                    [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
                ],
                country: ['', Validators.required],
                state: ['', Validators.required],
                city: ['', Validators.required],
                district: ['', Validators.required],
                street: ['', Validators.required],
                number: ['', Validators.required],
                complement: [''],
            }),
            user: this.fb.group({
                name: [
                    '',
                    [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
                ],
                email: ['', [Validators.required, ValidatorsService.emailPattern]],
                password: [
                    '',
                    [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
                ],
                password2: [
                    '',
                    [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
                ],
            }),
        });
    }

    public registerCompany(): void {
        if (this.validateForm()) console.log(this.form.getRawValue());
    }
}
