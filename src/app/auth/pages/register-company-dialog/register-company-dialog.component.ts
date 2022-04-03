import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { CompanyDto } from 'src/app/auth/interfaces/company.dto';
import { switchMap } from 'rxjs';
import { CompanyService } from 'src/app/auth/services/company.service';

@Component({
    templateUrl: './register-company-dialog.component.html',
    styleUrls: ['./../main/main.component.css'],
})
export class RegisterCompanyDialogComponent extends BaseComponent implements OnInit {
    constructor(
        private fb: FormBuilder, //
        private companyService: CompanyService,
        private recaptchaV3Service: ReCaptchaV3Service
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
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    ValidatorsService.emptyPattern,
                ],
            ],
            tradingName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    ValidatorsService.emptyPattern,
                ],
            ],
            ein: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            email: ['', [Validators.required, ValidatorsService.emailPattern]],
            telephone: this.fb.group({
                telephone: [null, [Validators.minLength(10), Validators.maxLength(15)]],
                cellPhone: [null, [Validators.minLength(11), Validators.maxLength(15)]],
                whatsappCellPhone: [false],
            }),
            address: this.fb.group({
                zipCode: [
                    '',
                    [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
                ],
                country: ['', [Validators.required, ValidatorsService.emptyPattern]],
                state: ['', [Validators.required, ValidatorsService.emptyPattern]],
                city: ['', [Validators.required, ValidatorsService.emptyPattern]],
                district: ['', [Validators.required, ValidatorsService.emptyPattern]],
                street: ['', [Validators.required, ValidatorsService.emptyPattern]],
                number: ['', [Validators.required, ValidatorsService.emptyPattern]],
                complement: [''],
            }),
            user: this.fb.group(
                {
                    name: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(8),
                            Validators.maxLength(50),
                            ValidatorsService.emptyPattern,
                        ],
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
                },
                {
                    // validacao personalizada, necessario se chamar 'validators'
                    validators: [ValidatorsService.passwordMatch('password', 'password2')],
                }
            ),
        });
    }

    public registerCompany(): void {
        if (this.validateForm()) {
            this.recaptchaV3Service
                .execute('importantAction')
                .pipe(
                    switchMap((token: string) => {
                        return this.companyService.registerCompany(this.getCompanyDto(), token);
                    })
                )
                .subscribe((result) => {
                    console.log(result);
                });
        }
    }

    private getCompanyDto(): CompanyDto {
        const telephone = this.form.get('telephone.telephone')?.value;
        const cellPhone = this.form.get('telephone.cellPhone')?.value;
        // atribui nulo caso o telefone nao seja informado
        // evita que o backend realize as validacoes de tamanho
        this.form.get('telephone')?.patchValue({
            telephone: telephone ? telephone : null,
            cellPhone: cellPhone ? cellPhone : null,
        });

        return this.form.getRawValue();
    }
}
