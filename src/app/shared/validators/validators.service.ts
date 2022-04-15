import { AbstractControl, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export abstract class ValidatorsService {

    public static passwordMatch(field1: string, field2: string): (form: AbstractControl) => ValidationErrors {
        return (form: AbstractControl): ValidationErrors => {
            if (
                !form.get(field1)?.errors &&
                (!form.get(field2)?.errors || form.get(field2)?.hasError('passwordDontMatch'))
            ) {
                const password1: string = form.get(field1)?.value;
                const password2: string = form.get(field2)?.value;

                form.get(field2)?.setErrors(
                    password1 !== password2 ? { passwordDontMatch: true } : null
                );

                // ATENCAO: definir 'setErrors(null)' pode remover outras validacoes
                // porem, nesse caso estah tudo bem
            }
            return {};
        };
    }

    public static emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public static get emailPattern(): ValidatorFn {
        return Validators.pattern(this.emailRegex);
    }

    public static emptyRegex: string = '^\\S+.*$';
    public static get emptyPattern(): ValidatorFn {
        return Validators.pattern(this.emptyRegex);
    }
}
