import { FormGroup } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../validators/message.service';

@Component({
    selector: 'app-base',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {

    public form: FormGroup;

    /**
     * Validar erros no campo
     * @param field string
     * @returns boolean | null
     */
    public validateField(field: string): boolean | undefined {
        return this.form.get(field)?.errors !== null && this.form.get(field)?.touched;
    }

    /**
     * Obter mensagem de erro para o campo
     * @param field string
     * @returns string
     */
    public getErrorMessage(field: string): string {
        return MessageService.getErrorMessage(field, this.form);
    }

    /**
     * Validar se o formulario possue erros, caso possua os mesmos sao exibidos
     * @returns boolean
     */
    protected validateForm(): boolean {
        if (this.form.invalid) this.form.markAllAsTouched();
        return this.form.valid;
    }
}
