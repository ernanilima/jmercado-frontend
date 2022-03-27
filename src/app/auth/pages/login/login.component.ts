import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor(
        private fb: FormBuilder, //
        private authService: AuthService
    ) {}

    private emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    form: FormGroup = this.fb.group({
        companyEin: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });

    public login(): void {
        console.log(this.form);
        this.authService.authentication(this.form.value).subscribe((result) => {
            console.log(result);
        });
    }
}
