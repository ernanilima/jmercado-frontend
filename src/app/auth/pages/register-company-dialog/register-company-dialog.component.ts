import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { CompanyDto } from 'src/app/auth/interfaces/company.dto';
import { finalize, switchMap } from 'rxjs';
import { CompanyService } from 'src/app/auth/services/company.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { CountryDto } from 'src/app/shared/interfaces/country.dto';
import { RegionDto } from 'src/app/shared/interfaces/region.dto';
import { StateDto } from 'src/app/shared/interfaces/state.dto';
import { CityDto } from 'src/app/shared/interfaces/city.dto';

@Component({
    templateUrl: './register-company-dialog.component.html',
    styleUrls: ['./../main/main.component.css'],
})
export class RegisterCompanyDialogComponent extends BaseComponent implements OnInit {
    public loadingVisible: boolean = false;
    public countries: CountryDto[];
    public regions: RegionDto[];
    public states: StateDto[];
    public cities: CityDto[];

    constructor(
        private fb: FormBuilder, //
        private companyService: CompanyService,
        private recaptchaV3Service: ReCaptchaV3Service,
        private AddressService: AddressService
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = this.getNewForm();

        this.getCountries();
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
                country: [null, Validators.required],
                region: [null],
                state: [null, Validators.required],
                city: [null, Validators.required],
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

    private getCountries(): void {
        this.AddressService.getCountries().subscribe((value: CountryDto[]) => {
            this.countries = value;
        });
    }

    public changeCountries(codeCountry: string): void {
        if (codeCountry) {
            this.loadingVisible = true;
            this.AddressService.getStates('pais', codeCountry)
                .pipe(
                    finalize(() => {
                        this.loadingVisible = false;
                    })
                )
                .subscribe((states: StateDto[]) => {
                    this.states = states;
                });

            this.AddressService.getRegions(codeCountry)
                .pipe(
                    finalize(() => {
                        this.loadingVisible = false;
                    })
                )
                .subscribe((regions: RegionDto[]) => {
                    this.regions = regions;
                });
        } else {
            this.regions = [];
            this.form.get(['address', 'region'])?.patchValue(null);
            this.states = [];
            this.form.get(['address', 'state'])?.patchValue(null);
        }
    }

    public changeRegions(region: string): void {
        if (region) {
            this.loadingVisible = true;
            this.AddressService.getStates('regiao', region)
                .pipe(
                    finalize(() => {
                        this.loadingVisible = false;
                    })
                )
                .subscribe((states: StateDto[]) => {
                    this.states = states;
                });
        } else {
            this.states = [];
            this.form.get(['address', 'state'])?.patchValue(null);
            this.changeCountries(this.form.get(['address', 'country'])?.value);
        }
    }

    public registerCompany(): void {
        if (this.validateForm()) {
            this.loadingVisible = true;
            this.recaptchaV3Service
                .execute('importantAction')
                .pipe(
                    switchMap((token: string) => {
                        return this.companyService.registerCompany(this.getCompanyDto(), token);
                    }),
                    finalize(() => {
                        this.loadingVisible = false;
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
