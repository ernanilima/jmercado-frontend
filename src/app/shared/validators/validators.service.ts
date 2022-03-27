import { ValidatorFn, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export abstract class ValidatorsService {
    public static emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public static get emailPattern(): ValidatorFn {
        return Validators.pattern(this.emailRegex);
    }
}
