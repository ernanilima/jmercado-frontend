import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ResponseStatusInterceptor implements HttpInterceptor {
    constructor(
        private messageService: MessageService //
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(request);
        return next.handle(request).pipe(
            catchError((json: any) => {
                // exibir mensagem de resposta recebida do backend
                this.backendResponseMessage(json);

                // se tiver o campo 'error', atribui apenas ele como erro
                if (json.error) json = JSON.parse(json.error);
                return throwError(() => json);
            })
        ) as any;
    }

    /**
     * Respostas de informação (100-199)
     * Respostas de sucesso (200-299)
     * Redirecionamentos (300-399)
     * Erros do cliente (400-499)
     * Erros do servidor (500-599)
     * @param json any
     */
    private backendResponseMessage(json: any): void {
        // retorna se nao tiver erro retornado do backend
        if (!json.error) return;

        const successStatus: boolean = json.status && json.status >= 200 && json.status <= 299;
        const errorStatus: boolean = json.status && json.status >= 400 && json.status <= 599;

        const backendResponseError = JSON.parse(json.error);

        // apenas um erro
        if (!backendResponseError.errors && errorStatus) {
            this.messageService.clear('BackendResponseError');
            this.errorMessage(backendResponseError.error, backendResponseError.message);
        }
        // mais de um erro
        else if (backendResponseError.errors && errorStatus) {
            this.messageService.clear('BackendResponseError');
            // cabechalho com a quantidade de erros
            this.errorMessage(backendResponseError.error, backendResponseError.message);
            backendResponseError.errors.forEach((error: any) => {
                // os erros
                this.errorMessage(error.fieldName, error.message);
            });
        }
    }

    private errorMessage(headerMessage: string, contentMessage: string): void {
        this.messageService.add({
            key: 'BackendResponseError',
            severity: 'error',
            summary: headerMessage,
            detail: contentMessage,
            life: 5000,
        });
    }
}

export const ResponseStatusInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseStatusInterceptor,
    multi: true,
};
