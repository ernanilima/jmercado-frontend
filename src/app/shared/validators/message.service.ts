import { ValidatorsService } from './validators.service';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export abstract class MessageService {
    public static getErrorMessage(field: string, form: FormGroup): string {
        const error = form.get(field)?.errors;
        if (error?.['required']) {
            return 'Campo deve ser preenchido';
        } else if (error?.['pattern'] && error?.['pattern']['requiredPattern'] === ValidatorsService.emptyRegex) {
            return 'Campo não pode começar com espaços';
        } else if (error?.['min']) {
            return `Campo deve conter valor igual ou maior que '${error['min']['min']}'`;
        } else if (error?.['minlength']) {
            return `Campo deve conter no minimo ${error['minlength']['requiredLength']} caractere(s)`;
        } else if (error?.['maxlength']) {
            return `Campo deve conter no máximo ${error['maxlength']['requiredLength']} caractere(s)`;
        } else if (error?.['naoEncontrado']) {
            return 'Não localizado';
        } else if (error?.['pattern'] && error?.['pattern']['requiredPattern'] === ValidatorsService.emailRegex) {
            return 'Formato de e-mail inválido';
        } else if (error?.['passwordDontMatch']) {
            return 'Senhas não combinam';
        } else {
            return '';
        }
    }
}
